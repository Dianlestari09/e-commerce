import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/users.ts
var users_exports = /* @__PURE__ */ __exportAll({
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
	if (profile?.role !== "super_admin") return null;
	return user;
}
var GET = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { data, error } = await supabaseAdmin.auth.admin.listUsers();
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		const formattedUsers = data.users.map((u) => ({
			id: u.id,
			email: u.email,
			full_name: u.user_metadata?.full_name || "N/A",
			phone: u.user_metadata?.phone || "-",
			role: u.user_metadata?.role || "customer",
			shipping_address: u.user_metadata?.shipping_address || "-",
			created_at: u.created_at
		}));
		formattedUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		return new Response(JSON.stringify({
			success: true,
			data: formattedUsers
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var POST = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { email, password, full_name, phone, role, shipping_address } = await request.json();
		if (!email || !password || !full_name) return new Response(JSON.stringify({ error: "Email, password, and full name are required" }), { status: 400 });
		const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: {
				full_name,
				phone,
				role: role || "customer",
				shipping_address
			}
		});
		if (authError || !authData.user) return new Response(JSON.stringify({ error: authError?.message || "Failed to create user" }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			user: authData.user
		}), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var PUT = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { id, password, full_name, phone, role, shipping_address } = await request.json();
		if (!id) return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
		const authUpdates = { user_metadata: {
			full_name,
			phone,
			role,
			shipping_address
		} };
		if (password) authUpdates.password = password;
		const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, authUpdates);
		if (authError) return new Response(JSON.stringify({ error: authError.message }), { status: 400 });
		const profileUpdates = {
			full_name,
			phone,
			role,
			shipping_address
		};
		const { error: profileError } = await supabaseAdmin.from("profiles").update(profileUpdates).eq("id", id);
		if (profileError) return new Response(JSON.stringify({ error: profileError.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			user: authData.user
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var DELETE = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { id } = await request.json();
		if (!id) return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
		const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/users@_@ts
var page = () => users_exports;
//#endregion
export { page };
