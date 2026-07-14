import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createAstro } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/articles/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	let article = null;
	let relatedArticles = [];
	let inlinkedArticles = [];
	let sidebarArticles = [];
	try {
		const { data: artData } = await supabase.from("articles").select("*").eq("slug", slug).single();
		if (artData) {
			article = artData;
			if (article.related_article_ids && article.related_article_ids.length > 0) {
				const { data: inData } = await supabase.from("articles").select("id, title, slug").in("id", article.related_article_ids).eq("status", "published");
				if (inData) inlinkedArticles = inData;
			}
			const { data: relData } = await supabase.from("articles").select("id, title, slug, excerpt, cover_image, category, published_at").eq("status", "published").eq("category", article.category).neq("id", article.id).limit(3);
			if (relData) relatedArticles = relData;
			const { data: sideData } = await supabase.from("articles").select("id, title, slug, cover_image, category, published_at").eq("status", "published").neq("id", article.id).order("published_at", { ascending: false }).limit(5);
			if (sideData) sidebarArticles = sideData;
		}
	} catch (e) {
		console.error(`Failed to load article details for slug ${slug}:`, e);
	}
	if (!article || article.status !== "published") return Astro.redirect("/404");
	function formatDate(dateStr) {
		if (!dateStr) return "";
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	}
	function readingTime(text) {
		if (!text) return "1 min";
		const words = text.replace(/<[^>]+>/g, "").split(/\s+/).length;
		return `${Math.max(1, Math.ceil(words / 200))} min read`;
	}
	const metaTitle = article.meta_title || `${article.title} - ShopWise`;
	const metaDesc = article.meta_description || article.excerpt || "";
	const canonicalUrl = `${Astro.url.origin}/articles/${article.slug}`;
	const shareImage = article.cover_image || `${Astro.url.origin}/shop/assets/img/product/product-default.webp`;
	let jsonLdSchema = "";
	if (article.schema_code && article.schema_code.trim()) jsonLdSchema = article.schema_code;
	else {
		const defaultSchemaObj = {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": article.title,
			"description": article.excerpt,
			"image": shareImage,
			"datePublished": article.published_at || article.created_at,
			"dateModified": article.updated_at || article.published_at || article.created_at,
			"author": {
				"@type": "Person",
				"name": article.author_name || "Dian Lestari Kurniawati"
			},
			"publisher": {
				"@type": "Organization",
				"name": "ShopWise",
				"logo": {
					"@type": "ImageObject",
					"url": `${Astro.url.origin}/shop/assets/img/favicon.png`
				}
			},
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": canonicalUrl
			}
		};
		jsonLdSchema = JSON.stringify(defaultSchemaObj);
	}
	const categoryLabels = {
		tips: "Tips & Tricks",
		review: "Product Review",
		news: "News",
		inspirasi: "Inspirasi",
		promo: "Promo & Deals",
		tutorial: "Tutorial"
	};
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, {
		"title": metaTitle,
		"description": metaDesc,
		"data-astro-cid-57z6rh23": true
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main my-5" data-astro-cid-57z6rh23><article class="container" data-astro-cid-57z6rh23><!-- Back Link --><nav class="mb-4" data-astro-cid-57z6rh23><a href="/articles" class="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 hover-primary" data-astro-cid-57z6rh23><i class="bi bi-arrow-left" data-astro-cid-57z6rh23></i> Kembali ke Blog</a></nav><div class="row g-4 justify-content-center" data-astro-cid-57z6rh23><!-- ================= KOLOM UTAMA (KIRI) ================= --><div class="col-lg-8" data-astro-cid-57z6rh23><!-- Category and Meta --><div class="d-flex flex-wrap align-items-center gap-3 mb-3" data-astro-cid-57z6rh23><span class="badge text-white text-capitalize px-3 py-2" style="background: var(--bs-primary); font-size: 0.75rem;" data-astro-cid-57z6rh23>${categoryLabels[article.category] || article.category}</span><div class="text-muted small d-flex align-items-center gap-3" data-astro-cid-57z6rh23><span data-astro-cid-57z6rh23><i class="bi bi-calendar3 me-1" data-astro-cid-57z6rh23></i>${formatDate(article.published_at)}</span><span data-astro-cid-57z6rh23>•</span><span data-astro-cid-57z6rh23><i class="bi bi-clock me-1" data-astro-cid-57z6rh23></i>${readingTime(article.content)}</span></div></div><!-- Title --><h1 class="display-5 fw-bold text-dark mb-4 lh-sm" data-astro-cid-57z6rh23>${article.title}</h1><!-- Author Info --><div class="d-flex align-items-center gap-3 py-3 border-top border-bottom mb-4" data-astro-cid-57z6rh23><div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold" style="width: 48px; height: 48px; font-size: 1.1rem;" data-astro-cid-57z6rh23>${(article.author_name || "D").charAt(0).toUpperCase()}</div><div data-astro-cid-57z6rh23><div class="fw-semibold text-dark mb-0" data-astro-cid-57z6rh23>${article.author_name || "Dian Lestari Kurniawati"}</div><div class="text-muted small" data-astro-cid-57z6rh23>Penulis & Kontributor ShopWise</div></div></div><!-- Featured Image -->${article.cover_image && renderTemplate`<div class="mb-5 rounded-4 overflow-hidden shadow-sm" data-astro-cid-57z6rh23><img${addAttribute(article.cover_image, "src")}${addAttribute(article.title, "alt")} class="img-fluid w-100 object-fit-cover" style="max-height: 480px; width: 100%; object-fit: cover;" loading="eager" data-astro-cid-57z6rh23></div>`}<!-- Excerpt Intro -->${article.excerpt && renderTemplate`<p class="lead text-muted mb-4 fw-normal border-start border-primary border-4 ps-3 style-excerpt" data-astro-cid-57z6rh23>${article.excerpt}</p>`}<!-- Rich Content HTML --><div class="article-body-content text-dark mb-4 lh-lg" style="font-size: 1.05rem;" data-astro-cid-57z6rh23>${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(article.content)}` })}</div><!-- BACA JUGA (Inlink) Box -->${inlinkedArticles.length > 0 && renderTemplate`<div class="card border-0 border-start border-primary border-4 bg-light rounded-3 p-4 my-5 shadow-sm baca-juga-card" data-astro-cid-57z6rh23><div class="fw-bold text-dark mb-3" style="font-size: 0.95rem; letter-spacing: 0.5px;" data-astro-cid-57z6rh23><i class="bi bi-link-45deg text-primary" style="font-size: 1.3rem; vertical-align: middle;" data-astro-cid-57z6rh23></i> BACA JUGA:</div><ul class="list-unstyled mb-0 d-flex flex-column gap-3" data-astro-cid-57z6rh23>${inlinkedArticles.map((inlink) => renderTemplate`<li data-astro-cid-57z6rh23><a${addAttribute(`/articles/${inlink.slug}`, "href")} class="text-decoration-none fw-bold text-primary hover-underline d-inline-flex align-items-baseline" style="font-size: 1.02rem;" data-astro-cid-57z6rh23><span class="me-2 text-warning" data-astro-cid-57z6rh23>👉</span><span data-astro-cid-57z6rh23>${inlink.title}</span></a></li>`)}</ul></div>`}<!-- Tags -->${article.tags && article.tags.length > 0 && renderTemplate`<div class="border-top pt-4 mb-5" data-astro-cid-57z6rh23><div class="d-flex flex-wrap align-items-center gap-2" data-astro-cid-57z6rh23><span class="text-muted small me-2" data-astro-cid-57z6rh23><i class="bi bi-tags me-1" data-astro-cid-57z6rh23></i> Tags:</span>${article.tags.map((tag) => renderTemplate`<span class="badge bg-light text-secondary border px-3 py-2 rounded-pill small" data-astro-cid-57z6rh23>#${tag}</span>`)}</div></div>`}<!-- Share buttons --><div class="card bg-light border-0 rounded-4 p-4 mb-5" data-astro-cid-57z6rh23><div class="d-flex align-items-center justify-content-between flex-wrap gap-3" data-astro-cid-57z6rh23><h5 class="mb-0 fw-bold text-dark" style="font-size: 1rem;" data-astro-cid-57z6rh23>Bagikan artikel ini:</h5><div class="d-flex gap-2" data-astro-cid-57z6rh23><a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`, "href")} target="_blank" class="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center share-btn" style="width: 40px; height: 40px;" aria-label="Share on Facebook" data-astro-cid-57z6rh23><i class="bi bi-facebook" data-astro-cid-57z6rh23></i></a><a${addAttribute(`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(article.title)}`, "href")} target="_blank" class="btn btn-outline-info rounded-circle d-flex align-items-center justify-content-center share-btn" style="width: 40px; height: 40px;" aria-label="Share on Twitter" data-astro-cid-57z6rh23><i class="bi bi-twitter-x" data-astro-cid-57z6rh23></i></a><a${addAttribute(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " - " + canonicalUrl)}`, "href")} target="_blank" class="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center share-btn" style="width: 40px; height: 40px;" aria-label="Share on WhatsApp" data-astro-cid-57z6rh23><i class="bi bi-whatsapp" data-astro-cid-57z6rh23></i></a><button onclick="navigator.clipboard.writeText(window.location.href); alert('Link disalin ke clipboard!');" class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center share-btn" style="width: 40px; height: 40px;" aria-label="Copy Link" data-astro-cid-57z6rh23><i class="bi bi-link-45deg" data-astro-cid-57z6rh23></i></button></div></div></div></div><!-- ================= KOLOM SIDEBAR (KANAN) ================= --><div class="col-lg-4" data-astro-cid-57z6rh23><aside class="sidebar-sticky" style="position: sticky; top: 30px;" data-astro-cid-57z6rh23><!-- Cari Artikel --><div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" data-astro-cid-57z6rh23><h4 class="h6 fw-bold text-dark mb-3" data-astro-cid-57z6rh23>Cari Artikel</h4><form action="/articles" method="GET" class="position-relative" data-astro-cid-57z6rh23><input type="text" name="search" class="form-control rounded-pill px-3 py-2" placeholder="Masukkan kata kunci..." style="padding-right: 40px; font-size: 0.9rem;" data-astro-cid-57z6rh23><button type="submit" class="btn position-absolute top-50 end-0 translate-middle-y border-0 text-muted" style="right: 10px;" data-astro-cid-57z6rh23><i class="bi bi-search" data-astro-cid-57z6rh23></i></button></form></div><!-- Rekomendasi Sidebar --><div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" data-astro-cid-57z6rh23><h4 class="h6 fw-bold text-dark mb-3 pb-2 border-bottom" data-astro-cid-57z6rh23>Rekomendasi Artikel</h4>${sidebarArticles.length === 0 ? renderTemplate`<p class="text-muted small mb-0" data-astro-cid-57z6rh23>Tidak ada rekomendasi artikel saat ini.</p>` : renderTemplate`<div class="d-flex flex-column gap-3" data-astro-cid-57z6rh23>${sidebarArticles.map((side) => renderTemplate`<a${addAttribute(`/articles/${side.slug}`, "href")} class="text-decoration-none d-flex align-items-center gap-3 side-rec-item" data-astro-cid-57z6rh23><div class="rounded-3 overflow-hidden bg-light" style="width: 70px; height: 70px; flex-shrink: 0;" data-astro-cid-57z6rh23><img${addAttribute(side.cover_image || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(side.title, "alt")} class="w-100 h-100 object-fit-cover side-rec-thumb" data-astro-cid-57z6rh23></div><div class="flex-grow-1 min-w-0" data-astro-cid-57z6rh23><span class="text-primary text-uppercase fw-semibold" style="font-size: 0.65rem; letter-spacing: 0.5px;" data-astro-cid-57z6rh23>${categoryLabels[side.category] || side.category}</span><h5 class="fw-bold text-dark mb-1 text-truncate-2" style="font-size: 0.82rem; line-height: 1.3;" data-astro-cid-57z6rh23>${side.title}</h5><span class="text-muted" style="font-size: 0.7rem;" data-astro-cid-57z6rh23>${formatDate(side.published_at)}</span></div></a>`)}</div>`}</div><!-- Promo/Banner Box --><div class="card border-0 text-white rounded-4 overflow-hidden p-4 text-center position-relative shadow-sm" style="background: linear-gradient(135deg, var(--bs-primary) 0%, #0d6efd 100%); min-height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;" data-astro-cid-57z6rh23><div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-10" style="z-index: 1;" data-astro-cid-57z6rh23></div><div style="z-index: 2;" data-astro-cid-57z6rh23><i class="bi bi-gift-fill mb-2" style="font-size: 2.2rem; color: #ffc107;" data-astro-cid-57z6rh23></i><h4 class="fw-bold h5 mb-2" data-astro-cid-57z6rh23>Penawaran Menarik!</h4><p class="small text-light mb-3" style="opacity: 0.9;" data-astro-cid-57z6rh23>Gunakan voucher promo di toko kami sekarang dan dapatkan diskon menarik.</p><a href="/category" class="btn btn-warning btn-sm rounded-pill px-4 fw-bold" data-astro-cid-57z6rh23>Belanja Sekarang</a></div></div></aside></div></div><!-- Related Articles Section (Bottom) -->${relatedArticles.length > 0 && renderTemplate`<div class="row justify-content-start mt-5 pt-5 border-top" data-astro-cid-57z6rh23><div class="col-lg-8" data-astro-cid-57z6rh23><h3 class="fw-bold mb-4 text-dark text-center text-lg-start" data-astro-cid-57z6rh23>Artikel Sejenis</h3><div class="row g-4" data-astro-cid-57z6rh23>${relatedArticles.map((rel) => renderTemplate`<div class="col-md-6 col-lg-4" data-astro-cid-57z6rh23><a${addAttribute(`/articles/${rel.slug}`, "href")} class="text-decoration-none h-100 d-block" data-astro-cid-57z6rh23><div class="card border-0 shadow-sm h-100 rounded-3 overflow-hidden rel-card" data-astro-cid-57z6rh23><div style="height: 140px; overflow: hidden;" data-astro-cid-57z6rh23><img${addAttribute(rel.cover_image || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(rel.title, "alt")} class="img-fluid w-100 h-100 object-fit-cover rel-thumb" data-astro-cid-57z6rh23></div><div class="card-body p-3" data-astro-cid-57z6rh23><h4 class="h6 fw-bold text-dark mb-1 text-truncate-2" style="font-size: 0.85rem; line-height: 1.4; height: 2.8em;" data-astro-cid-57z6rh23>${rel.title}</h4><div class="text-muted small" style="font-size: 0.72rem;" data-astro-cid-57z6rh23>${formatDate(rel.published_at)}</div></div></div></a></div>`)}</div></div></div>`}</article></main>`,
		"head": ($$result) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result) => renderTemplate`<link rel="canonical"${addAttribute(canonicalUrl, "href")}><meta property="og:type" content="article"><meta property="og:title"${addAttribute(metaTitle, "content")}><meta property="og:description"${addAttribute(metaDesc, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(shareImage, "content")}><meta property="article:published_time"${addAttribute(article.published_at || article.created_at, "content")}>${article.updated_at && renderTemplate`<meta property="article:modified_time"${addAttribute(article.updated_at, "content")}>`}<meta property="article:section"${addAttribute(article.category, "content")}>${article.tags && article.tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(metaTitle, "content")}><meta name="twitter:description"${addAttribute(metaDesc, "content")}><meta name="twitter:image"${addAttribute(shareImage, "content")}>${jsonLdSchema && renderTemplate`<script type="application/ld+json">${unescapeHTML(jsonLdSchema)}<\/script>`}` })}`
	})}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/articles/[slug].astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/articles/[slug].astro";
var $$url = "/articles/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/articles/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
