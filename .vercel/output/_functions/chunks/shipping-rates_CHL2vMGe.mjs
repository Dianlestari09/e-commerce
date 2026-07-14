import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/shipping-rates.ts
var shipping_rates_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var supabase = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "sb_publishable_YsWL7FrjY4VKzV82vSLjug_-LTCBWJr");
var GET = async () => {
	try {
		const { data, error } = await supabase.from("shipping_rates").select("province, rate").order("province", { ascending: true });
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
		return new Response(JSON.stringify({
			success: true,
			data
		}), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/shipping-rates@_@ts
var page = () => shipping_rates_exports;
//#endregion
export { page };
