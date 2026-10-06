import { NextResponse } from 'next/server';
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { getSupabaseAdmin } from './supabaseAdmin';
export const fields='id,title,plan_json,updated_at';
export function failure(e: unknown){console.error('Cloud save failed',e instanceof Error?e.message:'unknown');return NextResponse.json({error:'Cloud storage is unavailable. Check the Supabase environment variables and plans table in your deployment.'},{status:503});}
export async function payload(req: Request){const text=await req.text();if(text.length>1000000)throw Error('Plan is too large');const b=JSON.parse(text);if(typeof b.title!=='string'||!b.title.trim()||b.title.length>120||!b.plan||!Array.isArray(b.plan.players)||b.plan.players.length>500||!b.plan.master||!b.plan.overrides)throw Error('Invalid plan or name (maximum 120 characters)');return b;}
export function hash(key:string){return 'sha256:'+createHash('sha256').update(key).digest('hex');}
export function authorised(req:Request,stored:string){const key=req.headers.get('authorization')?.replace(/^Bearer /,'')||'';if(!key)return false;const a=Buffer.from(stored.startsWith('sha256:')?hash(key):key),b=Buffer.from(stored);return a.length===b.length&&timingSafeEqual(a,b);}
export function database(){return getSupabaseAdmin();}
export function secret(){return randomBytes(32).toString('base64url');}
export function validId(id:string){return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);}
