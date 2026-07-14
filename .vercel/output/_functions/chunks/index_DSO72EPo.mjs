import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createAstro } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/articles/index.astro
var articles_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	let articles = [];
	let categories = [];
	try {
		const { data } = await supabase.from("articles").select("id, title, slug, excerpt, cover_image, author_name, category, tags, published_at, created_at").eq("status", "published").order("published_at", { ascending: false });
		if (data) {
			articles = data;
			const catSet = new Set(data.map((a) => a.category).filter(Boolean));
			categories = Array.from(catSet);
		}
	} catch (e) {
		console.error("Failed to load articles:", e);
	}
	function formatDate(dateStr) {
		if (!dateStr) return "";
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	}
	const categoryLabels = {
		tips: "Tips & Tricks",
		review: "Product Review",
		news: "News",
		inspirasi: "Inspirasi",
		promo: "Promo & Deals",
		tutorial: "Tutorial"
	};
	const pageTitle = "Blog & Artikel - ShopWise";
	const pageDesc = "Temukan tips belanja cerdas, review produk terbaru, inspirasi dekorasi rumah, dan panduan gaya hidup dari tim ShopWise.";
	const canonicalUrl = `${Astro.url.origin}/articles`;
	const itemListSchema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "ShopWise Blog & Artikel",
		"description": pageDesc,
		"url": canonicalUrl,
		"numberOfItems": articles.length,
		"itemListElement": articles.slice(0, 10).map((a, i) => ({
			"@type": "ListItem",
			"position": i + 1,
			"url": `${Astro.url.origin}/articles/${a.slug}`,
			"name": a.title
		}))
	};
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, {
		"title": pageTitle,
		"description": pageDesc,
		"data-astro-cid-v4uzzqp3": true
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main" data-astro-cid-v4uzzqp3><!-- Hero Section --><section class="articles-hero py-5 text-white" style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%); min-height: 320px; display: flex; align-items: center;" data-astro-cid-v4uzzqp3><div class="container text-center py-4" data-astro-cid-v4uzzqp3><span class="badge px-3 py-2 mb-3 text-uppercase" style="background: rgba(255,255,255,0.15); letter-spacing: 1.5px; font-size: 0.75rem;" data-astro-cid-v4uzzqp3>Blog & Artikel</span><h1 class="display-4 fw-bold mb-3" data-astro-cid-v4uzzqp3>Insights, Tips & Inspirasi</h1><p class="lead text-light mx-auto" style="max-width: 600px; opacity: 0.85;" data-astro-cid-v4uzzqp3>Panduan belanja cerdas, review produk jujur, dan inspirasi gaya hidup dari tim ShopWise.</p></div></section><!-- Filter & Article Grid --><section class="py-5" data-astro-cid-v4uzzqp3><div class="container" data-astro-cid-v4uzzqp3><!-- Category Filter -->${categories.length > 0 && renderTemplate`<div class="d-flex flex-wrap gap-2 mb-5 justify-content-center" id="category-filters" data-astro-cid-v4uzzqp3><button class="btn btn-primary btn-sm rounded-pill px-4 filter-btn active" data-cat="all" data-astro-cid-v4uzzqp3>All Articles</button>${categories.map((cat) => renderTemplate`<button class="btn btn-outline-secondary btn-sm rounded-pill px-4 filter-btn"${addAttribute(cat, "data-cat")} data-astro-cid-v4uzzqp3>${categoryLabels[cat] || cat}</button>`)}</div>`}${articles.length === 0 ? renderTemplate`<div class="text-center py-5" data-astro-cid-v4uzzqp3><i class="bi bi-newspaper text-muted" style="font-size: 4rem; opacity: 0.3;" data-astro-cid-v4uzzqp3></i><h3 class="mt-4 text-muted" data-astro-cid-v4uzzqp3>Belum ada artikel yang dipublikasikan</h3><p class="text-muted" data-astro-cid-v4uzzqp3>Nantikan konten menarik dari tim ShopWise.</p></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${articles.length > 0 && renderTemplate`<div class="mb-5 article-card"${addAttribute(articles[0].category, "data-cat")} data-astro-cid-v4uzzqp3><a${addAttribute(`/articles/${articles[0].slug}`, "href")} class="text-decoration-none" data-astro-cid-v4uzzqp3><div class="card border-0 shadow-sm overflow-hidden rounded-4 article-featured-card" data-astro-cid-v4uzzqp3><div class="row g-0 align-items-stretch" data-astro-cid-v4uzzqp3><div class="col-lg-6" data-astro-cid-v4uzzqp3><div class="position-relative h-100" style="min-height: 320px;" data-astro-cid-v4uzzqp3><img${addAttribute(articles[0].cover_image || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(articles[0].title, "alt")} class="img-fluid w-100 h-100 object-fit-cover" style="object-fit: cover;" loading="eager" data-astro-cid-v4uzzqp3><div class="position-absolute top-0 start-0 m-3" data-astro-cid-v4uzzqp3><span class="badge text-white text-capitalize px-3 py-2" style="background: rgba(13,110,253,0.9); font-size: 0.75rem;" data-astro-cid-v4uzzqp3>${categoryLabels[articles[0].category] || articles[0].category}</span></div></div></div><div class="col-lg-6 d-flex flex-column" data-astro-cid-v4uzzqp3><div class="card-body p-4 p-lg-5 d-flex flex-column" data-astro-cid-v4uzzqp3><div class="mb-3" data-astro-cid-v4uzzqp3><span class="badge bg-warning text-dark px-3 py-1 rounded-pill small" data-astro-cid-v4uzzqp3>✨ Featured</span></div><h2 class="fw-bold mb-3 text-dark lh-sm" style="font-size: 1.5rem;" data-astro-cid-v4uzzqp3>${articles[0].title}</h2><p class="text-muted mb-4 flex-grow-1" style="line-height: 1.7;" data-astro-cid-v4uzzqp3>${articles[0].excerpt}</p><div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-auto" data-astro-cid-v4uzzqp3><div class="d-flex align-items-center gap-2 text-muted small" data-astro-cid-v4uzzqp3><div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" style="width: 32px; height: 32px; font-size: 0.75rem; font-weight: 600; flex-shrink: 0;" data-astro-cid-v4uzzqp3>${(articles[0].author_name || "D").charAt(0).toUpperCase()}</div><div data-astro-cid-v4uzzqp3><div class="fw-semibold text-dark" style="font-size: 0.85rem;" data-astro-cid-v4uzzqp3>${articles[0].author_name || "Dian Lestari Kurniawati"}</div><div style="font-size: 0.75rem;" data-astro-cid-v4uzzqp3>${formatDate(articles[0].published_at)}</div></div></div><span class="btn btn-primary btn-sm rounded-pill px-4" data-astro-cid-v4uzzqp3>Baca <i class="bi bi-arrow-right ms-1" data-astro-cid-v4uzzqp3></i></span></div></div></div></div></div></a></div>`}${articles.length > 1 && renderTemplate`<div class="row g-4" id="articles-grid" data-astro-cid-v4uzzqp3>${articles.slice(1).map((article) => renderTemplate`<div class="col-md-6 col-lg-4 article-card"${addAttribute(article.category, "data-cat")} data-astro-cid-v4uzzqp3><a${addAttribute(`/articles/${article.slug}`, "href")} class="text-decoration-none h-100 d-block" data-astro-cid-v4uzzqp3><div class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden article-grid-card" data-astro-cid-v4uzzqp3><div class="position-relative" style="height: 220px; overflow: hidden;" data-astro-cid-v4uzzqp3><img${addAttribute(article.cover_image || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(article.title, "alt")} class="img-fluid w-100 h-100 article-thumb" style="object-fit: cover; transition: transform 0.4s ease;" loading="lazy" data-astro-cid-v4uzzqp3><div class="position-absolute top-0 start-0 m-3" data-astro-cid-v4uzzqp3><span class="badge text-white text-capitalize px-3 py-1" style="background: rgba(0,0,0,0.6); font-size: 0.7rem; backdrop-filter: blur(4px);" data-astro-cid-v4uzzqp3>${categoryLabels[article.category] || article.category}</span></div></div><div class="card-body p-4 d-flex flex-column" data-astro-cid-v4uzzqp3><h3 class="fw-bold text-dark mb-2 lh-sm" style="font-size: 1.05rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" data-astro-cid-v4uzzqp3>${article.title}</h3><p class="text-muted small mb-3 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.6;" data-astro-cid-v4uzzqp3>${article.excerpt}</p><div class="d-flex align-items-center justify-content-between mt-auto pt-3 border-top" data-astro-cid-v4uzzqp3><div class="text-muted" style="font-size: 0.78rem;" data-astro-cid-v4uzzqp3><i class="bi bi-calendar3 me-1" data-astro-cid-v4uzzqp3></i>${formatDate(article.published_at)}</div><div class="text-primary fw-semibold small" data-astro-cid-v4uzzqp3>Baca <i class="bi bi-arrow-right" data-astro-cid-v4uzzqp3></i></div></div></div></div></a></div>`)}</div>`}` })}`}</div></section></main><script>
    document.addEventListener('DOMContentLoaded', function () {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const articleCards = document.querySelectorAll('.article-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          const cat = this.dataset.cat;
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          articleCards.forEach(card => {
            if (cat === 'all' || card.dataset.cat === cat) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    });
  <\/script>`,
		"head": ($$result) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result) => renderTemplate`<link rel="canonical"${addAttribute(canonicalUrl, "href")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDesc, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}>${articles[0]?.cover_image && renderTemplate`<meta property="og:image"${addAttribute(articles[0].cover_image, "content")}>`}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(pageDesc, "content")}>${articles[0]?.cover_image && renderTemplate`<meta name="twitter:image"${addAttribute(articles[0].cover_image, "content")}>`}<script type="application/ld+json">${unescapeHTML(JSON.stringify(itemListSchema))}<\/script>` })}`
	})}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/articles/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/articles/index.astro";
var $$url = "/articles";
//#endregion
//#region \0virtual:astro:page:src/pages/articles/index@_@astro
var page = () => articles_exports;
//#endregion
export { page };
