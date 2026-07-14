import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, n as renderScript } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, {
		"title": "Log In - ShopWise",
		"data-astro-cid-sjqh5bze": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main my-5" data-astro-cid-sjqh5bze><div class="container" data-astro-cid-sjqh5bze><div class="row justify-content-center" data-astro-cid-sjqh5bze><div class="col-md-6 col-lg-5" data-astro-cid-sjqh5bze><div class="card border-0 shadow-lg p-4 bg-white rounded-4" data-astro-cid-sjqh5bze><div class="text-center mb-4" data-astro-cid-sjqh5bze><h2 class="fw-bold text-dark mb-1" data-astro-cid-sjqh5bze>Welcome Back</h2><p class="text-muted" data-astro-cid-sjqh5bze>Sign in to manage your orders and account</p></div><div id="alert-container" data-astro-cid-sjqh5bze></div><form id="login-form" data-astro-cid-sjqh5bze><div class="mb-3" data-astro-cid-sjqh5bze><label for="email" class="form-label fw-semibold" data-astro-cid-sjqh5bze>Email Address</label><div class="input-group" data-astro-cid-sjqh5bze><span class="input-group-text bg-light border-end-0 text-muted" data-astro-cid-sjqh5bze><i class="bi bi-envelope" data-astro-cid-sjqh5bze></i></span><input type="email" class="form-control bg-light border-start-0" id="email" required placeholder="name@example.com" data-astro-cid-sjqh5bze></div></div><div class="mb-4" data-astro-cid-sjqh5bze><label for="password" class="form-label fw-semibold" data-astro-cid-sjqh5bze>Password</label><div class="input-group" data-astro-cid-sjqh5bze><span class="input-group-text bg-light border-end-0 text-muted" data-astro-cid-sjqh5bze><i class="bi bi-lock" data-astro-cid-sjqh5bze></i></span><input type="password" class="form-control bg-light border-start-0" id="password" required placeholder="••••••••" data-astro-cid-sjqh5bze></div></div><button type="submit" class="btn btn-primary w-100 py-2.5 fw-bold rounded-3" id="submit-btn" data-astro-cid-sjqh5bze><span id="btn-text" data-astro-cid-sjqh5bze>Sign In</span><span id="btn-spinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" data-astro-cid-sjqh5bze></span></button></form><div class="text-center mt-4" data-astro-cid-sjqh5bze><p class="text-muted mb-0" data-astro-cid-sjqh5bze>Don't have an account? <a href="/register" class="text-primary fw-bold text-decoration-none" data-astro-cid-sjqh5bze>Register here</a></p></div></div></div></div></div></main>` })}${renderScript($$result, "D:/Kuliah/Magang/e-commerce/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/login.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
