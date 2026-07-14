import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";
//#region src/pages/api/checkout.ts
var checkout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var supabaseAdmin = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0");
var POST = async ({ request }) => {
	try {
		const { customer_name, phone, shipping_address, payment_method, items, customer_id, province, payment_proof } = await request.json();
		if (!customer_name || !phone || !shipping_address) return new Response(JSON.stringify({ error: "Please fill in all required fields" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!items || items.length === 0) return new Response(JSON.stringify({ error: "Shopping cart is empty" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		let shipping_fee = 0;
		if (province) {
			const { data: rateData } = await supabaseAdmin.from("shipping_rates").select("rate").eq("province", province).maybeSingle();
			if (rateData) shipping_fee = Number(rateData.rate);
		}
		const total_amount = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) + shipping_fee;
		for (const item of items) if (!item.id.startsWith("mock-")) {
			const { data: prod } = await supabaseAdmin.from("products").select("name, stock").eq("id", item.id).single();
			if (!prod) return new Response(JSON.stringify({ error: `Product not found: ${item.id}` }), { status: 400 });
			const { data: dbVariants } = await supabaseAdmin.from("product_variants").select("*").eq("product_id", item.id);
			if (dbVariants && dbVariants.length > 0) {
				const targetColor = (item.color || "").trim().toLowerCase();
				const targetSize = (item.size || "").trim().toLowerCase();
				const matchingVariant = dbVariants.find((v) => (v.color || "").trim().toLowerCase() === targetColor && (v.size || "").trim().toLowerCase() === targetSize);
				if (!matchingVariant) return new Response(JSON.stringify({ error: `Varian tidak tersedia untuk ${prod.name} (${item.color || "No Color"} / ${item.size || "No Size"})` }), { status: 400 });
				if (matchingVariant.stock < item.quantity) return new Response(JSON.stringify({ error: `Stok tidak mencukupi untuk ${prod.name} (${item.color || "No Color"} / ${item.size || "No Size"}). Tersisa: ${matchingVariant.stock}` }), { status: 400 });
			} else if (prod.stock < item.quantity) return new Response(JSON.stringify({ error: `Stok tidak mencukupi untuk ${prod.name}. Tersisa: ${prod.stock}` }), { status: 400 });
		}
		let payment_proof_url = null;
		if (payment_method === "bank_transfer" && payment_proof) try {
			const { fileName, fileType, fileBase64 } = payment_proof;
			const commaIndex = fileBase64.indexOf(",");
			const base64Data = commaIndex !== -1 ? fileBase64.substring(commaIndex + 1) : fileBase64;
			const fileBytes = Buffer.from(base64Data, "base64");
			const storagePath = `proof-checkout-${Date.now()}-${fileName}`;
			const contentType = fileType || "image/png";
			try {
				const { data: bucketData } = await supabaseAdmin.storage.getBucket("payment-proofs");
				if (!bucketData) await supabaseAdmin.storage.createBucket("payment-proofs", { public: true });
			} catch (bucketErr) {
				await supabaseAdmin.storage.createBucket("payment-proofs", { public: true }).catch(() => {});
			}
			const { error: uploadError } = await supabaseAdmin.storage.from("payment-proofs").upload(storagePath, fileBytes, {
				contentType,
				upsert: true
			});
			if (uploadError) {
				console.error("Gagal mengunggah bukti pembayaran:", uploadError);
				return new Response(JSON.stringify({ error: "Gagal mengunggah bukti transfer: " + uploadError.message }), {
					status: 400,
					headers: { "Content-Type": "application/json" }
				});
			}
			const { data: { publicUrl } } = supabaseAdmin.storage.from("payment-proofs").getPublicUrl(storagePath);
			payment_proof_url = publicUrl;
		} catch (decodeErr) {
			console.error("Gagal mendecode file bukti transfer:", decodeErr);
			return new Response(JSON.stringify({ error: "Format file bukti transfer tidak valid" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { data: order, error: orderError } = await supabaseAdmin.from("orders").insert({
			customer_id: customer_id || null,
			total_amount,
			shipping_address: `${customer_name} | Tel: ${phone} | Addr: ${shipping_address}`,
			payment_method,
			status: "pending",
			payment_status: "pending",
			province: province || null,
			shipping_fee,
			payment_proof_url
		}).select().single();
		if (orderError || !order) {
			console.error("Order insertion error:", orderError);
			return new Response(JSON.stringify({ error: orderError?.message || "Failed to create order record" }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		for (const item of items) {
			const isMock = item.id.startsWith("mock-");
			const { error: itemError } = await supabaseAdmin.from("order_items").insert({
				order_id: order.id,
				product_id: isMock ? null : item.id,
				quantity: item.quantity,
				unit_price: item.price,
				total_price: item.price * item.quantity,
				selected_color: item.color || null,
				selected_size: item.size || null
			});
			if (itemError) console.error("Order item insertion error:", itemError);
			if (!isMock) {
				const { data: dbVariants } = await supabaseAdmin.from("product_variants").select("id, stock, color, size").eq("product_id", item.id);
				if (dbVariants && dbVariants.length > 0) {
					const targetColor = (item.color || "").trim().toLowerCase();
					const targetSize = (item.size || "").trim().toLowerCase();
					const matchingVariant = dbVariants.find((v) => (v.color || "").trim().toLowerCase() === targetColor && (v.size || "").trim().toLowerCase() === targetSize);
					if (matchingVariant) {
						const newVarStock = Math.max(0, matchingVariant.stock - item.quantity);
						await supabaseAdmin.from("product_variants").update({ stock: newVarStock }).eq("id", matchingVariant.id);
					}
					const { data: updatedVariants } = await supabaseAdmin.from("product_variants").select("stock").eq("product_id", item.id);
					const sumStock = updatedVariants ? updatedVariants.reduce((sum, v) => sum + v.stock, 0) : 0;
					await supabaseAdmin.from("products").update({ stock: sumStock }).eq("id", item.id);
				} else {
					const { data: prod } = await supabaseAdmin.from("products").select("stock").eq("id", item.id).single();
					if (prod) {
						const newStock = Math.max(0, prod.stock - item.quantity);
						await supabaseAdmin.from("products").update({ stock: newStock }).eq("id", item.id);
					}
				}
			}
		}
		return new Response(JSON.stringify({
			success: true,
			orderId: order.id
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Server API Checkout error:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/checkout@_@ts
var page = () => checkout_exports;
//#endregion
export { page };
