import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/settings.ts
var settings_exports = /* @__PURE__ */ __exportAll({
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
async function authenticateSuperAdmin(request) {
	const token = request.headers.get("Authorization")?.split(" ")[1];
	if (!token) return null;
	const { data: { user }, error } = await createClient(supabaseUrl, supabaseAnonKey, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} }).auth.getUser(token);
	if (error || !user) return null;
	const { data: profile } = await supabaseAdmin.from("profiles").select("role").eq("id", user.id).single();
	if (profile?.role !== "super_admin") return null;
	return user;
}
var GET = async ({ request }) => {
	try {
		if (!await authenticateSuperAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { data, error } = await supabaseAdmin.from("site_settings").select("*");
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var PUT = async ({ request }) => {
	try {
		if (!await authenticateSuperAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { key, value } = await request.json();
		if (!key || !value) return new Response(JSON.stringify({ error: "Key and value are required" }), { status: 400 });
		const { data, error } = await supabaseAdmin.from("site_settings").upsert({
			key,
			value,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}, { onConflict: "key" }).select();
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var POST = PUT;
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/settings@_@ts
var page = () => settings_exports;
//#endregion
export { page };
