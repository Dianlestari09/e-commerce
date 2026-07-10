import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
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

// CREATE product
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, slug, price, sale_price, stock, sku, category_id, description, image_url, colors, sizes, variants } = body;

    if (!name || !slug || !price) {
      return new Response(JSON.stringify({ error: 'Name, slug, and price are required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate total stock from variants if provided
    let finalStock = Number(stock || 0);
    const hasVariants = Array.isArray(variants) && variants.length > 0;
    if (hasVariants) {
      finalStock = variants.reduce((sum: number, v: any) => sum + Number(v.stock || 0), 0);
    }

    const authSupabase = getAuthClient(request);

    const { data, error } = await authSupabase
      .from('products')
      .insert({
        name,
        slug,
        price: Number(price),
        sale_price: sale_price ? Number(sale_price) : null,
        stock: finalStock,
        sku,
        category_id: category_id || null,
        description,
        images: image_url ? [image_url] : [],
        colors: colors || null,
        sizes: sizes || null
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert variants
    if (hasVariants) {
      const dbVariants = variants.map((v: any) => ({
        product_id: data.id,
        color: v.color || null,
        size: v.size || null,
        stock: Number(v.stock || 0)
      }));
      const { error: variantError } = await authSupabase
        .from('product_variants')
        .insert(dbVariants);
      if (variantError) console.error('Error inserting variants:', variantError.message);
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

// UPDATE product
export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, name, slug, price, sale_price, stock, sku, category_id, description, image_url, colors, sizes, variants } = body;

    if (!id || !name || !slug || !price) {
      return new Response(JSON.stringify({ error: 'ID, name, slug, and price are required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate total stock from variants if provided
    let finalStock = Number(stock || 0);
    const hasVariants = Array.isArray(variants) && variants.length > 0;
    if (hasVariants) {
      finalStock = variants.reduce((sum: number, v: any) => sum + Number(v.stock || 0), 0);
    }

    const authSupabase = getAuthClient(request);

    const { data, error } = await authSupabase
      .from('products')
      .update({
        name,
        slug,
        price: Number(price),
        sale_price: sale_price ? Number(sale_price) : null,
        stock: finalStock,
        sku,
        category_id: category_id || null,
        description,
        images: image_url ? [image_url] : [],
        colors: colors || null,
        sizes: sizes || null
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

    // Update variants (delete existing, then insert new)
    await authSupabase.from('product_variants').delete().eq('product_id', id);
    if (hasVariants) {
      const dbVariants = variants.map((v: any) => ({
        product_id: id,
        color: v.color || null,
        size: v.size || null,
        stock: Number(v.stock || 0)
      }));
      const { error: variantError } = await authSupabase
        .from('product_variants')
        .insert(dbVariants);
      if (variantError) console.error('Error inserting variants:', variantError.message);
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

// DELETE product
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required for deletion' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authSupabase = getAuthClient(request);

    const { error } = await authSupabase
      .from('products')
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
