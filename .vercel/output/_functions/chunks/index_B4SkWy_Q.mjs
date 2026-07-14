import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DKf7iUkJ.mjs";
//#region src/pages/admin/articles/index.astro
var articles_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let articles = [];
	try {
		const { data: dbArticles } = await supabase.from("articles").select("id, title, slug, category, status, published_at, created_at, author_name, excerpt, cover_image").order("created_at", { ascending: false });
		if (dbArticles) articles = dbArticles;
	} catch (e) {
		console.error("Failed to load articles:", e);
	}
	function formatDate(dateStr) {
		if (!dateStr) return "-";
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	}
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Articles - EasyAdmin" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="page-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"><div><h1 class="page-title h3 mb-1 font-weight-bold">Articles Management</h1><p class="text-muted mb-0">Create, edit, and manage blog articles for your storefront.</p></div><div><a href="/admin/articles/new" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i> Add New Article</a></div></div><div class="card border-0 shadow-sm p-4 bg-white">${articles.length === 0 ? renderTemplate`<div class="text-center py-5"><i class="bi bi-newspaper text-muted" style="font-size: 3rem;"></i><h4 class="mt-3">No articles yet</h4><p class="text-muted">Click the button above to create your first article.</p></div>` : renderTemplate`<div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-light"><tr><th style="width: 70px;">Cover</th><th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Published</th><th class="text-end">Actions</th></tr></thead><tbody>${articles.map((a) => renderTemplate`<tr${addAttribute(`art-row-${a.id}`, "id")}><td><img${addAttribute(a.cover_image || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(a.title, "alt")} class="img-fluid rounded border object-fit-cover" style="width: 50px; height: 50px;"></td><td><div class="fw-bold">${a.title}</div><div class="text-muted small font-monospace" style="font-size: 0.75rem;">/${a.slug}</div></td><td><span class="badge bg-light text-dark border text-capitalize">${a.category}</span></td><td class="small text-muted">${a.author_name || "-"}</td><td>${a.status === "published" ? renderTemplate`<span class="badge bg-success">Published</span>` : renderTemplate`<span class="badge bg-secondary">Draft</span>`}</td><td class="small text-muted">${formatDate(a.published_at)}</td><td class="text-end"><div class="d-inline-flex gap-2"><a${addAttribute(`/articles/${a.slug}`, "href")} target="_blank" class="btn btn-sm btn-outline-secondary" title="View on site"><i class="bi bi-eye"></i></a><a${addAttribute(`/admin/articles/edit?id=${a.id}`, "href")} class="btn btn-sm btn-outline-info" title="Edit"><i class="bi bi-pencil"></i></a><button class="btn btn-sm btn-outline-danger" title="Delete"${addAttribute(`deleteArticle('${a.id}')`, "onclick")}><i class="bi bi-trash"></i></button></div></td></tr>`)}</tbody></table></div>`}</div><script>
    async function deleteArticle(id) {
      if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
        return;
      }

      try {
        const { data: sessionData } = await window.supabase.auth.getSession();
        const token = sessionData?.session?.access_token;

        const res = await fetch(\`/api/admin/articles?id=\${id}\`, {
          method: 'DELETE',
          headers: { 'Authorization': token ? \`Bearer \${token}\` : '' }
        });

        const result = await res.json();
        if (res.ok && result.success) {
          const row = document.getElementById(\`art-row-\${id}\`);
          if (row) row.remove();
          window.location.reload();
        } else {
          alert(\`Error: \${result.error || 'Failed to delete article'}\`);
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred while deleting the article.');
      }
    }
  <\/script>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/articles/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/articles/index.astro";
var $$url = "/admin/articles";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/articles/index@_@astro
var page = () => articles_exports;
//#endregion
export { page };
