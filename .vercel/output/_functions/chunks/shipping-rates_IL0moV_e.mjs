import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/shipping-rates.ts
var shipping_rates_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var supabaseUrl = "https://ykdzmonuxadattbfaxdw.supabase.co";
var supabaseAnonKey = "sb_publishable_YsWL7FrjY4VKzV82vSLjug_-LTCBWJr";
var supabaseAdmin = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0", { auth: {
	persistSession: false,
	autoRefreshToken: false
} });
async function authenticateAdmin(request) {
	const token = request.headers.get("Authorization")?.split(" ")[1];
	if (!token) return null;
	const { data: { user }, error } = await createClient(supabaseUrl, supabaseAnonKey, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} }).auth.getUser(token);
	if (error || !user) return null;
	const { data: profile } = await supabaseAdmin.from("profiles").select("role").eq("id", user.id).single();
	if (profile?.role !== "admin" && profile?.role !== "super_admin") return null;
	return user;
}
var GET = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { data, error } = await supabaseAdmin.from("shipping_rates").select("*").order("province", { ascending: true });
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var POST = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { province, rate } = await request.json();
		if (!province || rate === void 0) return new Response(JSON.stringify({ error: "Province and rate are required" }), { status: 400 });
		const { data, error } = await supabaseAdmin.from("shipping_rates").insert({
			province,
			rate: Number(rate)
		}).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var PUT = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { id, province, rate } = await request.json();
		if (!id) return new Response(JSON.stringify({ error: "Rate ID is required" }), { status: 400 });
		const updates = {};
		if (province) updates.province = province;
		if (rate !== void 0) updates.rate = Number(rate);
		const { data, error } = await supabaseAdmin.from("shipping_rates").update(updates).eq("id", id).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var DELETE = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
		const { error } = await supabaseAdmin.from("shipping_rates").delete().eq("id", id);
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/shipping-rates@_@ts
var page = () => shipping_rates_exports;
//#endregion
export { page };
