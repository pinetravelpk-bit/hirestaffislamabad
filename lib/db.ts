import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

let db:DatabaseSync|null=null;
export function getDb(){
  if(db)return db;
  const dir=process.env.DATA_DIR||path.join(process.cwd(),'.data');
  fs.mkdirSync(dir,{recursive:true});
  db=new DatabaseSync(path.join(dir,'hirestaff.db'));
  db.exec(`PRAGMA journal_mode=WAL;PRAGMA foreign_keys=ON;
    CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,username TEXT UNIQUE NOT NULL COLLATE NOCASE,pass TEXT NOT NULL,created TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS cvs(user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,data TEXT NOT NULL,published INTEGER NOT NULL DEFAULT 1,show_contact INTEGER NOT NULL DEFAULT 1,views INTEGER NOT NULL DEFAULT 0,updated TEXT NOT NULL);`);
  return db;
}
