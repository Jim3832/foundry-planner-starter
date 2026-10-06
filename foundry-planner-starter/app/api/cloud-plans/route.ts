import { NextResponse } from 'next/server';
import { database, failure, fields, hash, payload, secret } from '@/lib/cloudPlans';
export const runtime='nodejs';
export async function POST(req:Request){let body;try{body=await payload(req)}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Invalid request'},{status:400});}try{const key=secret();const {data,error}=await database().from('plans').insert({title:body.title.trim(),player_input:body.plan.input||'',plan_json:body.plan,settings_json:{},edit_key:hash(key)}).select(fields).single();if(error)throw error;return NextResponse.json({...data,edit_key:key},{status:201,headers:{'Cache-Control':'no-store'}});}catch(e){return failure(e);}}
