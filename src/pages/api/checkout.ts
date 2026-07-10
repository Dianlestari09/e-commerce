import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';

// Instantiate admin client with service role key to bypass RLS on server-side checkout
const supabaseAdmin = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { customer_name, phone, shipping_address, payment_method, items, customer_id, province, payment_proof } = body;

    if (!customer_name || !phone || !shipping_address) {
      return new Response(JSON.stringify({ error: 'Please fill in all required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Shopping cart is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate shipping fee based on selected province
    let shipping_fee = 0;
    if (province) {
      const { data: rateData } = await supabaseAdmin
        .from('shipping_rates')
        .select('rate')
        .eq('province', province)
        .maybeSingle();
      if (rateData) {
        shipping_fee = Number(rateData.rate);
      }
    }

    // Calculate total amount (subtotal + shipping_fee)
    const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);
    const total_amount = subtotal + shipping_fee;

    // --- PRE-CHECKOUT STOCK VALIDATION ---
    for (const item of items) {
      const isMock = item.id.startsWith('mock-');
      if (!isMock) {
        // Fetch product info
        const { data: prod } = await supabaseAdmin
          .from('products')
          .select('name, stock')
          .eq('id', item.id)
          .single();

        if (!prod) {
          return new Response(JSON.stringify({ error: `Product not found: ${item.id}` }), { status: 400 });
        }

        // Fetch variants
        const { data: dbVariants } = await supabaseAdmin
          .from('product_variants')
          .select('*')
          .eq('product_id', item.id);

        if (dbVariants && dbVariants.length > 0) {
          // Compare using normalized key: coalesce to empty string
          const targetColor = (item.color || '').trim().toLowerCase();
          const targetSize = (item.size || '').trim().toLowerCase();

          const matchingVariant = dbVariants.find((v: any) =>
            (v.color || '').trim().toLowerCase() === targetColor &&
            (v.size || '').trim().toLowerCase() === targetSize
          );

          if (!matchingVariant) {
            return new Response(JSON.stringify({
              error: `Varian tidak tersedia untuk ${prod.name} (${item.color || 'No Color'} / ${item.size || 'No Size'})`
            }), { status: 400 });
          }

          if (matchingVariant.stock < item.quantity) {
            return new Response(JSON.stringify({
              error: `Stok tidak mencukupi untuk ${prod.name} (${item.color || 'No Color'} / ${item.size || 'No Size'}). Tersisa: ${matchingVariant.stock}`
            }), { status: 400 });
          }
        } else {
          // Standard check on main product stock
          if (prod.stock < item.quantity) {
            return new Response(JSON.stringify({
              error: `Stok tidak mencukupi untuk ${prod.name}. Tersisa: ${prod.stock}`
            }), { status: 400 });
          }
        }
      }
    }

    // Process Payment Proof image upload
    let payment_proof_url = null;
    if (payment_method === 'bank_transfer' && payment_proof) {
      try {
        const { fileName, fileType, fileBase64 } = payment_proof;

        // Extract base64 part safely by splitting at the first comma
        const commaIndex = fileBase64.indexOf(',');
        const base64Data = commaIndex !== -1 ? fileBase64.substring(commaIndex + 1) : fileBase64;

        // Decode base64 to binary buffer using native Node Buffer
        const fileBytes = Buffer.from(base64Data, 'base64');
        const storagePath = `proof-checkout-${Date.now()}-${fileName}`;
        const contentType = fileType || 'image/png';

        // Check/ensure bucket exists or auto-create it using admin client
        try {
          const { data: bucketData } = await supabaseAdmin.storage.getBucket('payment-proofs');
          if (!bucketData) {
            await supabaseAdmin.storage.createBucket('payment-proofs', { public: true });
          }
        } catch (bucketErr) {
          // If getBucket fails, try creating it directly
          await supabaseAdmin.storage.createBucket('payment-proofs', { public: true }).catch(() => { });
        }

        const { error: uploadError } = await supabaseAdmin.storage
          .from('payment-proofs')
          .upload(storagePath, fileBytes, {
            contentType,
            upsert: true
          });

        if (uploadError) {
          console.error("Gagal mengunggah bukti pembayaran:", uploadError);
          return new Response(JSON.stringify({ error: 'Gagal mengunggah bukti transfer: ' + uploadError.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('payment-proofs')
          .getPublicUrl(storagePath);

        payment_proof_url = publicUrl;
      } catch (decodeErr: any) {
        console.error("Gagal mendecode file bukti transfer:", decodeErr);
        return new Response(JSON.stringify({ error: 'Format file bukti transfer tidak valid' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 1. Insert order into public.orders using admin client
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_id: customer_id || null, // Link to logged-in user if session exists
        total_amount,
        shipping_address: `${customer_name} | Tel: ${phone} | Addr: ${shipping_address}`,
        payment_method,
        status: 'pending',
        payment_status: 'pending',
        province: province || null,
        shipping_fee,
        payment_proof_url
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order insertion error:", orderError);
      return new Response(JSON.stringify({ error: orderError?.message || 'Failed to create order record' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Insert order items & Update stock
    for (const item of items) {
      const isMock = item.id.startsWith('mock-');

      // Insert item detail with color and size
      const { error: itemError } = await supabaseAdmin
        .from('order_items')
        .insert({
          order_id: order.id,
          product_id: isMock ? null : item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          selected_color: item.color || null,
          selected_size: item.size || null
        });

      if (itemError) {
        console.error("Order item insertion error:", itemError);
      }

      // If it is a real DB product, decrement the stock
      if (!isMock) {
        // Check if has variants
        const { data: dbVariants } = await supabaseAdmin
          .from('product_variants')
          .select('id, stock, color, size')
          .eq('product_id', item.id);

        if (dbVariants && dbVariants.length > 0) {
          // Decrement specific variant stock
          const targetColor = (item.color || '').trim().toLowerCase();
          const targetSize = (item.size || '').trim().toLowerCase();

          const matchingVariant = dbVariants.find((v: any) =>
            (v.color || '').trim().toLowerCase() === targetColor &&
            (v.size || '').trim().toLowerCase() === targetSize
          );

          if (matchingVariant) {
            const newVarStock = Math.max(0, matchingVariant.stock - item.quantity);
            await supabaseAdmin
              .from('product_variants')
              .update({ stock: newVarStock })
              .eq('id', matchingVariant.id);
          }

          // Sum up all variants stock and update products table
          const { data: updatedVariants } = await supabaseAdmin
            .from('product_variants')
            .select('stock')
            .eq('product_id', item.id);

          const sumStock = updatedVariants ? updatedVariants.reduce((sum, v) => sum + v.stock, 0) : 0;
          await supabaseAdmin
            .from('products')
            .update({ stock: sumStock })
            .eq('id', item.id);

        } else {
          // Standard product stock update
          const { data: prod } = await supabaseAdmin
            .from('products')
            .select('stock')
            .eq('id', item.id)
            .single();

          if (prod) {
            const newStock = Math.max(0, prod.stock - item.quantity);
            await supabaseAdmin
              .from('products')
              .update({ stock: newStock })
              .eq('id', item.id);
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true, orderId: order.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("Server API Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const prerender = false;
