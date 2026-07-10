import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a server-side admin client that bypasses RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Helper to authenticate the admin caller
async function authenticateAdmin(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  
  if (!token) return null;

  // Use the caller's token to get their user details
  const tempClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data: { user }, error } = await tempClient.auth.getUser(token);
  if (error || !user) return null;

  // Check their role in the profiles table
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'super_admin') return null;

  return user;
}

// GET: List all users from auth.users (includes email + metadata)
export const GET: APIRoute = async ({ request }) => {
  try {
    const adminUser = await authenticateAdmin(request);
    if (!adminUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    // Format the list to match what the frontend expects
    const formattedUsers = data.users.map(u => ({
      id: u.id,
      email: u.email,
      full_name: u.user_metadata?.full_name || 'N/A',
      phone: u.user_metadata?.phone || '-',
      role: u.user_metadata?.role || 'customer',
      shipping_address: u.user_metadata?.shipping_address || '-',
      created_at: u.created_at
    }));

    // Sort by created_at descending
    formattedUsers.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return new Response(JSON.stringify({ success: true, data: formattedUsers }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// POST: Create a new user (admin or customer) from the admin panel
export const POST: APIRoute = async ({ request }) => {
  try {
    const adminUser = await authenticateAdmin(request);
    if (!adminUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { email, password, full_name, phone, role, shipping_address } = body;

    if (!email || !password || !full_name) {
      return new Response(JSON.stringify({ error: 'Email, password, and full name are required' }), { status: 400 });
    }

    // Create the user in Supabase Auth via Admin API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for admin-created accounts
      user_metadata: {
        full_name,
        phone,
        role: role || 'customer',
        shipping_address
      }
    });

    if (authError || !authData.user) {
      return new Response(JSON.stringify({ error: authError?.message || 'Failed to create user' }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, user: authData.user }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// PUT: Update an existing user's details and/or password
export const PUT: APIRoute = async ({ request }) => {
  try {
    const adminUser = await authenticateAdmin(request);
    if (!adminUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { id, password, full_name, phone, role, shipping_address } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    // 1. Prepare updates for Supabase Auth
    const authUpdates: any = {
      user_metadata: {
        full_name,
        phone,
        role,
        shipping_address
      }
    };
    if (password) {
      authUpdates.password = password;
    }

    // 2. Update user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, authUpdates);
    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), { status: 400 });
    }

    // 3. Update public.profiles table
    const profileUpdates: any = {
      full_name,
      phone,
      role,
      shipping_address
    };

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update(profileUpdates)
      .eq('id', id);

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, user: authData.user }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// DELETE: Delete a user account from Supabase Auth and profiles
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const adminUser = await authenticateAdmin(request);
    if (!adminUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    // Delete the user via Admin API (cascade constraint deletes profiles row automatically)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const prerender = false;
