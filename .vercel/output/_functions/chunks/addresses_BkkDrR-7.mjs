import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/customer/addresses.ts
var addresses_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var supabaseAdmin = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0", { auth: {
	persistSession: false,
	autoRefreshToken: false
} });
async function getAuthUser(request) {
	const authHeader = request.headers.get("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
	const token = authHeader.split(" ")[1];
	const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
	if (error || !user) return null;
	return user;
}
var GET = async ({ request }) => {
	const user = await getAuthUser(request);
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { data: addresses, error } = await supabaseAdmin.from("customer_addresses").select("*").eq("customer_id", user.id).order("is_default", { ascending: false }).order("created_at", { ascending: false });
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data: addresses
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
var POST = async ({ request }) => {
	const user = await getAuthUser(request);
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { label, recipient_name, phone, street, province, city, zip, is_default } = await request.json();
		if (!label || !recipient_name || !phone || !street || !province || !city) return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
		if (is_default) await supabaseAdmin.from("customer_addresses").update({ is_default: false }).eq("customer_id", user.id);
		const { data, error } = await supabaseAdmin.from("customer_addresses").insert({
			customer_id: user.id,
			label,
			recipient_name,
			phone,
			street,
			province,
			city,
			zip: zip || null,
			is_default: !!is_default
		}).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
var PUT = async ({ request }) => {
	const user = await getAuthUser(request);
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { id, label, recipient_name, phone, street, province, city, zip, is_default } = await request.json();
		if (!id || !label || !recipient_name || !phone || !street || !province || !city) return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
		const { data: existing } = await supabaseAdmin.from("customer_addresses").select("customer_id").eq("id", id).single();
		if (!existing || existing.customer_id !== user.id) return new Response(JSON.stringify({ error: "Not Found or Unauthorized" }), { status: 404 });
		if (is_default) await supabaseAdmin.from("customer_addresses").update({ is_default: false }).eq("customer_id", user.id);
		const { data, error } = await supabaseAdmin.from("customer_addresses").update({
			label,
			recipient_name,
			phone,
			street,
			province,
			city,
			zip: zip || null,
			is_default: !!is_default
		}).eq("id", id).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
var DELETE = async ({ url, request }) => {
	const user = await getAuthUser(request);
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const id = url.searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "Missing address ID" }), { status: 400 });
		const { data: existing } = await supabaseAdmin.from("customer_addresses").select("customer_id").eq("id", id).single();
		if (!existing || existing.customer_id !== user.id) return new Response(JSON.stringify({ error: "Not Found or Unauthorized" }), { status: 404 });
		const { error } = await supabaseAdmin.from("customer_addresses").delete().eq("id", id);
		if (error) throw error;
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/customer/addresses@_@ts
var page = () => addresses_exports;
//#endregion
export { page };
