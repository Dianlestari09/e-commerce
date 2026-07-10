import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Helper to authenticate admin
async function authenticateAdmin(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  
  if (!token) return null;

  const tempClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data: { user }, error } = await tempClient.auth.getUser(token);
  if (error || !user) return null;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') return null;

  return user;
}

// GET: List all shipping rates
export const GET: APIRoute = async ({ request }) => {
  try {
    const admin = await authenticateAdmin(request);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('shipping_rates')
      .select('*')
      .order('province', { ascending: true });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// POST: Add new shipping rate
export const POST: APIRoute = async ({ request }) => {
  try {
    const admin = await authenticateAdmin(request);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { province, rate } = body;

    if (!province || rate === undefined) {
      return new Response(JSON.stringify({ error: 'Province and rate are required' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('shipping_rates')
      .insert({ province, rate: Number(rate) })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// PUT: Update shipping rate
export const PUT: APIRoute = async ({ request }) => {
  try {
    const admin = await authenticateAdmin(request);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { id, province, rate } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Rate ID is required' }), { status: 400 });
    }

    const updates: any = {};
    if (province) updates.province = province;
    if (rate !== undefined) updates.rate = Number(rate);

    const { data, error } = await supabaseAdmin
      .from('shipping_rates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// DELETE: Remove shipping rate
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const admin = await authenticateAdmin(request);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('shipping_rates')
      .delete()
      .eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const prerender = false;
