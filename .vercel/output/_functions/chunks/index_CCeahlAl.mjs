import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let products = [];
	let categories = [];
	let heroSettings = {
		badge_label: "Curated Selection",
		headline: "Discover What Defines Modern Living",
		subtext: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel.",
		btn_primary_text: "Browse Items",
		btn_primary_link: "/category",
		btn_ghost_text: "See All Categories",
		btn_ghost_link: "/category",
		tile1: {
			badge: "Best Seller",
			name: "Precision Audio Hub",
			price: 219,
			original_price: 299,
			image: "/shop/assets/img/product/product-6.webp"
		},
		tile2: {
			badge: "Trending Now",
			name: "Smart Wearable Pro",
			price: 159,
			original_price: 229,
			image: "/shop/assets/img/product/product-3.webp"
		},
		tile3: {
			badge: "Just Launched",
			name: "Essential Daily Companion",
			desc: "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus curabitur.",
			price: 99,
			original_price: 149,
			image: "/shop/assets/img/product/product-10.webp"
		}
	};
	let promoSettings = {
		image: "/shop/assets/img/product/product-showcase-2.webp",
		tag: "New Season",
		title: "Winter Lookbook",
		description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae ultricies eget.",
		bullets: [
			"Curated seasonal selections",
			"Exclusive online availability",
			"Complimentary shipping included"
		],
		btn_text: "Explore Collection",
		btn_link: "/category"
	};
	let bestSellersSettings = {
		title: "Best Sellers",
		subtitle: "Featured items hand-picked for their premium quality and popularity."
	};
	let trustIndicatorsSettings = {
		item1: {
			icon: "bi-truck",
			text: "Free Shipping"
		},
		item2: {
			icon: "bi-shield-check",
			text: "Verified Quality"
		},
		item3: {
			icon: "bi-arrow-return-left",
			text: "Easy Returns"
		},
		item4: {
			icon: "bi-chat-dots",
			text: "24/7 Support"
		}
	};
	try {
		const { data: dbProducts, error: pError } = await supabase.from("products").select(`
      *,
      categories (
        name
      )
    `).limit(8);
		if (dbProducts && dbProducts.length > 0) products = dbProducts.map((p) => ({
			id: p.id,
			name: p.name,
			price: Number(p.price),
			sale_price: p.sale_price ? Number(p.sale_price) : null,
			image: p.images?.[0] || "/shop/assets/img/product/product-default.webp",
			category: p.categories?.name || "General",
			is_featured: p.is_featured,
			rating: 4.5,
			reviews_count: 24,
			colors: p.colors || [],
			sizes: p.sizes || []
		}));
		const { data: dbCategories, error: cError } = await supabase.from("categories").select("*").limit(4);
		if (dbCategories && dbCategories.length > 0) categories = dbCategories.map((c) => ({
			id: c.id,
			name: c.name,
			slug: c.slug,
			image: c.image_url || "/shop/assets/img/product/product-default.webp",
			count: 0
		}));
		const { data: dbSettings } = await supabase.from("site_settings").select("*").eq("key", "homepage").maybeSingle();
		if (dbSettings && dbSettings.value) {
			if (dbSettings.value.hero) heroSettings = {
				...heroSettings,
				...dbSettings.value.hero
			};
			if (dbSettings.value.promo) promoSettings = {
				...promoSettings,
				...dbSettings.value.promo
			};
			if (dbSettings.value.best_sellers) bestSellersSettings = {
				...bestSellersSettings,
				...dbSettings.value.best_sellers
			};
			if (dbSettings.value.trust_indicators) trustIndicatorsSettings = {
				...trustIndicatorsSettings,
				...dbSettings.value.trust_indicators
			};
		}
	} catch (e) {
		console.error("Failed to fetch data from Supabase:", e);
	}
	if (products.length === 0) products = [
		{
			id: "mock-1",
			name: "Ergonomic Desk Lamp",
			price: 64,
			sale_price: null,
			image: "/shop/assets/img/product/product-5.webp",
			category: "Premium Collection",
			rating: 4.2,
			reviews_count: 24
		},
		{
			id: "mock-2",
			name: "Ceramic Aroma Diffuser",
			price: 165,
			sale_price: 220,
			image: "/shop/assets/img/product/product-8.webp",
			category: "Best Seller",
			rating: 4.7,
			reviews_count: 58
		},
		{
			id: "mock-3",
			name: "Wireless Earbuds",
			price: 89,
			sale_price: null,
			image: "/shop/assets/img/product/product-11.webp",
			category: "New Arrival",
			rating: 3.8,
			reviews_count: 12
		},
		{
			id: "mock-4",
			name: "Minimalist Wall Clock",
			price: 199,
			sale_price: null,
			image: "/shop/assets/img/product/product-2.webp",
			category: "Editor's Pick",
			rating: 4.9,
			reviews_count: 71
		},
		{
			id: "mock-5",
			name: "Urban Tech Backpack",
			price: 89,
			sale_price: 120,
			image: "/shop/assets/img/product/product-1.webp",
			category: "Accessories",
			rating: 4.5,
			reviews_count: 31
		},
		{
			id: "mock-6",
			name: "Precision Audio Hub",
			price: 219,
			sale_price: 299,
			image: "/shop/assets/img/product/product-6.webp",
			category: "Electronics",
			rating: 4.6,
			reviews_count: 104
		},
		{
			id: "mock-7",
			name: "Woven Tote Handbag",
			price: 89,
			sale_price: null,
			image: "/shop/assets/img/product/product-5.webp",
			category: "Accessories",
			rating: 4.3,
			reviews_count: 18
		},
		{
			id: "mock-8",
			name: "Slim Fit Denim Jacket",
			price: 145,
			sale_price: null,
			image: "/shop/assets/img/product/product-8.webp",
			category: "Clothing",
			rating: 4.8,
			reviews_count: 42
		}
	];
	if (categories.length === 0) categories = [
		{
			id: "cat-1",
			name: "Modern Menswear",
			slug: "menswear",
			count: 245,
			image: "/shop/assets/img/product/product-m-8.webp"
		},
		{
			id: "cat-2",
			name: "Everyday Essentials",
			slug: "essentials",
			count: 189,
			image: "/shop/assets/img/product/product-f-12.webp"
		},
		{
			id: "cat-3",
			name: "Beauty Rituals",
			slug: "beauty",
			count: 112,
			image: "/shop/assets/img/product/product-f-3.webp"
		},
		{
			id: "cat-4",
			name: "Travel Gear",
			slug: "travel",
			count: 327,
			image: "/shop/assets/img/product/product-m-11.webp"
		}
	];
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, { "title": "ShopWise - Home" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main"><!-- Hero Section --><section id="hero" class="hero section light-background"><div class="container"><div class="row align-items-center g-5"><div class="col-lg-5"><div class="intro-content"><span class="badge-label">${heroSettings.badge_label}</span><h1 class="headline">${heroSettings.headline}</h1><p class="subtext">${heroSettings.subtext}</p><div class="action-group"><a${addAttribute(heroSettings.btn_primary_link, "href")} class="btn-primary-action">${heroSettings.btn_primary_text}</a><a${addAttribute(heroSettings.btn_ghost_link, "href")} class="btn-ghost-action"><i class="bi bi-arrow-right me-2"></i>${heroSettings.btn_ghost_text}</a></div><div class="trust-indicators"><div class="indicator"><i${addAttribute(`bi ${trustIndicatorsSettings.item1.icon}`, "class")}></i><span>${trustIndicatorsSettings.item1.text}</span></div><div class="indicator"><i${addAttribute(`bi ${trustIndicatorsSettings.item2.icon}`, "class")}></i><span>${trustIndicatorsSettings.item2.text}</span></div><div class="indicator"><i${addAttribute(`bi ${trustIndicatorsSettings.item3.icon}`, "class")}></i><span>${trustIndicatorsSettings.item3.text}</span></div><div class="indicator"><i${addAttribute(`bi ${trustIndicatorsSettings.item4.icon}`, "class")}></i><span>${trustIndicatorsSettings.item4.text}</span></div></div></div></div><div class="col-lg-7"><div class="row g-3"><div class="col-md-6"><div class="product-tile"><div class="tile-image"><img${addAttribute(heroSettings.tile1.image, "src")} class="img-fluid" alt="Product">${heroSettings.tile1.badge && renderTemplate`<span class="tile-badge">${heroSettings.tile1.badge}</span>`}</div><div class="tile-info"><h4>${heroSettings.tile1.name}</h4><div class="tile-price"><span class="current">$${heroSettings.tile1.price}</span>${heroSettings.tile1.original_price && renderTemplate`<span class="original">$${heroSettings.tile1.original_price}</span>`}</div></div></div></div><div class="col-md-6"><div class="product-tile featured"><div class="tile-image"><img${addAttribute(heroSettings.tile2.image, "src")} class="img-fluid" alt="Product">${heroSettings.tile2.badge && renderTemplate`<span class="tile-badge accent">${heroSettings.tile2.badge}</span>`}</div><div class="tile-info"><h4>${heroSettings.tile2.name}</h4><div class="tile-price"><span class="current">$${heroSettings.tile2.price}</span>${heroSettings.tile2.original_price && renderTemplate`<span class="original">$${heroSettings.tile2.original_price}</span>`}</div></div></div></div><div class="col-12"><div class="product-tile horizontal"><div class="row g-0 align-items-center"><div class="col-sm-4"><div class="tile-image"><img${addAttribute(heroSettings.tile3.image, "src")} class="img-fluid" alt="Product">${heroSettings.tile3.badge && renderTemplate`<span class="tile-badge">${heroSettings.tile3.badge}</span>`}</div></div><div class="col-sm-8"><div class="tile-info"><h4>${heroSettings.tile3.name}</h4><p class="tile-desc">${heroSettings.tile3.desc}</p><div class="tile-price"><span class="current">$${heroSettings.tile3.price}</span>${heroSettings.tile3.original_price && renderTemplate`<span class="original">$${heroSettings.tile3.original_price}</span>`}</div></div></div></div></div></div></div></div></div><div class="slider-section mt-5"><div class="product-carousel swiper init-swiper"><script type="application/json" class="swiper-config">
              {
                "loop": true,
                "speed": 500,
                "autoplay": {
                  "delay": 4000,
                  "disableOnInteraction": true
                },
                "slidesPerView": 1,
                "spaceBetween": 16,
                "breakpoints": {
                  "576": {
                    "slidesPerView": 2,
                    "spaceBetween": 16
                  },
                  "768": {
                    "slidesPerView": 3,
                    "spaceBetween": 16
                  },
                  "1200": {
                    "slidesPerView": 4,
                    "spaceBetween": 24
                  }
                },
                "pagination": {
                  "el": ".swiper-pagination",
                  "type": "bullets",
                  "clickable": true
                },
                "navigation": {
                  "nextEl": ".swiper-button-next",
                  "prevEl": ".swiper-button-prev"
                }
              }
            <\/script><div class="swiper-wrapper">${products.slice(0, 6).map((prod) => renderTemplate`<div class="swiper-slide"><div class="slide-card"><div class="slide-card-image"><img${addAttribute(prod.image, "src")} class="img-fluid" loading="lazy"${addAttribute(prod.name, "alt")}>${prod.sale_price && renderTemplate`<span class="slide-badge">Sale</span>`}</div><div class="slide-card-body"><h4>${prod.name}</h4><p>${prod.category}</p><div class="slide-card-price"><span class="price-now">$${prod.price.toFixed(2)}</span>${prod.sale_price && renderTemplate`<span class="price-was">$${prod.sale_price.toFixed(2)}</span>`}</div></div></div></div>`)}</div><div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div></div></div></section><!-- Promo Cards Section --><section id="promo-cards" class="promo-cards section"><div class="container"><div class="row g-4 align-items-stretch mb-5"><div class="col-lg-7"><div class="highlight-card h-100"><img${addAttribute(promoSettings.image, "src")}${addAttribute(promoSettings.title, "alt")} class="img-fluid w-100 h-100 object-fit-cover rounded-3"></div></div><div class="col-lg-5 d-flex"><div class="highlight-info"><span class="tag-label">${promoSettings.tag}</span><h2>${promoSettings.title}</h2><p>${promoSettings.description}</p><ul class="feature-list">${promoSettings.bullets.map((bullet) => renderTemplate`<li><i class="bi bi-check-circle"></i> ${bullet}</li>`)}</ul><a${addAttribute(promoSettings.btn_link, "href")} class="btn-primary-action">${promoSettings.btn_text} <i class="bi bi-arrow-right"></i></a></div></div></div><div class="row g-3">${categories.map((cat) => renderTemplate`<div class="col-lg-3 col-md-6"><div class="category-card"><div class="card-img-wrapper"><img${addAttribute(cat.image, "src")}${addAttribute(cat.name, "alt")} loading="lazy" class="img-fluid"></div><div class="card-body"><h4>${cat.name}</h4><span class="count-label">${cat.count > 0 ? `${cat.count} products` : "Explore Category"}</span></div><div class="card-action"><a${addAttribute(`/category?slug=${cat.slug}`, "href")}>View All <i class="bi bi-arrow-right"></i></a></div></div></div>`)}</div></div></section><!-- Best Sellers Section --><section id="best-sellers" class="best-sellers section"><div class="container section-title"><h2>${bestSellersSettings.title}</h2><p>${bestSellersSettings.subtitle}</p></div><div class="container"><div class="row g-4">${products.map((prod) => renderTemplate`<div class="col-lg-3 col-md-6"><div class="product-card"><div class="product-media"><img${addAttribute(prod.image, "src")}${addAttribute(prod.name, "alt")} class="img-fluid" loading="lazy">${prod.sale_price && renderTemplate`<div class="badge-label discount">${Math.round((1 - prod.price / prod.sale_price) * 100)}% Off</div>`}<div class="action-overlay"><button class="action-btn" aria-label="Add to wishlist"${addAttribute(`toggleWishlist({id: '${prod.id}', name: '${prod.name.replace(/'/g, "\\'")}', price: ${prod.price}, image: '${prod.image}'})`, "onclick")}><i class="bi bi-heart"></i></button><a${addAttribute(`/product/${prod.id}`, "href")} class="action-btn d-flex align-items-center justify-content-center" aria-label="Quick view"><i class="bi bi-eye"></i></a></div></div><div class="product-body"><div class="product-meta"><span class="category-tag">${prod.category}</span><div class="rating-group"><i class="bi bi-star-fill"></i><span>${prod.rating}</span><span class="count">(${prod.reviews_count})</span></div></div><h4 class="product-title"><a${addAttribute(`/product/${prod.id}`, "href")}>${prod.name}</a></h4><div class="product-footer"><div class="product-price">${prod.sale_price ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="original">$${prod.sale_price.toFixed(2)}</span><span class="current">$${prod.price.toFixed(2)}</span>` })}` : `$${prod.price.toFixed(2)}`}</div><button class="cart-btn border-0 bg-transparent" aria-label="Add to cart"${addAttribute(`handleQuickAdd(event, '${prod.id}', '${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.image}', ${prod.colors && prod.colors.length > 0 || prod.sizes && prod.sizes.length > 0})`, "onclick")}><i class="bi bi-bag-plus"></i></button></div></div></div></div>`)}</div></div></section></main>` })}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
