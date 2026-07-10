import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Helper to authenticate user from auth header
async function getAuthUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export const GET: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { data: addresses, error } = await supabaseAdmin
      .from('customer_addresses')
      .select('*')
      .eq('customer_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data: addresses }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const { label, recipient_name, phone, street, province, city, zip, is_default } = body;

    if (!label || !recipient_name || !phone || !street || !province || !city) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // If setting as default, unset other defaults first
    if (is_default) {
      await supabaseAdmin
        .from('customer_addresses')
        .update({ is_default: false })
        .eq('customer_id', user.id);
    }

    const { data, error } = await supabaseAdmin
      .from('customer_addresses')
      .insert({
        customer_id: user.id,
        label,
        recipient_name,
        phone,
        street,
        province,
        city,
        zip: zip || null,
        is_default: !!is_default
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, label, recipient_name, phone, street, province, city, zip, is_default } = body;

    if (!id || !label || !recipient_name || !phone || !street || !province || !city) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('customer_addresses')
      .select('customer_id')
      .eq('id', id)
      .single();

    if (!existing || existing.customer_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not Found or Unauthorized' }), { status: 404 });
    }

    // If setting as default, unset other defaults first
    if (is_default) {
      await supabaseAdmin
        .from('customer_addresses')
        .update({ is_default: false })
        .eq('customer_id', user.id);
    }

    const { data, error } = await supabaseAdmin
      .from('customer_addresses')
      .update({
        label,
        recipient_name,
        phone,
        street,
        province,
        city,
        zip: zip || null,
        is_default: !!is_default
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ url, request }) => {
  const user = await getAuthUser(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing address ID' }), { status: 400 });
    }

    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('customer_addresses')
      .select('customer_id')
      .eq('id', id)
      .single();

    if (!existing || existing.customer_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not Found or Unauthorized' }), { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('customer_addresses')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
