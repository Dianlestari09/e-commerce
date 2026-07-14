import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, _ as renderHead, f as renderTemplate, n as renderScript } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
//#region src/pages/admin/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="en" data-astro-cid-xeimgta2><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login - EasyAdmin</title><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- Bootstrap & Icons --><link href="/admin/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"><link href="/admin/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">${renderHead($$result)}</head><body data-astro-cid-xeimgta2><div class="login-card" data-astro-cid-xeimgta2><div class="text-center mb-4" data-astro-cid-xeimgta2><div class="logo-container" data-astro-cid-xeimgta2><img src="/admin/assets/img/logo.webp" alt="EasyAdmin Logo" data-astro-cid-xeimgta2><span data-astro-cid-xeimgta2>EasyAdmin</span></div><h4 class="fw-bold mb-1" data-astro-cid-xeimgta2>Administration Panel</h4><p class="text-muted small" data-astro-cid-xeimgta2>Sign in with your admin or reseller credentials</p></div><div id="alert-container" data-astro-cid-xeimgta2></div><form id="admin-login-form" data-astro-cid-xeimgta2><div class="mb-3" data-astro-cid-xeimgta2><label for="email" class="form-label small fw-semibold text-muted" data-astro-cid-xeimgta2>EMAIL ADDRESS</label><div class="input-group" data-astro-cid-xeimgta2><span class="input-group-text" data-astro-cid-xeimgta2><i class="bi bi-envelope" data-astro-cid-xeimgta2></i></span><input type="email" class="form-control" id="email" required placeholder="admin@example.com" data-astro-cid-xeimgta2></div></div><div class="mb-4" data-astro-cid-xeimgta2><label for="password" class="form-label small fw-semibold text-muted" data-astro-cid-xeimgta2>PASSWORD</label><div class="input-group" data-astro-cid-xeimgta2><span class="input-group-text" data-astro-cid-xeimgta2><i class="bi bi-lock" data-astro-cid-xeimgta2></i></span><input type="password" class="form-control" id="password" required placeholder="••••••••" data-astro-cid-xeimgta2></div></div><button type="submit" class="btn btn-login w-100 d-flex align-items-center justify-content-center gap-2" id="submit-btn" data-astro-cid-xeimgta2><span id="btn-text" data-astro-cid-xeimgta2>Log In</span><span id="btn-spinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" data-astro-cid-xeimgta2></span></button></form></div>${renderScript($$result, "D:/Kuliah/Magang/e-commerce/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}<!-- Bootstrap Bundle JS --><script src="/admin/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"><\/script></body></html>`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/login.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/login.astro";
var $$url = "/admin/login";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
