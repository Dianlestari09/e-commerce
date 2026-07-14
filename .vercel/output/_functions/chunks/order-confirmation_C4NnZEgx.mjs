import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute, w as createAstro, y as defineScriptVars } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/order-confirmation.astro
var order_confirmation_exports = /* @__PURE__ */ __exportAll({
	default: () => $$OrderConfirmation,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$OrderConfirmation = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$OrderConfirmation;
	const orderId = new URL(Astro2.request.url).searchParams.get("id");
	let order = null;
	const supabaseAdmin = createClient("https://ykdzmonuxadattbfaxdw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZHptb251eGFkYXR0YmZheGR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM5MjAzOCwiZXhwIjoyMDk4OTY4MDM4fQ.9Tb5WAbg6hSjLSCb6-xIqwMFoTmkJHerNVs2qHTAhr0");
	if (orderId) try {
		const { data: dbOrder } = await supabaseAdmin.from("orders").select("*").eq("id", orderId).single();
		if (dbOrder) order = dbOrder;
	} catch (e) {
		console.error("Failed to fetch order details:", e);
	}
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, { "title": "Order Confirmation - ShopWise" }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="main"><div class="container py-5 my-5 text-center"><div class="row justify-content-center"><div class="col-md-8 col-lg-6"><div class="card border-0 shadow-lg p-5 rounded-4 bg-white"><div class="mb-4"><i class="bi bi-check-circle-fill text-success" style="font-size: 5rem;"></i></div><h2 class="fw-bold mb-2">Order Placed Successfully!</h2><p class="text-muted mb-4">Thank you for shopping with us. Your order has been registered in our database.</p>${order ? renderTemplate`<div><!-- Receipt Card --><div class="order-details-card border text-start p-4 rounded-3 mb-4 bg-light"><h5 class="fw-bold mb-3 border-bottom pb-2 text-dark">Receipt Detail</h5><div class="mb-2"><span class="text-muted small">Order ID:</span><span class="fw-semibold font-monospace ms-1 small text-dark">${order.id}</span></div><div class="mb-2"><span class="text-muted small">Total Amount:</span><span class="fw-bold text-primary ms-1">$${Number(order.total_amount).toFixed(2)}</span></div><div class="mb-2"><span class="text-muted small">Delivery Address &amp; Info:</span><p class="mb-0 mt-1 fw-semibold text-dark small">${order.shipping_address}</p></div><div class="mb-2"><span class="text-muted small">Payment Method:</span><span class="fw-semibold text-uppercase ms-1 small text-dark">${order.payment_method.replace("_", " ")}</span></div><div class="mb-0"><span class="text-muted small">Order Status:</span><span${addAttribute(`badge ms-1 text-uppercase ${order.status === "completed" ? "bg-success" : order.status === "shipped" ? "bg-info" : order.status === "processing" ? "bg-warning text-dark" : "bg-secondary"}`, "class")}>${order.status}</span></div></div><!-- Bank Transfer Payment Confirmation Box -->${order.payment_method === "bank_transfer" && renderTemplate`<div class="card border border-primary border-opacity-50 shadow-sm p-4 rounded-3 mb-4 text-start bg-light"><h5 class="fw-bold mb-3 text-dark"><i class="bi bi-bank me-2 text-primary"></i>Payment Confirmation</h5><p class="text-muted small">Please transfer the exact amount of <strong>$${Number(order.total_amount).toFixed(2)}</strong> to the following bank account:</p><div class="p-3 bg-white border rounded mb-3"><div class="small mb-1 text-muted">Bank Name: <strong class="text-dark">Bank Central Asia (BCA)</strong></div><div class="small mb-1 text-muted">Account Number: <strong class="text-dark font-monospace">829-0123-456</strong></div><div class="small mb-0 text-muted">Account Holder: <strong class="text-dark">PT ShopWise International</strong></div></div>${order.payment_proof_url ? renderTemplate`<div class="alert alert-success d-flex align-items-center gap-2 mb-0" role="alert"><i class="bi bi-check-circle-fill"></i><div><strong>Bukti pembayaran telah diunggah!</strong> Admin kami akan segera memverifikasi pembayaran Anda.<div class="mt-2"><a href="#"${addAttribute(`showPaymentProofModal(event, '${order.payment_proof_url}')`, "onclick")} class="btn btn-sm btn-outline-success">View Uploaded Image</a></div></div></div>` : renderTemplate`<form id="proof-upload-form"><div class="mb-3"><label for="proof-file" class="form-label small fw-semibold text-dark">Upload Screenshot / Bukti Transfer (PNG, JPG) *</label><input type="file" id="proof-file" class="form-control form-control-sm" accept="image/*" required></div><div class="alert alert-danger d-none mb-3" id="upload-error"></div><button type="submit" class="btn btn-sm btn-primary fw-bold" id="upload-btn"><i class="bi bi-cloud-upload me-1"></i> Upload Bukti</button></form>`}</div>`}<!-- Package Tracking Timeline --><div class="card border border-light shadow-sm p-4 rounded-3 mb-4 text-start"><h6 class="fw-bold mb-4 text-dark"><i class="bi bi-compass me-2 text-primary"></i>Package Delivery Status</h6><div class="position-relative py-2"><div class="d-flex justify-content-between position-relative"><!-- Base Line --><div class="position-absolute top-50 start-0 translate-middle-y w-100 bg-secondary bg-opacity-25" style="height: 4px; z-index: 1;"></div><!-- Progress Line --><div class="position-absolute top-50 start-0 translate-middle-y bg-primary"${addAttribute(`height: 4px; width: ${order.status === "pending" ? "0%" : order.status === "processing" ? "33%" : order.status === "shipped" ? "66%" : "100%"}; z-index: 1; transition: width 0.5s ease;`, "style")}></div><!-- Step 1: Pending --><div class="text-center position-relative" style="z-index: 2; width: 25%;"><div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm" style="width: 36px; height: 36px;"><i class="bi bi-clipboard-check"></i></div><span class="small fw-semibold text-dark" style="font-size: 0.75rem;">Placed</span></div><!-- Step 2: Processing --><div class="text-center position-relative" style="z-index: 2; width: 25%;"><div${addAttribute(`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm ${[
		"processing",
		"shipped",
		"completed"
	].includes(order.status) ? "bg-primary text-white" : "bg-light text-muted border border-secondary border-opacity-25"}`, "class")} style="width: 36px; height: 36px;"><i class="bi bi-box-seam"></i></div><span class="small fw-semibold text-dark" style="font-size: 0.75rem;">Packing</span></div><!-- Step 3: Shipped --><div class="text-center position-relative" style="z-index: 2; width: 25%;"><div${addAttribute(`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm ${["shipped", "completed"].includes(order.status) ? "bg-primary text-white" : "bg-light text-muted border border-secondary border-opacity-25"}`, "class")} style="width: 36px; height: 36px;"><i class="bi bi-truck"></i></div><span class="small fw-semibold text-dark" style="font-size: 0.75rem;">Shipped</span></div><!-- Step 4: Completed --><div class="text-center position-relative" style="z-index: 2; width: 25%;"><div${addAttribute(`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm ${order.status === "completed" ? "bg-primary text-white" : "bg-light text-muted border border-secondary border-opacity-25"}`, "class")} style="width: 36px; height: 36px;"><i class="bi bi-house-check"></i></div><span class="small fw-semibold text-dark" style="font-size: 0.75rem;">Delivered</span></div></div></div><!-- Shipping Tracker Details -->${["shipped", "completed"].includes(order.status) && renderTemplate`<div class="mt-4 p-3 bg-light rounded border border-info border-opacity-25"><div class="fw-bold text-info mb-1 small"><i class="bi bi-info-circle me-1"></i> Shipment tracking details:</div><div class="small mb-1">Courier: <strong class="text-dark">J&T Express (Reguler)</strong></div><div class="small mb-1">Tracking Number: <strong class="font-monospace text-primary">JT9900881122</strong></div><div class="small text-muted mt-1">${order.status === "completed" ? "Package has been received by customer." : "Package is on delivery. Estimated delivery within 1-2 business days."}</div></div>`}</div></div>` : renderTemplate`<div class="alert alert-warning mb-4 py-3"><i class="bi bi-exclamation-triangle me-2"></i> Loading order details... (If this persists, the order with ID "${orderId}" was not found or database sync is pending).</div>`}<div class="d-flex flex-column gap-2 mt-4"><a href="/category" class="btn btn-primary py-3 fw-bold shadow-sm rounded-3">Continue Shopping</a><a href="/" class="btn btn-outline-secondary py-3 fw-bold rounded-3">Back to Home</a></div></div></div></div></div></main><script>(function(){${defineScriptVars({ orderId })}
    const form = document.getElementById('proof-upload-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('proof-file');
        const uploadBtn = document.getElementById('upload-btn');
        const errorAlert = document.getElementById('upload-error');

        if (!fileInput.files || fileInput.files.length === 0) {
          alert('Mohon pilih file terlebih dahulu!');
          return;
        }

        const file = fileInput.files[0];
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Uploading...';
        errorAlert.classList.add('d-none');

        // Convert file to base64
        const reader = new FileReader();
        reader.onload = async function() {
          const base64String = reader.result;
          
          try {
            const res = await fetch('/api/payment-confirm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderId,
                fileName: file.name,
                fileBase64: base64String,
                fileType: file.type
              })
            });

            const result = await res.json();
            if (res.ok && result.success) {
              window.location.reload();
            } else {
              errorAlert.textContent = result.error || 'Failed to upload payment proof.';
              errorAlert.classList.remove('d-none');
              uploadBtn.disabled = false;
              uploadBtn.innerHTML = '<i class="bi bi-cloud-upload me-1"></i> Upload Bukti';
            }
          } catch (err) {
            console.error(err);
            errorAlert.textContent = 'An error occurred during file upload.';
            errorAlert.classList.remove('d-none');
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="bi bi-cloud-upload me-1"></i> Upload Bukti';
          }
        };
        reader.onerror = function() {
          errorAlert.textContent = 'Failed to read file.';
          errorAlert.classList.remove('d-none');
          uploadBtn.disabled = false;
          uploadBtn.innerHTML = '<i class="bi bi-cloud-upload me-1"></i> Upload Bukti';
        };
        reader.readAsDataURL(file);
      });
    }
  })();<\/script>` })}
export const prerender = false;`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/order-confirmation.astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/order-confirmation.astro";
var $$url = "/order-confirmation";
//#endregion
//#region \0virtual:astro:page:src/pages/order-confirmation@_@astro
var page = () => order_confirmation_exports;
//#endregion
export { page };
