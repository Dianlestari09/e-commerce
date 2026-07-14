import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createAstro, y as defineScriptVars } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/search.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Search,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Search = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Search;
	const url = new URL(Astro.request.url);
	const searchQuery = url.searchParams.get("q") || "";
	const categoryFilter = url.searchParams.get("category") || "";
	const minPriceParam = url.searchParams.get("min_price") || "";
	const maxPriceParam = url.searchParams.get("max_price") || "";
	const sortBy = url.searchParams.get("sort") || "featured";
	let products = [];
	let categories = [];
	let errorMsg = "";
	try {
		const { data: dbProducts, error: pError } = await supabase.from("products").select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `);
		if (pError) throw pError;
		if (dbProducts) products = dbProducts.map((p) => ({
			id: p.id,
			name: p.name,
			price: Number(p.price),
			sale_price: p.sale_price ? Number(p.sale_price) : null,
			image: p.images?.[0] || "/shop/assets/img/product/product-default.webp",
			category: p.categories?.name || "General",
			category_slug: p.categories?.slug || "",
			is_featured: p.is_featured,
			created_at: p.created_at,
			rating: 4.5,
			reviews_count: 25,
			colors: p.colors || [],
			sizes: p.sizes || []
		}));
		const { data: dbCategories, error: cError } = await supabase.from("categories").select("*");
		if (cError) throw cError;
		if (dbCategories) categories = dbCategories;
	} catch (e) {
		console.error("Search fetch failed:", e);
		errorMsg = e.message;
	}
	let filteredProducts = [...products];
	if (searchQuery) {
		const q = searchQuery.toLowerCase().trim();
		filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
	}
	if (categoryFilter) filteredProducts = filteredProducts.filter((p) => p.category_slug === categoryFilter);
	const minPrice = minPriceParam ? Number(minPriceParam) : 0;
	const maxPrice = maxPriceParam ? Number(maxPriceParam) : Infinity;
	filteredProducts = filteredProducts.filter((p) => {
		const price = p.price;
		return price >= minPrice && price <= maxPrice;
	});
	if (sortBy === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
	else if (sortBy === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
	else if (sortBy === "newest") filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	else filteredProducts.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
	products.length > 0 && Math.max(...products.map((p) => p.price));
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, {
		"title": "Search Products - ShopWise",
		"data-astro-cid-wp2l4cmv": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main" data-astro-cid-wp2l4cmv><!-- Page Header --><div class="page-title light-background mb-4" data-astro-cid-wp2l4cmv><div class="container d-lg-flex justify-content-between align-items-center" data-astro-cid-wp2l4cmv><h1 class="mb-2 mb-lg-0" data-astro-cid-wp2l4cmv>Search Results</h1><nav class="breadcrumbs" data-astro-cid-wp2l4cmv><ol data-astro-cid-wp2l4cmv><li data-astro-cid-wp2l4cmv><a href="/" data-astro-cid-wp2l4cmv>Home</a></li><li class="current" data-astro-cid-wp2l4cmv>Search</li></ol></nav></div></div><!-- Product Grid & Filters --><section class="py-4 bg-white" data-astro-cid-wp2l4cmv><div class="container" data-astro-cid-wp2l4cmv><div class="row g-4" data-astro-cid-wp2l4cmv><!-- Sidebar Filters --><div class="col-lg-3 col-md-4" data-astro-cid-wp2l4cmv><div class="card border-0 shadow-sm p-4 bg-light rounded-3 mb-4" data-astro-cid-wp2l4cmv><h5 class="fw-bold mb-3 border-bottom pb-2" data-astro-cid-wp2l4cmv>Filter Products</h5><!-- Keyword Search Form --><form action="/search" method="GET" class="mb-4" data-astro-cid-wp2l4cmv><label class="form-label small fw-semibold text-muted" data-astro-cid-wp2l4cmv>KEYWORD</label><div class="input-group" data-astro-cid-wp2l4cmv><input type="text" class="form-control bg-white" name="q" placeholder="Search..."${addAttribute(searchQuery, "value")} data-astro-cid-wp2l4cmv>${categoryFilter && renderTemplate`<input type="hidden" name="category"${addAttribute(categoryFilter, "value")} data-astro-cid-wp2l4cmv>`}${minPriceParam && renderTemplate`<input type="hidden" name="min_price"${addAttribute(minPriceParam, "value")} data-astro-cid-wp2l4cmv>`}${maxPriceParam && renderTemplate`<input type="hidden" name="max_price"${addAttribute(maxPriceParam, "value")} data-astro-cid-wp2l4cmv>`}${sortBy !== "featured" && renderTemplate`<input type="hidden" name="sort"${addAttribute(sortBy, "value")} data-astro-cid-wp2l4cmv>`}<button class="btn btn-primary" type="submit" data-astro-cid-wp2l4cmv><i class="bi bi-search" data-astro-cid-wp2l4cmv></i></button></div></form><!-- Categories Filter List --><div class="mb-4" data-astro-cid-wp2l4cmv><label class="form-label small fw-semibold text-muted" data-astro-cid-wp2l4cmv>CATEGORIES</label><ul class="list-unstyled mb-0" data-astro-cid-wp2l4cmv><li class="mb-2" data-astro-cid-wp2l4cmv><a${addAttribute(`/search?q=${searchQuery}&min_price=${minPriceParam}&max_price=${maxPriceParam}&sort=${sortBy}`, "href")}${addAttribute(`text-decoration-none small ${!categoryFilter ? "fw-bold text-primary" : "text-dark"}`, "class")} data-astro-cid-wp2l4cmv>All Categories (${products.length})</a></li>${categories.map((cat) => {
		const count = products.filter((p) => p.category_slug === cat.slug).length;
		return renderTemplate`<li class="mb-2" data-astro-cid-wp2l4cmv><a${addAttribute(`/search?category=${cat.slug}&q=${searchQuery}&min_price=${minPriceParam}&max_price=${maxPriceParam}&sort=${sortBy}`, "href")}${addAttribute(`text-decoration-none small ${categoryFilter === cat.slug ? "fw-bold text-primary" : "text-dark"}`, "class")} data-astro-cid-wp2l4cmv>${cat.name} (${count})</a></li>`;
	})}</ul></div><!-- Price Filter Form --><div class="mb-4" data-astro-cid-wp2l4cmv><label class="form-label small fw-semibold text-muted" data-astro-cid-wp2l4cmv>PRICE RANGE</label><form action="/search" method="GET" class="row g-2 align-items-center" data-astro-cid-wp2l4cmv>${searchQuery && renderTemplate`<input type="hidden" name="q"${addAttribute(searchQuery, "value")} data-astro-cid-wp2l4cmv>`}${categoryFilter && renderTemplate`<input type="hidden" name="category"${addAttribute(categoryFilter, "value")} data-astro-cid-wp2l4cmv>`}${sortBy !== "featured" && renderTemplate`<input type="hidden" name="sort"${addAttribute(sortBy, "value")} data-astro-cid-wp2l4cmv>`}<div class="col-6" data-astro-cid-wp2l4cmv><div class="input-group input-group-sm" data-astro-cid-wp2l4cmv><span class="input-group-text" data-astro-cid-wp2l4cmv>$</span><input type="number" class="form-control" name="min_price" placeholder="Min"${addAttribute(minPriceParam, "value")} min="0" data-astro-cid-wp2l4cmv></div></div><div class="col-6" data-astro-cid-wp2l4cmv><div class="input-group input-group-sm" data-astro-cid-wp2l4cmv><span class="input-group-text" data-astro-cid-wp2l4cmv>$</span><input type="number" class="form-control" name="max_price" placeholder="Max"${addAttribute(maxPriceParam, "value")} min="0" data-astro-cid-wp2l4cmv></div></div><div class="col-12 mt-2" data-astro-cid-wp2l4cmv><button class="btn btn-outline-primary btn-sm w-100 fw-bold" type="submit" data-astro-cid-wp2l4cmv>Apply Price</button></div></form></div><!-- Clear Filters --><a href="/search" class="btn btn-light btn-sm w-100 fw-bold text-muted border-0" data-astro-cid-wp2l4cmv><i class="bi bi-x-circle me-1" data-astro-cid-wp2l4cmv></i> Reset All Filters</a></div></div><!-- Products Content Area --><div class="col-lg-9 col-md-8" data-astro-cid-wp2l4cmv><!-- Grid Header Actions --><div class="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded-3 border-0" data-astro-cid-wp2l4cmv><span class="text-muted small" data-astro-cid-wp2l4cmv>Showing <strong class="text-dark" data-astro-cid-wp2l4cmv>${filteredProducts.length}</strong> products${searchQuery && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` for "<strong data-astro-cid-wp2l4cmv>${searchQuery}</strong>"` })}`}</span><div class="d-flex align-items-center gap-2" data-astro-cid-wp2l4cmv><span class="text-muted small d-none d-sm-inline" data-astro-cid-wp2l4cmv>Sort by:</span><select class="form-select form-select-sm" id="sort-select" style="width: auto; min-width: 160px;" data-astro-cid-wp2l4cmv><option value="featured"${addAttribute(sortBy === "featured", "selected")} data-astro-cid-wp2l4cmv>Featured</option><option value="price-asc"${addAttribute(sortBy === "price-asc", "selected")} data-astro-cid-wp2l4cmv>Price: Low to High</option><option value="price-desc"${addAttribute(sortBy === "price-desc", "selected")} data-astro-cid-wp2l4cmv>Price: High to Low</option><option value="newest"${addAttribute(sortBy === "newest", "selected")} data-astro-cid-wp2l4cmv>Newest Arrivals</option></select></div></div><!-- Error Banner -->${errorMsg && renderTemplate`<div class="alert alert-danger" role="alert" data-astro-cid-wp2l4cmv>Error loading search: ${errorMsg}</div>`}<!-- Products Grid -->${filteredProducts.length === 0 ? renderTemplate`<div class="text-center py-5" data-astro-cid-wp2l4cmv><i class="bi bi-search text-muted" style="font-size: 3rem;" data-astro-cid-wp2l4cmv></i><h4 class="mt-3 fw-bold" data-astro-cid-wp2l4cmv>No products found</h4><p class="text-muted" data-astro-cid-wp2l4cmv>We couldn't find matches. Try adjusting your query keywords or price filters.</p><a href="/search" class="btn btn-primary btn-sm mt-2 px-4 py-2" data-astro-cid-wp2l4cmv>Reset Filters</a></div>` : renderTemplate`<div class="row g-4" data-astro-cid-wp2l4cmv>${filteredProducts.map((prod) => renderTemplate`<div class="col-lg-4 col-sm-6" data-astro-cid-wp2l4cmv><div class="product-card h-100 border rounded p-2 bg-white" data-astro-cid-wp2l4cmv><div class="product-media position-relative rounded overflow-hidden" data-astro-cid-wp2l4cmv><img${addAttribute(prod.image, "src")}${addAttribute(prod.name, "alt")} class="img-fluid w-100 object-fit-cover" style="height: 250px;" loading="lazy" data-astro-cid-wp2l4cmv>${prod.sale_price && renderTemplate`<div class="badge-label discount position-absolute top-0 start-0 m-2" data-astro-cid-wp2l4cmv>-${Math.round((1 - prod.price / prod.sale_price) * 100)}%</div>`}<div class="action-overlay position-absolute bottom-0 end-0 m-2 d-flex flex-column gap-2 opacity-0" data-astro-cid-wp2l4cmv><button class="action-btn btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" aria-label="Add to wishlist"${addAttribute(`toggleWishlist({id: '${prod.id}', name: '${prod.name.replace(/'/g, "\\'")}', price: ${prod.price}, image: '${prod.image}'})`, "onclick")} style="width: 36px; height: 36px;" data-astro-cid-wp2l4cmv><i class="bi bi-heart" data-astro-cid-wp2l4cmv></i></button><a${addAttribute(`/product/${prod.id}`, "href")} class="action-btn btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" aria-label="Quick view" style="width: 36px; height: 36px;" data-astro-cid-wp2l4cmv><i class="bi bi-eye" data-astro-cid-wp2l4cmv></i></a></div></div><div class="product-body pt-3" data-astro-cid-wp2l4cmv><div class="product-meta d-flex justify-content-between mb-2" data-astro-cid-wp2l4cmv><span class="category-tag text-uppercase text-muted fw-bold" style="font-size: 0.75rem;" data-astro-cid-wp2l4cmv>${prod.category}</span><div class="rating-group small text-warning" data-astro-cid-wp2l4cmv><i class="bi bi-star-fill" data-astro-cid-wp2l4cmv></i><span class="text-dark ms-1" data-astro-cid-wp2l4cmv>${prod.rating}</span></div></div><h5 class="product-title fw-semibold mb-2" style="font-size: 0.95rem;" data-astro-cid-wp2l4cmv><a${addAttribute(`/product/${prod.id}`, "href")} class="text-decoration-none text-dark" data-astro-cid-wp2l4cmv>${prod.name}</a></h5><div class="product-footer d-flex align-items-center justify-content-between pt-2 border-top" data-astro-cid-wp2l4cmv><div class="product-price fw-bold" data-astro-cid-wp2l4cmv>${prod.sale_price ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="original text-decoration-line-through text-muted me-2 small" data-astro-cid-wp2l4cmv>$${prod.sale_price.toFixed(2)}</span><span class="current text-primary" data-astro-cid-wp2l4cmv>$${prod.price.toFixed(2)}</span>` })}` : `$${prod.price.toFixed(2)}`}</div><button class="btn btn-outline-primary btn-sm rounded-3 py-1 px-2.5" aria-label="Add to cart"${addAttribute(`handleQuickAdd(event, '${prod.id}', '${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.image}', ${prod.colors && prod.colors.length > 0 || prod.sizes && prod.sizes.length > 0})`, "onclick")} data-astro-cid-wp2l4cmv><i class="bi bi-bag-plus" data-astro-cid-wp2l4cmv></i> Add</button></div></div></div></div>`)}</div>`}</div></div></div></section></main><script>(function(){${defineScriptVars({
		searchQuery,
		categoryFilter,
		minPriceParam,
		maxPriceParam,
		sortBy
	})}
    // Setup Sort Listener
    const sortSelect = document.getElementById('sort-select');
    sortSelect?.addEventListener('change', (e) => {
      const selected = e.target.value;
      const url = new URL(window.location.href);
      url.searchParams.set('sort', selected);
      window.location.href = url.toString();
    });
  })();<\/script>` })}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/search.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/search.astro";
var $$url = "/search";
//#endregion
//#region \0virtual:astro:page:src/pages/search@_@astro
var page = () => search_exports;
//#endregion
export { page };
