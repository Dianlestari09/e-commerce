import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/articles.ts
var articles_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
function getAuthClient(request) {
	const authHeader = request.headers.get("Authorization");
	return createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "sb_publishable_YsWL7FrjY4VKzV82vSLjug_-LTCBWJr", { global: { headers: { Authorization: `Bearer ${authHeader ? authHeader.replace("Bearer ", "") : ""}` } } });
}
var GET = async ({ request }) => {
	try {
		const { data, error } = await getAuthClient(request).from("articles").select("id, title, slug, category, status, published_at, created_at, author_name, excerpt, cover_image, tags").order("created_at", { ascending: false });
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
var POST = async ({ request }) => {
	try {
		const { title, slug, excerpt, content, cover_image, author_name, category, tags, status, meta_title, meta_description, schema_code, related_article_ids } = await request.json();
		if (!title || !slug) return new Response(JSON.stringify({ error: "Title and slug are required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const authSupabase = getAuthClient(request);
		const published_at = status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null;
		const { data, error } = await authSupabase.from("articles").insert({
			title,
			slug,
			excerpt: excerpt || null,
			content: content || null,
			cover_image: cover_image || null,
			author_name: author_name || "Dian Lestari Kurniawati",
			category: category || "tips",
			tags: tags && tags.length > 0 ? tags : null,
			status: status || "draft",
			meta_title: meta_title || null,
			meta_description: meta_description || null,
			schema_code: schema_code || null,
			related_article_ids: related_article_ids || [],
			published_at
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
var PUT = async ({ request }) => {
	try {
		const { id, title, slug, excerpt, content, cover_image, author_name, category, tags, status, meta_title, meta_description, schema_code, related_article_ids } = await request.json();
		if (!id || !title || !slug) return new Response(JSON.stringify({ error: "ID, title, and slug are required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const authSupabase = getAuthClient(request);
		const { data: existing } = await authSupabase.from("articles").select("published_at, status").eq("id", id).single();
		let published_at = existing?.published_at ?? null;
		if (status === "published" && !published_at) published_at = (/* @__PURE__ */ new Date()).toISOString();
		if (status === "draft") published_at = null;
		const { data, error } = await authSupabase.from("articles").update({
			title,
			slug,
			excerpt: excerpt || null,
			content: content || null,
			cover_image: cover_image || null,
			author_name: author_name || "Dian Lestari Kurniawati",
			category: category || "tips",
			tags: tags && tags.length > 0 ? tags : null,
			status: status || "draft",
			meta_title: meta_title || null,
			meta_description: meta_description || null,
			schema_code: schema_code || null,
			related_article_ids: related_article_ids || [],
			published_at
		}).eq("id", id).select().single();
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
		if (!id) return new Response(JSON.stringify({ error: "Article ID is required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { error } = await getAuthClient(request).from("articles").delete().eq("id", id);
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
//#region \0virtual:astro:page:src/pages/api/admin/articles@_@ts
var page = () => articles_exports;
//#endregion
export { page };
