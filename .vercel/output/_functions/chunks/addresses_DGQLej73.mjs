import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/addresses.astro
var addresses_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Addresses,
	file: () => $$file,
	url: () => $$url
});
var $$Addresses = createComponent(async ($$result, $$props, $$slots) => {
	const { data: dbProvinces } = await supabase.from("shipping_rates").select("province").order("province", { ascending: true });
	const provinces = dbProvinces ? dbProvinces.map((r) => r.province) : [];
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, { "title": "My Addresses - ShopWise" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main"><!-- Page Title --><div class="page-title light-background"><div class="container d-lg-flex justify-content-between align-items-center"><h1 class="mb-2 mb-lg-0">My Addresses</h1><nav class="breadcrumbs"><ol><li><a href="/">Home</a></li><li><a href="/track-order">Account</a></li><li class="current">Addresses</li></ol></nav></div></div><!-- Main Content Section --><section class="section py-5"><div class="container"><div id="logged-out-state" class="text-center py-5 d-none"><i class="bi bi-geo-alt-fill text-muted mb-3" style="font-size: 3rem;"></i><h4 class="fw-bold text-dark">Please log in to manage your addresses</h4><p class="text-muted small mx-auto mb-4" style="max-width: 400px;">Save your shipping details to speed up your checkout process and manage multiple delivery locations.</p><a href="/login?redirect=/addresses" class="btn btn-primary px-4 py-2 fw-bold rounded-pill">Log In to Account</a></div><div id="logged-in-state" class="row g-5 d-none"><!-- Column Left: Saved Addresses List --><div class="col-lg-7"><div class="card border-0 shadow-sm p-4 bg-white rounded-4"><div class="d-flex justify-content-between align-items-center mb-4"><h4 class="fw-bold mb-0 text-dark"><i class="bi bi-journal-bookmark-fill me-2 text-primary"></i>Saved Addresses</h4><span class="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-2.5 py-1" id="address-count">0 Addresses</span></div><div id="addresses-list-container" class="d-flex flex-column gap-3"><!-- Dynamic cards --><div class="text-center py-5 text-muted" id="addresses-loading"><span class="spinner-border spinner-border-sm me-2"></span>Loading address book...</div></div></div></div><!-- Column Right: Form for Add / Edit --><div class="col-lg-5"><div class="card border-0 shadow-sm p-4 bg-light rounded-4 position-sticky" style="top: 100px;"><h4 class="fw-bold mb-3 text-dark" id="form-title"><i class="bi bi-plus-circle-fill me-2 text-primary"></i>Add New Address</h4><p class="text-muted small mb-4">Fill out the recipient details and full shipping location address.</p><form id="address-form" class="needs-validation" novalidate><input type="hidden" id="address-id" value=""><div class="mb-3"><label for="address-label" class="form-label fw-semibold text-dark">Address Label *</label><input type="text" id="address-label" class="form-control rounded-3 py-2" placeholder="e.g. Rumah, Kantor, Kos" required><div class="invalid-feedback">Please enter a label for this address.</div></div><div class="row g-2 mb-3"><div class="col-md-6"><label for="recipient-name" class="form-label fw-semibold text-dark">Recipient Name *</label><input type="text" id="recipient-name" class="form-control rounded-3 py-2" placeholder="Full Name" required><div class="invalid-feedback">Recipient name is required.</div></div><div class="col-md-6"><label for="recipient-phone" class="form-label fw-semibold text-dark">Phone Number *</label><input type="tel" id="recipient-phone" class="form-control rounded-3 py-2" placeholder="e.g. 08123456789" required><div class="invalid-feedback">Phone number is required.</div></div></div><div class="mb-3"><label for="address-street" class="form-label fw-semibold text-dark">Street Address *</label><textarea id="address-street" class="form-control rounded-3 py-2" rows="2" placeholder="Jl. Raya No. 12, RT 01/RW 02" required></textarea><div class="invalid-feedback">Street address is required.</div></div><div class="row g-2 mb-3"><div class="col-md-6"><label for="address-province" class="form-label fw-semibold text-dark">Province *</label><select id="address-province" class="form-select rounded-3 py-2" required><option value="" disabled selected>Select Province</option>${provinces.map((prov) => renderTemplate`<option${addAttribute(prov, "value")}>${prov}</option>`)}</select><div class="invalid-feedback">Please select a province.</div></div><div class="col-md-6"><label for="address-city" class="form-label fw-semibold text-dark">City / District *</label><input type="text" id="address-city" class="form-control rounded-3 py-2" placeholder="e.g. Surabaya" required><div class="invalid-feedback">City/District is required.</div></div></div><div class="row g-2 mb-4"><div class="col-md-6"><label for="address-zip" class="form-label fw-semibold text-dark">ZIP / Postal Code</label><input type="text" id="address-zip" class="form-control rounded-3 py-2" placeholder="e.g. 60111"></div><div class="col-md-6 d-flex align-items-end pb-2"><div class="form-check form-switch mb-0"><input class="form-check-input" type="checkbox" id="address-default"><label class="form-check-label fw-semibold text-dark small" for="address-default">Set as default</label></div></div></div><div class="d-flex gap-2"><button type="button" class="btn btn-outline-secondary w-50 py-2.5 fw-bold rounded-3 d-none" id="btn-cancel-edit">Cancel</button><button type="submit" class="btn btn-primary w-100 py-2.5 fw-bold shadow-sm rounded-3" id="btn-submit-address"><i class="bi bi-save me-1"></i> Save Address</button></div></form></div></div></div></div></section></main><script>
    let cachedAddresses = [];

    document.addEventListener('DOMContentLoaded', async () => {
      const loggedOutState = document.getElementById('logged-out-state');
      const loggedInState = document.getElementById('logged-in-state');
      const addressesContainer = document.getElementById('addresses-list-container');
      const addressForm = document.getElementById('address-form');
      const formTitle = document.getElementById('form-title');
      const btnSubmit = document.getElementById('btn-submit-address');
      const btnCancel = document.getElementById('btn-cancel-edit');
      
      const inputId = document.getElementById('address-id');
      const inputLabel = document.getElementById('address-label');
      const inputName = document.getElementById('recipient-name');
      const inputPhone = document.getElementById('recipient-phone');
      const inputStreet = document.getElementById('address-street');
      const inputProvince = document.getElementById('address-province');
      const inputCity = document.getElementById('address-city');
      const inputZip = document.getElementById('address-zip');
      const inputDefault = document.getElementById('address-default');

      // Verify Session
      const { data: { session } } = await window.supabase.auth.getSession();
      if (!session) {
        loggedOutState.classList.remove('d-none');
        return;
      }
      loggedInState.classList.remove('d-none');

      async function fetchAddresses() {
        try {
          const res = await fetch('/api/customer/addresses', {
            headers: {
              'Authorization': \`Bearer \${session.access_token}\`
            }
          });
          const result = await res.json();
          if (res.ok && result.success) {
            cachedAddresses = result.data || [];
            renderAddresses();
          } else {
            addressesContainer.innerHTML = \`<div class="text-center py-5 text-danger small"><i class="bi bi-exclamation-circle me-1"></i>\${result.error || 'Failed to load addresses'}</div>\`;
          }
        } catch (err) {
          console.error(err);
          addressesContainer.innerHTML = \`<div class="text-center py-5 text-danger small"><i class="bi bi-exclamation-circle me-1"></i>An error occurred while loading addresses.</div>\`;
        }
      }

      function renderAddresses() {
        document.getElementById('address-count').textContent = \`\${cachedAddresses.length} Addresses\`;

        if (cachedAddresses.length === 0) {
          addressesContainer.innerHTML = \`
            <div class="text-center py-5 text-muted border border-dashed rounded-4">
              <i class="bi bi-geo-alt mb-3" style="font-size: 2.5rem;"></i>
              <h6 class="fw-bold mb-1">No addresses saved yet</h6>
              <p class="small text-muted mb-0">Use the form on the right to add your first delivery address.</p>
            </div>
          \`;
          return;
        }

        addressesContainer.innerHTML = cachedAddresses.map(addr => \`
          <div class="card border rounded-3 p-3 position-relative \${addr.is_default ? 'border-primary bg-primary-subtle' : ''}">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span class="badge \${addr.is_default ? 'bg-primary' : 'bg-secondary'} me-2">\${addr.label}</span>
                \${addr.is_default ? '<span class="badge bg-primary-subtle text-primary-emphasis border border-primary-subtle">Default Address</span>' : ''}
              </div>
              <div class="d-flex gap-1">
                <button type="button" class="btn btn-sm btn-outline-secondary py-1 px-2 border-0" onclick="editAddress('\${addr.id}')" title="Edit Address">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger py-1 px-2 border-0" onclick="deleteAddress('\${addr.id}')" title="Delete Address">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div class="fw-bold text-dark mb-1" style="font-size: 0.95rem;">\${addr.recipient_name}</div>
            <div class="text-secondary small mb-2"><i class="bi bi-telephone-fill me-1"></i>\${addr.phone}</div>
            <div class="text-dark small" style="line-height: 1.4;">
              \${addr.street}, \${addr.city}, \${addr.province} \${addr.zip || ''}
            </div>
          </div>
        \`).join('');
      }

      window.editAddress = function(id) {
        const addr = cachedAddresses.find(a => a.id === id);
        if (!addr) return;

        inputId.value = addr.id;
        inputLabel.value = addr.label;
        inputName.value = addr.recipient_name;
        inputPhone.value = addr.phone;
        inputStreet.value = addr.street;
        inputProvince.value = addr.province;
        inputCity.value = addr.city;
        inputZip.value = addr.zip || '';
        inputDefault.checked = addr.is_default;

        formTitle.innerHTML = \`<i class="bi bi-pencil-square me-2 text-primary"></i>Edit Address\`;
        btnSubmit.innerHTML = \`<i class="bi bi-check-circle me-1"></i> Update Address\`;
        btnCancel.classList.remove('d-none');
        
        window.scrollTo({ top: addressForm.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      };

      window.deleteAddress = async function(id) {
        if (!confirm('Are you sure you want to delete this address?')) return;

        try {
          const res = await fetch(\`/api/customer/addresses?id=\${id}\`, {
            method: 'DELETE',
            headers: {
              'Authorization': \`Bearer \${session.access_token}\`
            }
          });
          const result = await res.json();
          if (res.ok && result.success) {
            fetchAddresses();
            resetForm();
          } else {
            alert(result.error || 'Failed to delete address');
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred while deleting address');
        }
      };

      function resetForm() {
        inputId.value = '';
        inputLabel.value = '';
        inputName.value = '';
        inputPhone.value = '';
        inputStreet.value = '';
        inputProvince.value = '';
        inputCity.value = '';
        inputZip.value = '';
        inputDefault.checked = false;

        formTitle.innerHTML = \`<i class="bi bi-plus-circle-fill me-2 text-primary"></i>Add New Address\`;
        btnSubmit.innerHTML = \`<i class="bi bi-save me-1"></i> Save Address\`;
        btnCancel.classList.add('d-none');
        addressForm.classList.remove('was-validated');
      }

      btnCancel.addEventListener('click', resetForm);

      addressForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!addressForm.checkValidity()) {
          e.stopPropagation();
          addressForm.classList.add('was-validated');
          return;
        }

        const id = inputId.value;
        const payload = {
          label: inputLabel.value.trim(),
          recipient_name: inputName.value.trim(),
          phone: inputPhone.value.trim(),
          street: inputStreet.value.trim(),
          province: inputProvince.value,
          city: inputCity.value.trim(),
          zip: inputZip.value.trim() || null,
          is_default: inputDefault.checked
        };

        const method = id ? 'PUT' : 'POST';
        if (id) payload.id = id;

        try {
          btnSubmit.disabled = true;
          btnSubmit.innerHTML = \`<span class="spinner-border spinner-border-sm me-1"></span>Saving...\`;

          const res = await fetch('/api/customer/addresses', {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': \`Bearer \${session.access_token}\`
            },
            body: JSON.stringify(payload)
          });

          const result = await res.json();
          if (res.ok && result.success) {
            fetchAddresses();
            resetForm();
            window.showToast?.(id ? 'Address updated!' : 'Address added!', false);
          } else {
            alert(result.error || 'Failed to save address');
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred while saving address');
        } finally {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = id ? \`<i class="bi bi-check-circle me-1"></i> Update Address\` : \`<i class="bi bi-save me-1"></i> Save Address\`;
        }
      });

      // Initial load
      fetchAddresses();
    });
  <\/script>` })}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/addresses.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/addresses.astro";
var $$url = "/addresses";
//#endregion
//#region \0virtual:astro:page:src/pages/addresses@_@astro
var page = () => addresses_exports;
//#endregion
export { page };
