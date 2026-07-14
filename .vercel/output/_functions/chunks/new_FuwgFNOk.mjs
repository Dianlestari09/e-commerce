import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DKf7iUkJ.mjs";
//#region src/pages/admin/articles/new.astro
var new_exports = /* @__PURE__ */ __exportAll({
	default: () => $$New,
	file: () => $$file,
	url: () => $$url
});
var $$New = createComponent(async ($$result, $$props, $$slots) => {
	let articles = [];
	try {
		const { data } = await supabase.from("articles").select("id, title").order("title", { ascending: true });
		if (data) articles = data;
	} catch (e) {
		console.error("Failed to load articles for selection:", e);
	}
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Add New Article - EasyAdmin" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="page-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"><div><h1 class="page-title h3 mb-1 font-weight-bold">Add New Article</h1><p class="text-muted mb-0">Fill in the fields below to create a new blog article.</p></div><div><a href="/admin/articles" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i> Back to List</a></div></div><ul class="nav nav-tabs mb-4" id="articleTabs" role="tablist"><li class="nav-item" role="presentation"><button class="nav-link active" id="content-tab" data-bs-toggle="tab" data-bs-target="#content-pane" type="button"><i class="bi bi-file-text me-1"></i> Content</button></li><li class="nav-item" role="presentation"><button class="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo-pane" type="button"><i class="bi bi-search me-1"></i> SEO & Schema</button></li></ul><form id="new-article-form"><div class="tab-content"><!-- ====== TAB 1: CONTENT ====== --><div class="tab-pane fade show active" id="content-pane" role="tabpanel"><div class="row g-4"><!-- Left Column --><div class="col-lg-8"><div class="card border-0 shadow-sm p-4 bg-white"><div class="row g-3"><!-- Title --><div class="col-12"><label for="a-title" class="form-label fw-bold">Article Title *</label><input type="text" id="a-title" class="form-control form-control-lg" placeholder="e.g. 10 Tips Memilih Produk Berkualitas" required></div><!-- Slug --><div class="col-12"><label for="a-slug" class="form-label fw-bold">Slug (URL) *</label><div class="input-group"><span class="input-group-text text-muted">/articles/</span><input type="text" id="a-slug" class="form-control font-monospace" placeholder="10-tips-memilih-produk-berkualitas" required></div><div class="text-muted small mt-1">Auto-generated from title. You can customize it.</div></div><!-- Excerpt --><div class="col-12"><label for="a-excerpt" class="form-label fw-bold">Excerpt / Summary</label><textarea id="a-excerpt" class="form-control" rows="3" placeholder="Brief description of the article (shown in article lists and meta description if SEO field is empty)..."></textarea></div><!-- Content --><div class="col-12"><label class="form-label fw-bold">Content *</label><div id="quill-editor" style="height: 400px;" class="bg-white"></div><input type="hidden" id="a-content"></div></div></div></div><!-- Right Column --><div class="col-lg-4"><!-- Publish Box --><div class="card border-0 shadow-sm p-4 bg-white mb-4"><h6 class="fw-bold mb-3 border-bottom pb-2"><i class="bi bi-send me-1"></i>Publish</h6><div class="mb-3"><label for="a-status" class="form-label fw-bold">Status</label><select id="a-status" class="form-select"><option value="draft">Draft</option><option value="published">Published</option></select></div><div class="alert alert-danger d-none mb-3" id="error-alert"></div><button type="submit" class="btn btn-primary w-100" id="save-btn"><i class="bi bi-save me-1"></i> Save Article</button></div><!-- Article Info --><div class="card border-0 shadow-sm p-4 bg-white mb-4"><h6 class="fw-bold mb-3 border-bottom pb-2"><i class="bi bi-info-circle me-1"></i>Article Details</h6><div class="mb-3"><label for="a-category" class="form-label fw-bold">Category</label><select id="a-category" class="form-select"><option value="tips">Tips & Tricks</option><option value="review">Product Review</option><option value="news">News</option><option value="inspirasi">Inspirasi</option><option value="promo">Promo & Deals</option><option value="tutorial">Tutorial</option></select></div><div class="mb-3"><label for="a-tags" class="form-label fw-bold">Tags <span class="text-muted fw-normal">(comma-separated)</span></label><input type="text" id="a-tags" class="form-control" placeholder="e.g. tips, belanja, review"></div><div class="mb-3"><label for="a-author" class="form-label fw-bold">Author Name</label><input type="text" id="a-author" class="form-control" placeholder="e.g. Dian Lestari Kurniawati" value="Dian Lestari Kurniawati"></div><div class="mb-3"><label for="a-related" class="form-label fw-bold">Baca Juga (Inlink)</label><select id="a-related" class="form-select" multiple>${articles.map((art) => renderTemplate`<option${addAttribute(art.id, "value")}>${art.title}</option>`)}</select><div class="text-muted small mt-1">Pilih artikel lain untuk ditautkan sebagai rekomendasi bacaan.</div></div></div><!-- Cover Image --><div class="card border-0 shadow-sm p-4 bg-white"><h6 class="fw-bold mb-3 border-bottom pb-2"><i class="bi bi-image me-1"></i>Cover Image</h6><div class="mb-2"><label for="a-cover" class="form-label fw-bold">Image URL</label><input type="url" id="a-cover" class="form-control" placeholder="https://images.unsplash.com/..."><div class="text-muted small mt-1">Paste a direct image URL</div></div><div id="cover-preview-wrapper" class="d-none mt-2"><img id="cover-preview" src="" alt="Cover Preview" class="img-fluid rounded border" style="max-height: 150px; object-fit: cover; width: 100%;"></div></div></div></div></div><!-- ====== TAB 2: SEO & SCHEMA ====== --><div class="tab-pane fade" id="seo-pane" role="tabpanel"><div class="card border-0 shadow-sm p-4 bg-white" style="max-width: 860px;"><h5 class="fw-bold mb-4 border-bottom pb-2"><i class="bi bi-search me-2"></i>SEO Settings</h5><!-- Google Preview --><div class="mb-4 p-3 rounded-3 border bg-light"><div class="text-muted small mb-2 fw-semibold text-uppercase" style="letter-spacing: 0.5px; font-size: 0.7rem;">Google Search Preview</div><div class="text-primary fw-semibold" id="seo-preview-title" style="font-size: 1.05rem;">Article Title</div><div class="text-success small" id="seo-preview-url">https://yoursite.com/articles/your-slug</div><div class="text-secondary small mt-1" id="seo-preview-desc" style="line-height: 1.5;">Article meta description will appear here...</div></div><div class="row g-3"><div class="col-12"><label for="a-meta-title" class="form-label fw-bold">Meta Title (SEO)</label><input type="text" id="a-meta-title" class="form-control" placeholder="Custom title for search engines (leave blank to use article title)"><div class="d-flex justify-content-between text-muted small mt-1"><span>Recommended: 50-60 characters</span><span id="meta-title-count">0 chars</span></div></div><div class="col-12"><label for="a-meta-desc" class="form-label fw-bold">Meta Description (SEO)</label><textarea id="a-meta-desc" class="form-control" rows="3" placeholder="Custom description for search engines (leave blank to use excerpt)"></textarea><div class="d-flex justify-content-between text-muted small mt-1"><span>Recommended: 150-160 characters</span><span id="meta-desc-count">0 chars</span></div></div></div><hr class="my-4"><h5 class="fw-bold mb-3"><i class="bi bi-code-slash me-2"></i>JSON-LD Schema Code</h5><p class="text-muted small mb-3">Paste custom JSON-LD structured data schema for this article. If left blank, a default <code>Article</code> schema will be auto-generated.<a href="https://schema.org/Article" target="_blank" rel="noopener" class="ms-1">schema.org/Article ↗</a></p><!-- Schema Preview Toggle --><div class="mb-3"><div class="d-flex align-items-center justify-content-between mb-2"><label for="a-schema" class="form-label fw-bold mb-0">Custom Schema (JSON-LD)</label><button type="button" class="btn btn-sm btn-outline-secondary" id="schema-format-btn"><i class="bi bi-braces me-1"></i>Format JSON</button></div><textarea id="a-schema" class="form-control font-monospace" rows="14" placeholder="{
  &quot;@context&quot;: &quot;https://schema.org&quot;,
  &quot;@type&quot;: &quot;Article&quot;,
  &quot;headline&quot;: &quot;Your Article Title&quot;,
  &quot;description&quot;: &quot;Your article description&quot;,
  &quot;author&quot;: {
    &quot;@type&quot;: &quot;Person&quot;,
    &quot;name&quot;: &quot;Dian Lestari Kurniawati&quot;
  },
  &quot;publisher&quot;: {
    &quot;@type&quot;: &quot;Organization&quot;,
    &quot;name&quot;: &quot;ShopWise&quot;,
    &quot;logo&quot;: {
      &quot;@type&quot;: &quot;ImageObject&quot;,
      &quot;url&quot;: &quot;/shop/assets/img/favicon.png&quot;
    }
  },
  &quot;datePublished&quot;: &quot;2026-07-14&quot;,
  &quot;image&quot;: &quot;https://your-image-url.jpg&quot;
}" style="font-size: 0.85rem; line-height: 1.6;"></textarea><div id="schema-error" class="text-danger small mt-1 d-none"><i class="bi bi-exclamation-circle me-1"></i>Invalid JSON. Please fix before saving.</div></div></div></div></div></form><script>
    document.addEventListener('DOMContentLoaded', function () {
      // Auto-slug from title
      const titleInput = document.getElementById('a-title');
      const slugInput = document.getElementById('a-slug');
      titleInput.addEventListener('input', function () {
        slugInput.value = this.value
          .toLowerCase()
          .replace(/[^a-z0-9\\s-]/g, '')
          .replace(/\\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/(^-|-$)/g, '');
        updateSeoPreview();
      });
      slugInput.addEventListener('input', updateSeoPreview);

      // Cover image preview
      const coverInput = document.getElementById('a-cover');
      const coverPreviewWrapper = document.getElementById('cover-preview-wrapper');
      const coverPreview = document.getElementById('cover-preview');
      coverInput.addEventListener('input', function () {
        if (this.value) {
          coverPreview.src = this.value;
          coverPreviewWrapper.classList.remove('d-none');
        } else {
          coverPreviewWrapper.classList.add('d-none');
        }
      });

      // SEO preview
      const metaTitleInput = document.getElementById('a-meta-title');
      const metaDescInput = document.getElementById('a-meta-desc');
      const metaTitleCount = document.getElementById('meta-title-count');
      const metaDescCount = document.getElementById('meta-desc-count');

      metaTitleInput.addEventListener('input', function () {
        metaTitleCount.textContent = \`\${this.value.length} chars\`;
        updateSeoPreview();
      });
      metaDescInput.addEventListener('input', function () {
        metaDescCount.textContent = \`\${this.value.length} chars\`;
        updateSeoPreview();
      });
      document.getElementById('a-excerpt').addEventListener('input', updateSeoPreview);

      function updateSeoPreview() {
        const title = metaTitleInput.value || titleInput.value || 'Article Title';
        const slug = slugInput.value || 'your-slug';
        const desc = metaDescInput.value || document.getElementById('a-excerpt').value || 'Article meta description will appear here...';
        document.getElementById('seo-preview-title').textContent = title.length > 60 ? title.slice(0, 60) + '...' : title;
        document.getElementById('seo-preview-url').textContent = \`\${window.location.origin}/articles/\${slug}\`;
        document.getElementById('seo-preview-desc').textContent = desc.length > 160 ? desc.slice(0, 160) + '...' : desc;
      }

      // Schema JSON format button
      document.getElementById('schema-format-btn').addEventListener('click', function () {
        const ta = document.getElementById('a-schema');
        const errEl = document.getElementById('schema-error');
        try {
          if (ta.value.trim()) {
            ta.value = JSON.stringify(JSON.parse(ta.value), null, 2);
          }
          errEl.classList.add('d-none');
        } catch (e) {
          errEl.classList.remove('d-none');
        }
      });

      // Schema validation on input
      document.getElementById('a-schema').addEventListener('input', function () {
        const errEl = document.getElementById('schema-error');
        if (!this.value.trim()) { errEl.classList.add('d-none'); return; }
        try { JSON.parse(this.value); errEl.classList.add('d-none'); }
        catch (e) { errEl.classList.remove('d-none'); }
      });

      // Initialize Choices.js for related articles
      let relatedChoices = null;
      const relatedSelectEl = document.getElementById('a-related');
      if (relatedSelectEl && window.Choices) {
        relatedChoices = new window.Choices(relatedSelectEl, {
          removeItemButton: true,
          placeholderValue: 'Pilih artikel...',
          searchPlaceholderValue: 'Cari artikel...'
        });
      }

      // Initialize Quill editor
      const quill = new Quill('#quill-editor', {
        theme: 'snow',
        placeholder: 'Write your article content here...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      // Form submit
      const form = document.getElementById('new-article-form');
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const saveBtn = document.getElementById('save-btn');
        const errorAlert = document.getElementById('error-alert');
        errorAlert.classList.add('d-none');

        // Validate schema
        const schemaVal = document.getElementById('a-schema').value.trim();
        if (schemaVal) {
          try { JSON.parse(schemaVal); }
          catch (e) {
            errorAlert.textContent = 'Invalid JSON-LD Schema code. Please fix it in the SEO tab.';
            errorAlert.classList.remove('d-none');
            return;
          }
        }

        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Saving...';

        const tagsRaw = document.getElementById('a-tags').value;
        const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

        const content = quill.root.innerHTML === '<p><br></p>' ? '' : quill.root.innerHTML;

        const relatedIds = relatedChoices ? relatedChoices.getValue(true) : [];

        const payload = {
          title: document.getElementById('a-title').value,
          slug: document.getElementById('a-slug').value,
          excerpt: document.getElementById('a-excerpt').value,
          content,
          cover_image: document.getElementById('a-cover').value || null,
          author_name: document.getElementById('a-author').value,
          category: document.getElementById('a-category').value,
          tags,
          status: document.getElementById('a-status').value,
          meta_title: document.getElementById('a-meta-title').value || null,
          meta_description: document.getElementById('a-meta-desc').value || null,
          schema_code: schemaVal || null,
          related_article_ids: relatedIds
        };

        try {
          const { data: sessionData } = await window.supabase.auth.getSession();
          const token = sessionData?.session?.access_token;

          const res = await fetch('/api/admin/articles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? \`Bearer \${token}\` : ''
            },
            body: JSON.stringify(payload)
          });

          const result = await res.json();
          if (res.ok && result.success) {
            window.location.href = '/admin/articles';
          } else {
            errorAlert.textContent = result.error || 'Failed to create article.';
            errorAlert.classList.remove('d-none');
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> Save Article';
          }
        } catch (err) {
          console.error(err);
          errorAlert.textContent = 'An error occurred while saving the article.';
          errorAlert.classList.remove('d-none');
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> Save Article';
        }
      });
    });
  <\/script>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/articles/new.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/articles/new.astro";
var $$url = "/admin/articles/new";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/articles/new@_@astro
var page = () => new_exports;
//#endregion
export { page };
