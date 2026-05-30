import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const edit = new URL(req.url).searchParams.get('edit');

  const supabase = getSupabaseAdmin();

  const { data: existing, error: readError } = await supabase
    .from('plans')
    .select('edit_key')
    .eq('id', id)
    .single();

  if (readError) return NextResponse.json({ error: readError.message }, { status: 404 });
  if (!edit || edit !== existing.edit_key) {
    return NextResponse.json({ error: 'Invalid edit key' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('plans')
    .update({
      title: body.title,
      player_input: body.player_input,
      plan_json: body.plan_json,
      settings_json: body.settings_json || {},
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}