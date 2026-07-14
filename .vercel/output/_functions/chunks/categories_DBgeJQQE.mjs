import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./supabase_CciFyEBF.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/categories.ts
var categories_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST,
	prerender: () => false
});
function getAuthClient(request) {
	const authHeader = request.headers.get("Authorization");
	return createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "sb_publishable_YsWL7FrjY4VKzV82vSLjug_-LTCBWJr", { global: { headers: { Authorization: `Bearer ${authHeader ? authHeader.replace("Bearer ", "") : ""}` } } });
}
var POST = async ({ request }) => {
	try {
		const { name, slug, description, image_url } = await request.json();
		if (!name || !slug) return new Response(JSON.stringify({ error: "Name and slug are required fields" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await getAuthClient(request).from("categories").insert({
			name,
			slug,
			description,
			image_url
		}).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
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
		if (!id) return new Response(JSON.stringify({ error: "Category ID is required for deletion" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { error } = await getAuthClient(request).from("categories").delete().eq("id", id);
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
//#region \0virtual:astro:page:src/pages/api/admin/categories@_@ts
var page = () => categories_exports;
//#endregion
export { page };
