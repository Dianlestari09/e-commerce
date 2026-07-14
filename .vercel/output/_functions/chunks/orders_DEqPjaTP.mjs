import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/admin/orders.ts
var orders_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var supabaseAdmin = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0");
async function authenticateAdmin(request) {
	const authHeader = request.headers.get("Authorization");
	if (!authHeader) return null;
	const token = authHeader.split(" ")[1];
	const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
	if (error || !user) return null;
	const { data: profile } = await supabaseAdmin.from("profiles").select("role").eq("id", user.id).single();
	if (profile?.role !== "admin" && profile?.role !== "super_admin") return null;
	return user;
}
var PUT = async ({ request }) => {
	try {
		if (!await authenticateAdmin(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		const { id, status, payment_status } = await request.json();
		if (!id) return new Response(JSON.stringify({ error: "Order ID is required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const updates = {};
		if (status) updates.status = status;
		if (payment_status) updates.payment_status = payment_status;
		updates.updated_at = (/* @__PURE__ */ new Date()).toISOString();
		const { data, error } = await supabaseAdmin.from("orders").update(updates).eq("id", id).select().single();
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
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/orders@_@ts
var page = () => orders_exports;
//#endregion
export { page };
