// One endpoint for all account actions, selected by the "action" field.
import {getDb} from '../../../lib/db';
import {body,checkPassword,createSession,currentUser,endSession,hashPassword,json,limited,sameOrigin,validUsername} from '../../../lib/auth';
import {restoreCV} from '../../builders/model';

export const runtime='nodejs';
export const dynamic='force-dynamic';

type Row={data:string;published:number;show_contact:number;views:number;updated:string};

async function state(){
  const u=await currentUser();if(!u)return {user:null,cv:null};
  const r=getDb().prepare('SELECT data,published,show_contact,views,updated FROM cvs WHERE user_id=?').get(u.id) as Row|undefined;
  return {user:{username:u.username},cv:r?{published:!!r.published,showContact:!!r.show_contact,views:Number(r.views),updated:r.updated}:null};
}

export async function GET(req:Request){
  const s=await state();
  if(new URL(req.url).searchParams.get('cv')==='1'&&s.user){const u=await currentUser();const r=getDb().prepare('SELECT data FROM cvs WHERE user_id=?').get(u!.id) as {data:string}|undefined;return json({...s,data:r?JSON.parse(r.data):null})}
  return json(s);
}

export async function POST(req:Request){
  if(!sameOrigin(req))return json({error:'Request blocked.'},403);
  const b=await body(req);const action=String(b.action||'');const db=getDb();
  const username=String(b.username||'').trim().toLowerCase(),password=String(b.password||'');

  if(action==='register'){
    if(limited(req,'register',5))return json({error:'Too many attempts. Try again in a few minutes.'},429);
    if(!validUsername(username))return json({error:'Username: 3–30 characters, lowercase letters, numbers and single hyphens.'},400);
    if(password.length<8||password.length>200)return json({error:'Password must be at least 8 characters.'},400);
    if(db.prepare('SELECT 1 FROM users WHERE username=?').get(username))return json({error:'This username is taken. Try another.'},409);
    const r=db.prepare('INSERT INTO users(username,pass,created) VALUES(?,?,?)').run(username,hashPassword(password),new Date().toISOString());
    await createSession(Number(r.lastInsertRowid));
    return json(await state());
  }
  if(action==='login'){
    if(limited(req,'login',10))return json({error:'Too many attempts. Try again in a few minutes.'},429);
    const u=db.prepare('SELECT id,pass FROM users WHERE username=?').get(username) as {id:number;pass:string}|undefined;
    if(!u||!checkPassword(password,u.pass))return json({error:'Username or password is incorrect.'},401);
    await createSession(Number(u.id));
    return json(await state());
  }
  if(action==='logout'){await endSession();return json({user:null,cv:null})}

  const me=await currentUser();if(!me)return json({error:'Please log in first.'},401);

  if(action==='save'){
    const cv=restoreCV(b.cv);
    if(!cv.name.trim())return json({error:'Add your name before saving.'},400);
    const data=JSON.stringify(cv);if(data.length>400000)return json({error:'CV is too large. Use a smaller photo.'},413);
    const published=b.published===false?0:1,show=b.showContact===false?0:1;
    db.prepare('INSERT INTO cvs(user_id,data,published,show_contact,updated) VALUES(?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,published=excluded.published,show_contact=excluded.show_contact,updated=excluded.updated').run(me.id,data,published,show,new Date().toISOString());
    return json(await state());
  }
  if(action==='settings'){
    db.prepare('UPDATE cvs SET published=?,show_contact=? WHERE user_id=?').run(b.published===false?0:1,b.showContact===false?0:1,me.id);
    return json(await state());
  }
  if(action==='password'){
    const u=db.prepare('SELECT pass FROM users WHERE id=?').get(me.id) as {pass:string};
    if(!checkPassword(String(b.current||''),u.pass))return json({error:'Current password is incorrect.'},401);
    const next=String(b.next||'');if(next.length<8)return json({error:'New password must be at least 8 characters.'},400);
    db.prepare('UPDATE users SET pass=? WHERE id=?').run(hashPassword(next),me.id);
    return json({...await state(),message:'Password changed.'});
  }
  if(action==='remove'){
    const u=db.prepare('SELECT pass FROM users WHERE id=?').get(me.id) as {pass:string};
    if(!checkPassword(password,u.pass))return json({error:'Password is incorrect.'},401);
    await endSession();
    db.prepare('DELETE FROM users WHERE id=?').run(me.id);
    return json({user:null,cv:null,message:'Your account and online CV were deleted.'});
  }
  return json({error:'Unknown action.'},400);
}
