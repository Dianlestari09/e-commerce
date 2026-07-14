import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/payment-confirm.ts
var payment_confirm_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var supabaseAdmin = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0", { auth: {
	persistSession: false,
	autoRefreshToken: false
} });
var POST = async ({ request }) => {
	try {
		const { orderId, fileName, fileBase64, fileType } = await request.json();
		if (!orderId || !fileName || !fileBase64) return new Response(JSON.stringify({ error: "Order ID, file name, and file content are required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data: order, error: orderError } = await supabaseAdmin.from("orders").select("id, payment_method").eq("id", orderId).single();
		if (orderError || !order) return new Response(JSON.stringify({ error: "Order not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		const base64Data = fileBase64.replace(/^data:image\/\w+;base64,/, "");
		const binaryString = atob(base64Data);
		const len = binaryString.length;
		const fileBytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) fileBytes[i] = binaryString.charCodeAt(i);
		const storagePath = `proof-${orderId}-${Date.now()}-${fileName}`;
		const contentType = fileType || "image/png";
		const { error: uploadError } = await supabaseAdmin.storage.from("payment-proofs").upload(storagePath, fileBytes, {
			contentType,
			upsert: true
		});
		if (uploadError) {
			console.error("Storage upload error:", uploadError);
			return new Response(JSON.stringify({ error: `Storage upload failed: ${uploadError.message}` }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { data: { publicUrl } } = supabaseAdmin.storage.from("payment-proofs").getPublicUrl(storagePath);
		const { error: updateError } = await supabaseAdmin.from("orders").update({ payment_proof_url: publicUrl }).eq("id", orderId);
		if (updateError) {
			console.error("Order database update error:", updateError);
			return new Response(JSON.stringify({ error: `Database update failed: ${updateError.message}` }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({
			success: true,
			url: publicUrl
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Payment confirmation server error:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/payment-confirm@_@ts
var page = () => payment_confirm_exports;
//#endregion
export { page };
