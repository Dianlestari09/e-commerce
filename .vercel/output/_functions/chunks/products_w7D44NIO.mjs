import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./supabase_CciFyEBF.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/products.ts
var products_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
function getAuthClient(request) {
	const authHeader = request.headers.get("Authorization");
	return createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "sb_publishable_YsWL7FrjY4VKzV82vSLjug_-LTCBWJr", { global: { headers: { Authorization: `Bearer ${authHeader ? authHeader.replace("Bearer ", "") : ""}` } } });
}
var POST = async ({ request }) => {
	try {
		const { name, slug, price, sale_price, stock, sku, category_id, description, image_url, colors, sizes, variants } = await request.json();
		if (!name || !slug || !price) return new Response(JSON.stringify({ error: "Name, slug, and price are required fields" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		let finalStock = Number(stock || 0);
		const hasVariants = Array.isArray(variants) && variants.length > 0;
		if (hasVariants) finalStock = variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);
		const authSupabase = getAuthClient(request);
		const { data, error } = await authSupabase.from("products").insert({
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
		}).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (hasVariants) {
			const dbVariants = variants.map((v) => ({
				product_id: data.id,
				color: v.color || null,
				size: v.size || null,
				stock: Number(v.stock || 0)
			}));
			const { error: variantError } = await authSupabase.from("product_variants").insert(dbVariants);
			if (variantError) console.error("Error inserting variants:", variantError.message);
		}
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async ({ request }) => {
	try {
		const { id, name, slug, price, sale_price, stock, sku, category_id, description, image_url, colors, sizes, variants } = await request.json();
		if (!id || !name || !slug || !price) return new Response(JSON.stringify({ error: "ID, name, slug, and price are required fields" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		let finalStock = Number(stock || 0);
		const hasVariants = Array.isArray(variants) && variants.length > 0;
		if (hasVariants) finalStock = variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);
		const authSupabase = getAuthClient(request);
		const { data, error } = await authSupabase.from("products").update({
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
		}).eq("id", id).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await authSupabase.from("product_variants").delete().eq("product_id", id);
		if (hasVariants) {
			const dbVariants = variants.map((v) => ({
				product_id: id,
				color: v.color || null,
				size: v.size || null,
				stock: Number(v.stock || 0)
			}));
			const { error: variantError } = await authSupabase.from("product_variants").insert(dbVariants);
			if (variantError) console.error("Error inserting variants:", variantError.message);
		}
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "Product ID is required for deletion" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { error } = await getAuthClient(request).from("products").delete().eq("id", id);
		if (error) return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/products@_@ts
var page = () => products_exports;
//#endregion
export { page };
