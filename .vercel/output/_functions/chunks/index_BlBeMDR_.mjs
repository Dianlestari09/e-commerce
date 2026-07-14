import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DKf7iUkJ.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/admin/orders/index.astro
var orders_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const supabaseAdmin = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0");
	let orders = [];
	try {
		const { data: dbOrders } = await supabaseAdmin.from("orders").select(`
      *,
      order_items (
        id,
        quantity,
        unit_price,
        total_price,
        product_id,
        selected_color,
        selected_size,
        products (
          name,
          images,
          sku
        )
      )
    `).order("created_at", { ascending: false });
		if (dbOrders) orders = dbOrders;
	} catch (e) {
		console.error("Failed to load orders:", e);
	}
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Orders - EasyAdmin" }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="page-header mb-4"><h1 class="page-title h3 mb-1 font-weight-bold">Orders Management</h1><p class="text-muted mb-0">Track order processing, update payment states, and fulfill customer requests.</p></div><div class="card border-0 shadow-sm p-4 bg-white">${orders.length === 0 ? renderTemplate`<div class="text-center py-5"><i class="bi bi-cart-x text-muted" style="font-size: 3rem;"></i><h4 class="mt-3">No orders found</h4><p class="text-muted">Orders placed by customers on the storefront will appear here.</p></div>` : renderTemplate`<div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-light"><tr><th>Order ID</th><th>Customer & Details</th><th>Date</th><th>Total Amount</th><th>Payment Method</th><th>Payment Status</th><th>Order Status</th></tr></thead><tbody>${orders.map((o) => renderTemplate`<tr><td class="font-monospace text-muted" style="font-size: 0.8rem;">${o.id}</td><td><div class="fw-bold">${o.shipping_address.split("|")[0]?.replace("Jane Doe", "") || "Guest"}</div><div class="text-muted small mb-1">${o.shipping_address.split("|")[1] || ""}</div><div class="text-muted small" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${o.shipping_address.split("|")[2] || o.shipping_address}</div><div class="mt-1 small"><span class="text-secondary fw-semibold">Total Items: </span>${o.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0} unit(s)</div><!-- Ordered Items Details List --><div class="mt-2 pt-2 border-top" style="max-width: 320px;"><span class="text-secondary fw-bold small d-block mb-1" style="font-size: 0.75rem;">Items to Ship:</span><ul class="list-unstyled mb-0 ps-0">${o.order_items?.map((item) => renderTemplate`<li class="d-flex align-items-center gap-2 mb-2 small text-dark"><img${addAttribute(item.products && item.products.images && item.products.images[0] || "/shop/assets/img/product/product-default.webp", "src")}${addAttribute(item.products?.name || "Product", "alt")} class="img-fluid rounded border object-fit-cover" style="width: 32px; height: 32px;"><div class="text-truncate flex-grow-1" style="min-width: 0;"><div class="fw-semibold text-truncate" style="font-size: 0.825rem;"${addAttribute(item.products?.name || "Product", "title")}>${item.products?.name || "Unknown Product"}</div>${(item.selected_color || item.selected_size) && renderTemplate`<span class="text-secondary d-block" style="font-size: 0.72rem; font-weight: 500;">Var: ${[item.selected_color, item.selected_size].filter(Boolean).join(" / ")}</span>`}${item.products?.sku && renderTemplate`<span class="text-muted font-monospace d-block" style="font-size: 0.7rem;">SKU: ${item.products.sku}</span>`}</div><span class="badge bg-secondary-subtle text-secondary-emphasis rounded-pill" style="font-size: 0.75rem;">x${item.quantity}</span></li>`)}</ul></div></td><td class="small text-muted">${new Date(o.created_at).toLocaleDateString()}</td><td class="fw-bold text-primary">$${Number(o.total_amount).toFixed(2)}</td><td class="text-uppercase small fw-semibold"><div>${o.payment_method.replace("_", " ")}</div>${o.payment_proof_url && renderTemplate`<div class="mt-1"><a href="#"${addAttribute(`showPaymentProofModal(event, '${o.payment_proof_url}')`, "onclick")} class="btn btn-xs btn-outline-info py-0.5 px-2 font-weight-bold" style="font-size: 0.68rem; border-radius: 4px;"><i class="bi bi-image me-1"></i>Bukti Bayar</a></div>`}</td><td><select class="form-select form-select-sm border-0 fw-semibold"${addAttribute(`max-width: 120px; background-color: ${o.payment_status === "paid" ? "#d1e7dd" : o.payment_status === "failed" ? "#f8d7da" : "#fff3cd"}; color: ${o.payment_status === "paid" ? "#0f5132" : o.payment_status === "failed" ? "#842029" : "#664d03"}`, "style")}${addAttribute(`updatePaymentStatus('${o.id}', this.value)`, "onchange")}><option value="pending"${addAttribute(o.payment_status === "pending", "selected")}>Pending</option><option value="paid"${addAttribute(o.payment_status === "paid", "selected")}>Paid</option><option value="failed"${addAttribute(o.payment_status === "failed", "selected")}>Failed</option><option value="refunded"${addAttribute(o.payment_status === "refunded", "selected")}>Refunded</option></select></td><td><select class="form-select form-select-sm border-0 fw-semibold"${addAttribute(`max-width: 130px; background-color: ${o.status === "completed" ? "#d1e7dd" : o.status === "cancelled" ? "#f8d7da" : o.status === "shipped" ? "#cff4fc" : "#eee"}; color: ${o.status === "completed" ? "#0f5132" : o.status === "cancelled" ? "#842029" : o.status === "shipped" ? "#087990" : "#333"}`, "style")}${addAttribute(`updateOrderStatus('${o.id}', this.value)`, "onchange")}><option value="pending"${addAttribute(o.status === "pending", "selected")}>Pending</option><option value="processing"${addAttribute(o.status === "processing", "selected")}>Processing</option><option value="shipped"${addAttribute(o.status === "shipped", "selected")}>Shipped</option><option value="completed"${addAttribute(o.status === "completed", "selected")}>Completed</option><option value="cancelled"${addAttribute(o.status === "cancelled", "selected")}>Cancelled</option></select></td></tr>`)}</tbody></table></div>`}</div><script>
    async function updatePaymentStatus(id, value) {
      try {
        const globalSupabase = window['supabase'];
        if (!globalSupabase) return;
        const { data: { session } } = await globalSupabase.auth.getSession();
        if (!session) return;

        const res = await fetch('/api/admin/orders', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + session.access_token
          },
          body: JSON.stringify({ id, payment_status: value })
        });
        const result = await res.json();
        if (!res.ok || !result.success) {
          alert(\`Error: \${result.error || 'Failed to update payment status'}\`);
        } else {
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while updating the order payment status.");
      }
    }

    async function updateOrderStatus(id, value) {
      try {
        const globalSupabase = window['supabase'];
        if (!globalSupabase) return;
        const { data: { session } } = await globalSupabase.auth.getSession();
        if (!session) return;

        const res = await fetch('/api/admin/orders', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + session.access_token
          },
          body: JSON.stringify({ id, status: value })
        });
        const result = await res.json();
        if (!res.ok || !result.success) {
          alert(\`Error: \${result.error || 'Failed to update order status'}\`);
        } else {
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while updating the order status.");
      }
    }

    // Modal / Lightbox for Payment Proof
    window.showPaymentProofModal = function(event, url) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const lightbox = document.getElementById('payment-proof-lightbox');
      const img = document.getElementById('payment-proof-img');
      if (lightbox && img) {
        img.src = url;
        lightbox.classList.remove('d-none');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closePaymentProofModal = function() {
      const lightbox = document.getElementById('payment-proof-lightbox');
      const img = document.getElementById('payment-proof-img');
      if (lightbox) {
        lightbox.classList.add('d-none');
        if (img) img.src = '';
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('DOMContentLoaded', () => {
      const lightbox = document.getElementById('payment-proof-lightbox');
      lightbox?.addEventListener('click', function(e) {
        if (e.target === this) {
          window.closePaymentProofModal();
        }
      });
    });
  <\/script><div id="payment-proof-lightbox" class="d-none position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="background: rgba(0, 0, 0, 0.85); z-index: 9999; backdrop-filter: blur(5px); transition: all 0.3s ease-in-out;"><div class="position-absolute top-0 end-0 m-4"><button onclick="closePaymentProofModal()" class="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center shadow-lg" style="width: 45px; height: 45px; border: none; font-size: 1.5rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="bi bi-x-lg text-dark"></i></button></div><div class="p-3 text-center" style="max-width: 90%; max-height: 90%;"><img id="payment-proof-img" src="" alt="Bukti Transfer" class="img-fluid rounded shadow-lg border border-white border-2" style="max-height: 80vh; object-fit: contain;"></div></div>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/admin/orders/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/admin/orders/index.astro";
var $$url = "/admin/orders";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/orders/index@_@astro
var page = () => orders_exports;
//#endregion
export { page };
