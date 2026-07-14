import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

function getAuthClient(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : '';
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  );
}

// GET all articles (admin view - includes drafts)
export const GET: APIRoute = async ({ request }) => {
  try {
    const authSupabase = getAuthClient(request);
    const { data, error } = await authSupabase
      .from('articles')
      .select('id, title, slug, category, status, published_at, created_at, author_name, excerpt, cover_image, tags')
      .order('created_at', { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// CREATE article
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      title, slug, excerpt, content, cover_image,
      author_name, category, tags, status,
      meta_title, meta_description, schema_code, related_article_ids
    } = body;

    if (!title || !slug) {
      return new Response(JSON.stringify({ error: 'Title and slug are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authSupabase = getAuthClient(request);

    const published_at = status === 'published' ? new Date().toISOString() : null;

    const { data, error } = await authSupabase
      .from('articles')
      .insert({
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        cover_image: cover_image || null,
        author_name: author_name || 'Dian Lestari Kurniawati',
        category: category || 'tips',
        tags: tags && tags.length > 0 ? tags : null,
        status: status || 'draft',
        meta_title: meta_title || null,
        meta_description: meta_description || null,
        schema_code: schema_code || null,
        related_article_ids: related_article_ids || [],
        published_at
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// UPDATE article
export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      id, title, slug, excerpt, content, cover_image,
      author_name, category, tags, status,
      meta_title, meta_description, schema_code, related_article_ids
    } = body;

    if (!id || !title || !slug) {
      return new Response(JSON.stringify({ error: 'ID, title, and slug are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authSupabase = getAuthClient(request);

    // Fetch current published_at to preserve it if already published
    const { data: existing } = await authSupabase
      .from('articles')
      .select('published_at, status')
      .eq('id', id)
      .single();

    let published_at = existing?.published_at ?? null;
    // If now publishing for first time, set published_at
    if (status === 'published' && !published_at) {
      published_at = new Date().toISOString();
    }
    // If set back to draft, clear published_at
    if (status === 'draft') {
      published_at = null;
    }

    const { data, error } = await authSupabase
      .from('articles')
      .update({
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        cover_image: cover_image || null,
        author_name: author_name || 'Dian Lestari Kurniawati',
        category: category || 'tips',
        tags: tags && tags.length > 0 ? tags : null,
        status: status || 'draft',
        meta_title: meta_title || null,
        meta_description: meta_description || null,
        schema_code: schema_code || null,
        related_article_ids: related_article_ids || [],
        published_at
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE article
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Article ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authSupabase = getAuthClient(request);

    const { error } = await authSupabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const prerender = false;
