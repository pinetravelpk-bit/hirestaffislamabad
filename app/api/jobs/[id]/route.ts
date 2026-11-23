import {jobById} from '../../../../lib/jobs';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const r=jobById((await params).id);return r?Response.json(r,{headers:{'Cache-Control':'public, max-age=60'}}):Response.json({error:'This job is no longer available.'},{status:404})}
export function PUT(){return Response.json({error:'Online editing is not available. Contact our team to update a vacancy.'},{status:403})}
