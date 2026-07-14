import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createAstro, y as defineScriptVars } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/category.astro
var category_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Category,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Category = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Category;
	const url = new URL(Astro.request.url);
	const selectedSlug = url.searchParams.get("slug");
	const searchQuery = url.searchParams.get("q");
	const sortBy = url.searchParams.get("sort") || "featured";
	let products = [];
	let categories = [];
	let activeCategoryName = "All Categories";
	try {
		const { data: dbCategories } = await supabase.from("categories").select("*");
		if (dbCategories) {
			categories = dbCategories;
			if (selectedSlug) {
				const activeCat = dbCategories.find((c) => c.slug === selectedSlug);
				if (activeCat) activeCategoryName = activeCat.name;
			}
		}
		let query = supabase.from("products").select(`
      *,
      categories (
        name,
        slug
      )
    `);
		if (selectedSlug) {
			const activeCat = categories.find((c) => c.slug === selectedSlug);
			if (activeCat) query = query.eq("category_id", activeCat.id);
		}
		const { data: dbProducts } = await query;
		if (dbProducts) {
			products = dbProducts.map((p) => ({
				id: p.id,
				name: p.name,
				price: Number(p.price),
				sale_price: p.sale_price ? Number(p.sale_price) : null,
				image: p.images?.[0] || "/shop/assets/img/product/product-default.webp",
				category: p.categories?.name || "General",
				categorySlug: p.categories?.slug || "",
				rating: 4.5,
				reviews_count: 24,
				is_featured: p.is_featured,
				created_at: p.created_at,
				colors: p.colors || [],
				sizes: p.sizes || []
			}));
			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				products = products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
			}
			if (sortBy === "price-low") products.sort((a, b) => a.price - b.price);
			else if (sortBy === "price-high") products.sort((a, b) => b.price - a.price);
			else if (sortBy === "newest") products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		}
	} catch (e) {
		console.error("Failed to load products:", e);
	}
	if (products.length === 0 && !selectedSlug && !searchQuery) products = [
		{
			id: "mock-1",
			name: "Ergonomic Desk Lamp",
			price: 64,
			sale_price: null,
			image: "/shop/assets/img/product/product-5.webp",
			category: "Premium Collection",
			rating: 4.2,
			reviews_count: 24,
			created_at: /* @__PURE__ */ new Date()
		},
		{
			id: "mock-2",
			name: "Ceramic Aroma Diffuser",
			price: 165,
			sale_price: 220,
			image: "/shop/assets/img/product/product-8.webp",
			category: "Best Seller",
			rating: 4.7,
			reviews_count: 58,
			created_at: /* @__PURE__ */ new Date()
		},
		{
			id: "mock-3",
			name: "Wireless Earbuds",
			price: 89,
			sale_price: null,
			image: "/shop/assets/img/product/product-11.webp",
			category: "New Arrival",
			rating: 3.8,
			reviews_count: 12,
			created_at: /* @__PURE__ */ new Date()
		},
		{
			id: "mock-4",
			name: "Minimalist Wall Clock",
			price: 199,
			sale_price: null,
			image: "/shop/assets/img/product/product-2.webp",
			category: "Editor's Pick",
			rating: 4.9,
			reviews_count: 71,
			created_at: /* @__PURE__ */ new Date()
		},
		{
			id: "mock-5",
			name: "Urban Tech Backpack",
			price: 89,
			sale_price: 120,
			image: "/shop/assets/img/product/product-1.webp",
			category: "Accessories",
			rating: 4.5,
			reviews_count: 31,
			created_at: /* @__PURE__ */ new Date()
		},
		{
			id: "mock-6",
			name: "Precision Audio Hub",
			price: 219,
			sale_price: 299,
			image: "/shop/assets/img/product/product-6.webp",
			category: "Electronics",
			rating: 4.6,
			reviews_count: 104,
			created_at: /* @__PURE__ */ new Date()
		}
	];
	if (categories.length === 0) categories = [
		{
			id: "cat-1",
			name: "Clothing",
			slug: "clothing"
		},
		{
			id: "cat-2",
			name: "Electronics",
			slug: "electronics"
		},
		{
			id: "cat-3",
			name: "Home & Kitchen",
			slug: "home-kitchen"
		},
		{
			id: "cat-4",
			name: "Beauty & Personal Care",
			slug: "beauty"
		}
	];
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, { "title": `Categories - ShopWise` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main"><!-- Page Title --><div class="page-title light-background"><div class="container d-lg-flex justify-content-between align-items-center"><h1 class="mb-2 mb-lg-0">Category: ${activeCategoryName}</h1><nav class="breadcrumbs"><ol><li><a href="/">Home</a></li><li class="current">Category</li></ol></nav></div></div><div class="container my-5"><div class="row"><!-- Sidebar Filters --><div class="col-lg-3 sidebar"><div class="widgets-container border rounded p-3 bg-light"><!-- Product Categories Widget --><div class="product-categories-widget widget-item mb-4"><h4 class="widget-title mb-3 fw-bold border-bottom pb-2">Categories</h4><ul class="category-tree list-unstyled mb-0"><li class="mb-2"><a href="/category"${addAttribute(`category-link text-decoration-none fw-medium ${!selectedSlug ? "text-primary" : "text-dark"}`, "class")}>All Categories</a></li>${categories.map((cat) => renderTemplate`<li class="mb-2"><a${addAttribute(`/category?slug=${cat.slug}${searchQuery ? `&q=${searchQuery}` : ""}`, "href")}${addAttribute(`category-link text-decoration-none ${selectedSlug === cat.slug ? "text-primary fw-bold" : "text-dark"}`, "class")}>${cat.name}</a></li>`)}</ul></div><!-- Sorting Widget --><div class="widget-item mb-4"><h4 class="widget-title mb-3 fw-bold border-bottom pb-2">Sort By</h4><select class="form-select" id="sortSelect"><option value="featured"${addAttribute(sortBy === "featured", "selected")}>Featured</option><option value="price-low"${addAttribute(sortBy === "price-low", "selected")}>Price: Low to High</option><option value="price-high"${addAttribute(sortBy === "price-high", "selected")}>Price: High to Low</option><option value="newest"${addAttribute(sortBy === "newest", "selected")}>Newest</option></select></div></div></div><!-- Product Listing Grid --><div class="col-lg-9"><!-- Controls Header (Professional & Minimalist) --><div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom"><div class="text-muted small">Showing <strong class="text-dark">${products.length}</strong> products${searchQuery && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` for "<strong>${searchQuery}</strong>"` })}`}</div>${searchQuery && renderTemplate`<a href="/category" class="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 text-decoration-none"><i class="bi bi-x-circle me-1"></i> Clear Search</a>`}</div><!-- Products Grid -->${products.length === 0 ? renderTemplate`<div class="text-center py-5"><i class="bi bi-search text-muted" style="font-size: 3rem;"></i><h3 class="mt-3">No products found</h3><p class="text-muted">Try adjusting your filters or search terms.</p><a href="/category" class="btn btn-primary mt-2">Clear Filters</a></div>` : renderTemplate`<div class="row g-4 best-sellers">${products.map((prod) => renderTemplate`<div class="col-md-6 col-lg-4"><div class="product-card"><div class="product-media"><img${addAttribute(prod.image, "src")}${addAttribute(prod.name, "alt")} class="img-fluid" loading="lazy">${prod.sale_price && renderTemplate`<div class="badge-label discount">-${Math.round((1 - prod.price / prod.sale_price) * 100)}%</div>`}<div class="action-overlay"><button class="action-btn" aria-label="Add to wishlist"${addAttribute(`toggleWishlist({id: '${prod.id}', name: '${prod.name.replace(/'/g, "\\'")}', price: ${prod.price}, image: '${prod.image}'})`, "onclick")}><i class="bi bi-heart"></i></button><a${addAttribute(`/product/${prod.id}`, "href")} class="action-btn d-flex align-items-center justify-content-center" aria-label="Quick view"><i class="bi bi-eye"></i></a></div></div><div class="product-body"><div class="product-meta"><span class="category-tag">${prod.category}</span><div class="rating-group"><i class="bi bi-star-fill text-warning"></i><span>${prod.rating}</span><span class="count">(${prod.reviews_count})</span></div></div><h4 class="product-title"><a${addAttribute(`/product/${prod.id}`, "href")}>${prod.name}</a></h4><div class="product-footer"><div class="product-price">${prod.sale_price ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="original">$${prod.sale_price.toFixed(2)}</span><span class="current">$${prod.price.toFixed(2)}</span>` })}` : `$${prod.price.toFixed(2)}`}</div><button class="btn btn-outline-primary btn-sm rounded-3 py-1 px-2.5" aria-label="Add to cart"${addAttribute(`handleQuickAdd(event, '${prod.id}', '${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.image}', ${prod.colors && prod.colors.length > 0 || prod.sizes && prod.sizes.length > 0})`, "onclick")}><i class="bi bi-bag-plus"></i> Add</button></div></div></div></div>`)}</div>`}</div></div></div></main><script>(function(){${defineScriptVars({
		selectedSlug,
		searchQuery
	})}
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        const val = this.value;
        let url = \`/category?sort=\${val}\`;
        if (selectedSlug) url += \`&slug=\${selectedSlug}\`;
        if (searchQuery) url += \`&q=\${searchQuery}\`;
        window.location.href = url;
      });
    }
  })();<\/script>` })}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/category.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/category.astro";
var $$url = "/category";
//#endregion
//#region \0virtual:astro:page:src/pages/category@_@astro
var page = () => category_exports;
//#endregion
export { page };
