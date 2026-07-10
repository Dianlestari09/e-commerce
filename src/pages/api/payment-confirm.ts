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

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { orderId, fileName, fileBase64, fileType } = body;

    if (!orderId || !fileName || !fileBase64) {
      return new Response(JSON.stringify({ error: 'Order ID, file name, and file content are required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Verify the order exists
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id, payment_method')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Decode the base64 string using standard Web APIs (atob + Uint8Array)
    // Strip metadata prefix if present (e.g. data:image/png;base64,)
    const base64Data = fileBase64.replace(/^data:image\/\w+;base64,/, "");
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const fileBytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      fileBytes[i] = binaryString.charCodeAt(i);
    }

    // 3. Upload bytes to Supabase Storage
    const storagePath = `proof-${orderId}-${Date.now()}-${fileName}`;
    const contentType = fileType || 'image/png';

    const { error: uploadError } = await supabaseAdmin.storage
      .from('payment-proofs')
      .upload(storagePath, fileBytes, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return new Response(JSON.stringify({ error: `Storage upload failed: ${uploadError.message}` }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. Get Public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('payment-proofs')
      .getPublicUrl(storagePath);

    // 5. Update the orders table with the URL
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ payment_proof_url: publicUrl })
      .eq('id', orderId);

    if (updateError) {
      console.error("Order database update error:", updateError);
      return new Response(JSON.stringify({ error: `Database update failed: ${updateError.message}` }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, url: publicUrl }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("Payment confirmation server error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const prerender = false;
