import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DKf7iUkJ.mjs";
//#region src/pages/admin/categories/index.astro
var categories_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let categories = [];
	try {
		const { data: dbCategories } = await supabase.from("categories").select("*").order("created_at", { ascending: false });
		if (dbCategories) categories = dbCategories;
	} catch (e) {
		console.error("Failed to load categories page:", e);
	}
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Categories - EasyAdmin" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="page-header mb-4"><h1 class="page-title h3 mb-1 font-weight-bold">Categories Management</h1><p class="text-muted mb-0">Organize and structure product catalog classifications.</p></div><div class="row g-4"><!-- Categories List - Left (Col 8) --><div class="col-lg-8"><div class="card border-0 shadow-sm p-4 bg-white"><h5 class="fw-bold mb-3 border-bottom pb-2">Category List</h5>${categories.length === 0 ? renderTemplate`<div class="text-center py-5"><i class="bi bi-folder2-open text-muted" style="font-size: 2.5rem;"></i><p class="text-muted mt-3 mb-0">No categories created yet.</p></div>` : renderTemplate`<div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-light"><tr><th>Category Name</th><th>Slug</th><th>Description</th><th class="text-end">Actions</th></tr></thead><tbody>${categories.map((c) => renderTemplate`<tr${addAttribute(`cat-row-${c.id}`, "id")}><td><div class="fw-bold">${c.name}</div><div class="text-muted small font-monospace" style="font-size: 0.7rem;">ID: ${c.id}</div></td><td class="font-monospace small">${c.slug}</td><td class="text-muted small" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.description || renderTemplate`<span class="text-muted">No description</span>`}</td><td class="text-end"><button class="btn btn-sm btn-outline-danger"${addAttribute(`deleteCategory('${c.id}')`, "onclick")} title="Delete"><i class="bi bi-trash"></i></button></td></tr>`)}</tbody></table></div>`}</div></div><!-- Create Category Form - Right (Col 4) --><div class="col-lg-4"><div class="card border-0 shadow-sm p-4 bg-white h-100"><h5 class="fw-bold mb-3 border-bottom pb-2">Add New Category</h5><form id="new-category-form"><div class="mb-3"><label for="c-name" class="form-label fw-semibold">Category Name *</label><input type="text" id="c-name" class="form-control" placeholder="e.g. Shoes &amp; Footwear" required></div><div class="mb-3"><label for="c-slug" class="form-label fw-semibold">URL Slug *</label><input type="text" id="c-slug" class="form-control" placeholder="e.g. shoes-footwear" required></div><div class="mb-3"><label for="c-image" class="form-label fw-semibold">Image URL (Optional)</label><input type="url" id="c-image" class="form-control" placeholder="https://images.unsplash.com/photo-..."></div><div class="mb-3"><label for="c-description" class="form-label fw-semibold">Description</label><textarea id="c-description" class="form-control" rows="3" placeholder="Briefly describe the category..."></textarea></div><div class="alert alert-danger d-none" id="error-alert"></div><button type="submit" class="btn btn-primary w-100" id="save-btn"><i class="bi bi-plus-lg me-1"></i> Add Category</button></form></div></div></div><script>
    // Autofill slug
    const nameInput = document.getElementById('c-name');
    const slugInput = document.getElementById('c-slug');
    
    nameInput.addEventListener('input', function() {
      slugInput.value = this.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    });

    const form = document.getElementById('new-category-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const saveBtn = document.getElementById('save-btn');
        const errorAlert = document.getElementById('error-alert');
        errorAlert.classList.add('d-none');
        
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Adding...';

        const name = document.getElementById('c-name').value;
        const slug = document.getElementById('c-slug').value;
        const imageUrl = document.getElementById('c-image').value;
        const description = document.getElementById('c-description').value;

        const payload = {
          name, slug, description,
          image_url: imageUrl || null
        };

        try {
          const { data: sessionData } = await window.supabase.auth.getSession();
          const token = sessionData?.session?.access_token;

          const res = await fetch('/api/admin/categories', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': token ? \`Bearer \${token}\` : ''
            },
            body: JSON.stringify(payload)
          });
          
          const result = await res.json();
          if (res.ok && result.success) {
            window.location.reload();
          } else {
            errorAlert.textContent = result.error || 'Failed to add category.';
            errorAlert.classList.remove('d-none');
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="bi bi-plus-lg me-1"></i> Add Category';
          }
        } catch (err) {
          console.error(err);
          errorAlert.textContent = 'An error occurred while adding the category.';
          errorAlert.classList.remove('d-none');
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<i class="bi bi-plus-lg me-1"></i> Add Category';
        }
      });
    }

    async function deleteCategory(id) {
      if (!confirm("Are you sure you want to delete this category? Products matching this category will become Uncategorized.")) {
        return;
      }
      
      try {
        const { data: sessionData } = await window.supabase.auth.getSession();
        const token = sessionData?.session?.access_token;

        const res = await fetch(\`/api/admin/categories?id=\${id}\`, {
          method: 'DELETE',
          headers: {
            'Authorization': token ? \`Bearer \${token}\` : ''
          }
        });
        
        const result = await res.json();
        if (res.ok && result.success) {
          const row = document.getElementById(\`cat-row-\${id}\`);
          if (row) row.remove();
          window.location.reload();
        } else {
          alert(\`Error: \${result.error || 'Failed to delete category'}\`);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the category.");
      }
    }
  <\/script>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/categories/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/categories/index.astro";
var $$url = "/admin/categories";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/categories/index@_@astro
var page = () => categories_exports;
//#endregion
export { page };
