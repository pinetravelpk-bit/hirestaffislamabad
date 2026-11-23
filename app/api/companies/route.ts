export function GET(){return Response.json({profiles:[]})}
export function POST(){return Response.json({error:'Company profiles are saved on this device. Send your profile to our team to publish it.'},{status:403})}
