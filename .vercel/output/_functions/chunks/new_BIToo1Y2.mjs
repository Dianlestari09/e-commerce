import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DKf7iUkJ.mjs";
//#region src/pages/admin/products/new.astro
var new_exports = /* @__PURE__ */ __exportAll({
	default: () => $$New,
	file: () => $$file,
	url: () => $$url
});
var $$New = createComponent(async ($$result, $$props, $$slots) => {
	let categories = [];
	try {
		const { data: dbCategories } = await supabase.from("categories").select("*");
		if (dbCategories) categories = dbCategories;
	} catch (e) {
		console.error("Failed to load categories:", e);
	}
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Add New Product - EasyAdmin" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="page-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"><div><h1 class="page-title h3 mb-1 font-weight-bold">Add New Product</h1><p class="text-muted mb-0">Fill in the fields below to catalog a new product.</p></div><div><a href="/admin/products" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i> Back to List</a></div></div><div class="card border-0 shadow-sm p-4 bg-white" style="max-width: 800px;"><form id="new-product-form"><div class="row g-3"><!-- Product Name --><div class="col-md-6"><label for="p-name" class="form-label fw-bold">Product Name *</label><input type="text" id="p-name" class="form-control" placeholder="e.g. Smart Watch Active" required></div><!-- Product Slug --><div class="col-md-6"><label for="p-slug" class="form-label fw-bold">Product Slug (URL Friendly) *</label><input type="text" id="p-slug" class="form-control" placeholder="e.g. smart-watch-active" required></div><!-- SKU --><div class="col-md-6"><label for="p-sku" class="form-label fw-bold">SKU (Stock Keeping Unit)</label><input type="text" id="p-sku" class="form-control" placeholder="e.g. SW-ACT-001"></div><!-- Category --><div class="col-md-6"><label for="p-category" class="form-label fw-bold">Category</label><select id="p-category" class="form-select"><option value="">Select Category</option>${categories.map((c) => renderTemplate`<option${addAttribute(c.id, "value")}>${c.name}</option>`)}</select></div><!-- Price --><div class="col-md-4"><label for="p-price" class="form-label fw-bold">Price ($) *</label><input type="number" id="p-price" class="form-control" step="0.01" min="0" placeholder="120.00" required></div><!-- Sale Price --><div class="col-md-4"><label for="p-sale-price" class="form-label fw-bold">Sale Price ($)</label><input type="number" id="p-sale-price" class="form-control" step="0.01" min="0" placeholder="99.00"></div><!-- Stock --><div class="col-md-4"><label for="p-stock" class="form-label fw-bold">Stock Quantity *</label><input type="number" id="p-stock" class="form-control" min="0" value="10" required></div><!-- Image URL --><div class="col-12"><label for="p-image" class="form-label fw-bold">Image URL</label><input type="url" id="p-image" class="form-control" placeholder="e.g. https://images.unsplash.com/photo-..."><div class="text-muted small mt-1">If blank, a default store placeholder image will be used.</div></div><!-- Colors Options --><div class="col-md-6"><label for="p-colors" class="form-label fw-bold">Color Options (Comma-separated)</label><input type="text" id="p-colors" class="form-control" placeholder="e.g. Red, Blue, Black"><div class="text-muted small mt-1">Leave empty if product has no color variations.</div></div><!-- Sizes Options --><div class="col-md-6"><label for="p-sizes" class="form-label fw-bold">Size Options (Comma-separated)</label><input type="text" id="p-sizes" class="form-control" placeholder="e.g. S, M, L, XL"><div class="text-muted small mt-1">Leave empty if product has no size variations.</div></div><!-- Variants Section Table --><div class="col-12 d-none" id="variants-section"><h5 class="fw-bold mb-2 mt-3 text-dark border-bottom pb-1"><i class="bi bi-boxes me-2"></i>Variant Stock Configuration</h5><p class="text-muted small mb-3">Set individual stock quantities for each variant combination. Main product stock will automatically be calculated as the sum of variant stocks.</p><div class="table-responsive rounded border"><table class="table table-striped table-hover align-middle mb-0 bg-white" style="font-size: 0.85rem;"><thead class="table-dark"><tr><th class="ps-3">Color</th><th>Size</th><th style="width: 150px;">Stock</th></tr></thead><tbody id="variants-stock-tbody"><!-- Dynamically generated rows --></tbody></table></div></div><!-- Description --><div class="col-12"><label for="p-description" class="form-label fw-bold">Description</label><div id="quill-editor" style="height: 200px;" class="bg-white"></div><input type="hidden" id="p-description"></div></div><div class="alert alert-danger d-none mt-3" id="error-alert"></div><div class="mt-4 border-top pt-3 d-flex gap-2 justify-content-end"><button type="reset" class="btn btn-outline-secondary">Reset Fields</button><button type="submit" class="btn btn-primary" id="save-btn"><i class="bi bi-save me-1"></i> Save Product</button></div></form></div><script>
    document.addEventListener('DOMContentLoaded', function() {
      // Automatically fill slug from name
      const nameInput = document.getElementById('p-name');
      const slugInput = document.getElementById('p-slug');
    
    nameInput.addEventListener('input', function() {
      const name = this.value;
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      slugInput.value = slug;
    });

    // Initialize Quill
    const quill = new Quill('#quill-editor', {
      theme: 'snow',
      placeholder: 'Describe your product specs, features, and benefits...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'clean']
        ]
      }
    });

    // Variants Stock Management Listeners
    const colorsInput = document.getElementById('p-colors');
    const sizesInput = document.getElementById('p-sizes');
    const variantsSection = document.getElementById('variants-section');
    const variantsTbody = document.getElementById('variants-stock-tbody');
    const stockInput = document.getElementById('p-stock');

    function generateVariants() {
      const colors = colorsInput.value.split(',').map(s => s.trim()).filter(Boolean);
      const sizes = sizesInput.value.split(',').map(s => s.trim()).filter(Boolean);

      if (colors.length === 0 && sizes.length === 0) {
        variantsSection.classList.add('d-none');
        variantsTbody.innerHTML = '';
        stockInput.readOnly = false;
        stockInput.placeholder = "e.g. 100";
        return;
      }

      variantsSection.classList.remove('d-none');
      stockInput.readOnly = true;
      stockInput.placeholder = "Auto-calculated from variants";

      const colorsList = colors.length > 0 ? colors : [null];
      const sizesList = sizes.length > 0 ? sizes : [null];

      // Keep existing stock inputs values
      const existingStocks = {};
      const rows = variantsTbody.querySelectorAll('tr');
      rows.forEach(row => {
        const c = row.dataset.color || '';
        const s = row.dataset.size || '';
        const input = row.querySelector('input');
        if (input) {
          existingStocks[\`\${c}::\${s}\`] = input.value;
        }
      });

      let html = '';
      colorsList.forEach(color => {
        sizesList.forEach(size => {
          const colorKey = color || '';
          const sizeKey = size || '';
          const key = \`\${colorKey}::\${sizeKey}\`;
          const currentVal = existingStocks[key] !== undefined ? existingStocks[key] : '10';

          html += \`
            <tr data-color="\${colorKey}" data-size="\${sizeKey}">
              <td class="ps-3"><span class="fw-bold">\${color || '<span class="text-secondary small italic">No Color</span>'}</span></td>
              <td><span class="fw-bold">\${size || '<span class="text-secondary small italic">No Size</span>'}</span></td>
              <td>
                <input type="number" min="0" class="form-control form-control-sm variant-stock-input" value="\${currentVal}" style="width: 100px;" oninput="updateSumStock()">
              </td>
            </tr>
          \`;
        });
      });

      variantsTbody.innerHTML = html;
      updateSumStock();
    }

    window.updateSumStock = function() {
      const inputs = document.querySelectorAll('.variant-stock-input');
      if (inputs.length === 0) return;
      let total = 0;
      inputs.forEach(input => {
        total += Number(input.value || 0);
      });
      stockInput.value = total;
    };

    colorsInput.addEventListener('input', generateVariants);
    sizesInput.addEventListener('input', generateVariants);

    const form = document.getElementById('new-product-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const saveBtn = document.getElementById('save-btn');
        const errorAlert = document.getElementById('error-alert');
        errorAlert.classList.add('d-none');
        
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Saving...';

        const name = document.getElementById('p-name').value;
        const slug = document.getElementById('p-slug').value;
        const sku = document.getElementById('p-sku').value;
        const categoryId = document.getElementById('p-category').value;
        const price = document.getElementById('p-price').value;
        const salePrice = document.getElementById('p-sale-price').value;
        const stock = document.getElementById('p-stock').value;
        const imageUrl = document.getElementById('p-image').value;
        const colorsRaw = document.getElementById('p-colors').value;
        const sizesRaw = document.getElementById('p-sizes').value;
        const description = quill.root.innerHTML === '<p><br></p>' ? '' : quill.root.innerHTML;

        const colors = colorsRaw ? colorsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
        const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

        // Gather variant stocks
        const variants = [];
        const variantRows = document.querySelectorAll('#variants-stock-tbody tr');
        variantRows.forEach(row => {
          const color = row.dataset.color || null;
          const size = row.dataset.size || null;
          const input = row.querySelector('.variant-stock-input');
          if (input) {
            variants.push({
              color: color || null,
              size: size || null,
              stock: Number(input.value || 0)
            });
          }
        });

        const payload = {
          name, slug, sku, price,
          sale_price: salePrice || null,
          stock: Number(stock || 0),
          category_id: categoryId || null,
          image_url: imageUrl || null,
          description,
          colors: colors.length > 0 ? colors : null,
          sizes: sizes.length > 0 ? sizes : null,
          variants: variants.length > 0 ? variants : null
        };

        try {
          const { data: sessionData } = await window.supabase.auth.getSession();
          const token = sessionData?.session?.access_token;

          const res = await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': token ? \`Bearer \${token}\` : ''
            },
            body: JSON.stringify(payload)
          });
          
          const result = await res.json();
          if (res.ok && result.success) {
            window.location.href = '/admin/products';
          } else {
            errorAlert.textContent = result.error || 'Failed to create product.';
            errorAlert.classList.remove('d-none');
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> Save Product';
          }
        } catch (err) {
          console.error(err);
          errorAlert.textContent = 'An error occurred while saving the product.';
          errorAlert.classList.remove('d-none');
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> Save Product';
        }
      });
    }
    }); // End DOMContentLoaded
  <\/script>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/products/new.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/products/new.astro";
var $$url = "/admin/products/new";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/products/new@_@astro
var page = () => new_exports;
//#endregion
export { page };
