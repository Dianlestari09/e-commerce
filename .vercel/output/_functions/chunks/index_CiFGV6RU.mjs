import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DKf7iUkJ.mjs";
//#region src/pages/admin/products/index.astro
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let products = [];
	try {
		const { data: dbProducts } = await supabase.from("products").select(`
      *,
      categories (
        name
      )
    `).order("created_at", { ascending: false });
		if (dbProducts) products = dbProducts;
		const { data: dbCategories } = await supabase.from("categories").select("*");
		if (dbCategories) {}
	} catch (e) {
		console.error("Failed to load products page data:", e);
	}
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Products - EasyAdmin" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="page-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"><div><h1 class="page-title h3 mb-1 font-weight-bold">Products Management</h1><p class="text-muted mb-0">Create, edit, view, or delete products catalog on your store.</p></div><div><a href="/admin/products/new" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i> Add New Product</a></div></div><div class="card border-0 shadow-sm p-4 bg-white">${products.length === 0 ? renderTemplate`<div class="text-center py-5"><i class="bi bi-box-seam text-muted" style="font-size: 3rem;"></i><h4 class="mt-3">No products in catalog</h4><p class="text-muted">Click the button above to add your first product.</p></div>` : renderTemplate`<div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-light"><tr><th>Image</th><th>Product Details</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th class="text-end">Actions</th></tr></thead><tbody>${products.map((p) => renderTemplate`<tr${addAttribute(`prod-row-${p.id}`, "id")}><td style="width: 70px;"><img${addAttribute(p.images?.[0] || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(p.name, "alt")} class="img-fluid rounded border object-fit-cover" style="width: 50px; height: 50px;"></td><td><div class="fw-bold">${p.name}</div><div class="text-muted small font-monospace" style="font-size: 0.75rem;">ID: ${p.id}</div></td><td class="font-monospace small">${p.sku || "N/A"}</td><td>${p.categories?.name || renderTemplate`<span class="text-muted">Uncategorized</span>`}</td><td><span class="fw-semibold text-primary">$${Number(p.price).toFixed(2)}</span>${p.sale_price && renderTemplate`<div class="text-decoration-line-through text-muted small" style="font-size: 0.8rem;">$${Number(p.sale_price).toFixed(2)}</div>`}</td><td><span${addAttribute(`badge ${p.stock <= 5 ? "bg-danger" : "bg-success"}`, "class")}>${p.stock} units</span></td><td class="text-end"><div class="d-inline-flex gap-2"><a${addAttribute(`/admin/products/edit?id=${p.id}`, "href")} class="btn btn-sm btn-outline-info" title="Edit"><i class="bi bi-pencil"></i></a><button class="btn btn-sm btn-outline-danger" title="Delete"${addAttribute(`deleteProduct('${p.id}')`, "onclick")}><i class="bi bi-trash"></i></button></div></td></tr>`)}</tbody></table></div>`}</div><script>
    async function deleteProduct(id) {
      if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
        return;
      }
      
      try {
        const res = await fetch(\`/api/admin/products?id=\${id}\`, {
          method: 'DELETE'
        });
        
        const result = await res.json();
        if (res.ok && result.success) {
          const row = document.getElementById(\`prod-row-\${id}\`);
          if (row) {
            row.remove();
          }
          // Check if table is empty now and reload page if necessary
          window.location.reload();
        } else {
          alert(\`Error: \${result.error || 'Failed to delete product'}\`);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the product.");
      }
    }
  <\/script>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/products/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/products/index.astro";
var $$url = "/admin/products";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/products/index@_@astro
var page = () => products_exports;
//#endregion
export { page };
