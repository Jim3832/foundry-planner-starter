import { NextResponse } from 'next/server';
export async function GET(){return NextResponse.json({error:'Open a specific plan link. New cloud saves use /api/cloud-plans.'},{status:405});}
