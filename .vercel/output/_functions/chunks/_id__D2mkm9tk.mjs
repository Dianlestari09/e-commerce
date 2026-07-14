import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute, w as createAstro, y as defineScriptVars } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
import { t as $$ShopLayout } from "./ShopLayout_BYcwvopJ.mjs";
//#region src/pages/product/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const { id } = Astro.params;
	let product = null;
	let productVariants = [];
	try {
		const { data: dbProduct, error } = await supabase.from("products").select(`
      *,
      categories (
        name
      )
    `).eq("id", id).single();
		if (dbProduct) product = {
			id: dbProduct.id,
			name: dbProduct.name,
			price: Number(dbProduct.price),
			sale_price: dbProduct.sale_price ? Number(dbProduct.sale_price) : null,
			description: dbProduct.description || "No description available.",
			sku: dbProduct.sku || "N/A",
			stock: dbProduct.stock || 0,
			images: dbProduct.images && dbProduct.images.length > 0 ? dbProduct.images : ["/shop/assets/img/product/product-default.webp"],
			category: dbProduct.categories?.name || "General",
			specs: dbProduct.specs || {},
			colors: dbProduct.colors || [],
			sizes: dbProduct.sizes || []
		};
		const { data: dbVariants } = await supabase.from("product_variants").select("*").eq("product_id", id);
		if (dbVariants) productVariants = dbVariants;
	} catch (e) {
		console.error("Failed to fetch product:", e);
	}
	if (!product && id) product = {
		"mock-1": {
			id: "mock-1",
			name: "Ergonomic Desk Lamp",
			price: 64,
			sale_price: null,
			description: "Adjustable LED desk lamp with 5 color modes and 10 brightness levels. Ideal for studying, reading, and working.",
			images: ["/shop/assets/img/product/product-5.webp"],
			category: "Premium Collection",
			stock: 12,
			sku: "LAMP-ERG-01",
			specs: {
				Color: "Matte Black",
				Material: "Aluminum",
				Power: "10W"
			},
			colors: [
				"Matte Black",
				"Silver Metallic",
				"Arctic White"
			],
			sizes: ["Standard"]
		},
		"mock-2": {
			id: "mock-2",
			name: "Ceramic Aroma Diffuser",
			price: 165,
			sale_price: 220,
			description: "Handcrafted ceramic ultrasonic diffuser. Disperses essential oils to elevate your space with aromatherapy.",
			images: ["/shop/assets/img/product/product-8.webp"],
			category: "Best Seller",
			stock: 5,
			sku: "DIFF-CER-02",
			specs: {
				Material: "Ceramic",
				Capacity: "100ml",
				LED: "7 Colors"
			},
			colors: [
				"Terracotta",
				"Slate Gray",
				"Stone White"
			],
			sizes: ["100ml", "200ml"]
		},
		"mock-3": {
			id: "mock-3",
			name: "Wireless Earbuds",
			price: 89,
			sale_price: null,
			description: "High-fidelity audio wireless earbuds with active noise cancellation and IPX7 sweatproof rating.",
			images: ["/shop/assets/img/product/product-11.webp"],
			category: "New Arrival",
			stock: 24,
			sku: "EAR-WRL-03",
			specs: {
				Bluetooth: "5.3",
				Battery: "Up to 30h",
				ANC: "Yes"
			},
			colors: ["Midnight Black", "Pearl White"],
			sizes: ["Standard"]
		},
		"mock-4": {
			id: "mock-4",
			name: "Minimalist Wall Clock",
			price: 199,
			sale_price: null,
			description: "Silent, non-ticking wooden wall clock. Minimalist Scandinavian style that matches any home decor.",
			images: ["/shop/assets/img/product/product-2.webp"],
			category: "Editor's Pick",
			stock: 3,
			sku: "CLK-MIN-04",
			specs: {
				Diameter: "30cm",
				Material: "Oak Wood",
				Movement: "Silent Quartz"
			},
			colors: ["Natural Oak", "Dark Walnut"],
			sizes: ["30cm", "40cm"]
		},
		"mock-5": {
			id: "mock-5",
			name: "Urban Tech Backpack",
			price: 89,
			sale_price: 120,
			description: "Water-resistant laptop backpack with built-in USB charging port. Spacious compartments for tech gear.",
			images: ["/shop/assets/img/product/product-1.webp"],
			category: "Accessories",
			stock: 18,
			sku: "BP-URB-05",
			specs: {
				Capacity: "25L",
				Fit: "15.6\" Laptop",
				Waterproof: "Yes"
			},
			colors: [
				"Carbon Black",
				"Steel Gray",
				"Navy Blue"
			],
			sizes: ["Standard"]
		},
		"mock-6": {
			id: "mock-6",
			name: "Precision Audio Hub",
			price: 219,
			sale_price: 299,
			description: "Multi-functional desktop DAC and headphone amplifier. Delivers crisp, studio-grade sound quality.",
			images: ["/shop/assets/img/product/product-6.webp"],
			category: "Electronics",
			stock: 4,
			sku: "DAC-HUB-06",
			specs: {
				Input: "USB/Coaxial/Opt",
				Output: "6.35mm/RCA",
				Res: "32-bit/384kHz"
			},
			colors: ["Anodized Black", "Silver Sand"],
			sizes: ["Standard"]
		}
	}[id];
	if (!product) return Astro.redirect("/404");
	return renderTemplate`${renderComponent($$result, "ShopLayout", $$ShopLayout, { "title": `${product.name} - ShopWise` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="main"><!-- Page Title --><div class="page-title light-background"><div class="container d-lg-flex justify-content-between align-items-center"><h1 class="mb-2 mb-lg-0">Product Details</h1><nav class="breadcrumbs"><ol><li><a href="/">Home</a></li><li class="current">Product Details</li></ol></nav></div></div><!-- Product Details Section --><section id="product-details" class="product-details section"><div class="container"><div class="row g-4"><!-- Product Gallery --><div class="col-lg-7"><div class="image-showcase"><div class="main-image-container">${product.sale_price && renderTemplate`<span class="discount-badge">-${Math.round((1 - product.price / product.sale_price) * 100)}%</span>`}<img id="main-product-image"${addAttribute(product.images[0], "src")}${addAttribute(product.images[0], "data-zoom")}${addAttribute(product.name, "alt")} class="img-fluid"><div class="image-zoom-container"></div></div><div class="thumb-strip mt-3">${product.images.map((img, index) => renderTemplate`<div${addAttribute(`thumb-cell thumbnail-item ${index === 0 ? "active" : ""}`, "class")}${addAttribute(img, "data-image")}><img${addAttribute(img, "src")}${addAttribute(`View ${index + 1}`, "alt")} class="img-fluid"></div>`)}</div></div></div><!-- Product Details Card --><div class="col-lg-5"><div class="product-detail-card"><div class="detail-header"><span class="type-badge">${product.category}</span><span class="stock-indicator"><i class="bi bi-circle-fill text-success"></i>${product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}</span></div><h1 class="product-heading">${product.name}</h1><div class="review-summary"><div class="stars-inline text-warning"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></div><span class="score-text">4.5</span><span class="divider-dot">·</span><a href="#" class="reviews-anchor">24 reviews</a><span class="divider-dot">·</span><span class="units-left">SKU: ${product.sku}</span></div><div class="pricing-area mt-3"><div class="price-row"><span class="price-now">$${product.price.toFixed(2)}</span>${product.sale_price && renderTemplate`<span class="price-was">$${product.sale_price.toFixed(2)}</span>`}</div>${product.sale_price && renderTemplate`<span class="save-tag text-success">Save $${(product.sale_price - product.price).toFixed(2)}</span>`}</div><div class="summary-text mt-3">${unescapeHTML(product.description)}</div><div class="separator my-3"></div>${Object.keys(product.specs).length > 0 && renderTemplate`<div class="specs-block mb-3"><h6 class="fw-bold">Specifications:</h6><table class="table table-sm table-borderless"><tbody>${Object.entries(product.specs).map(([key, val]) => renderTemplate`<tr><td class="text-muted" style="width: 120px;">${key}</td><td>${val}</td></tr>`)}</tbody></table></div>`}<!-- Color & Size Options --><div class="row g-3 mb-3">${product.colors && product.colors.length > 0 && renderTemplate`<div class="col-12"><label class="form-label fw-bold text-dark mb-1">Color: <span id="selected-color-label" class="fw-semibold text-secondary">Select Color</span></label><input type="hidden" id="color-select" required value=""><div class="d-flex flex-wrap gap-2" id="color-buttons-container">${product.colors.map((c) => renderTemplate`<button type="button" class="btn btn-outline-secondary py-2 px-3 fw-semibold text-dark variant-btn" data-type="color"${addAttribute(c, "data-value")} style="border: 1px solid #dee2e6; background-color: #f8f9fa; border-radius: 6px; font-size: 0.9rem; transition: all 0.2s;">${c}</button>`)}</div></div>`}${product.sizes && product.sizes.length > 0 && renderTemplate`<div class="col-12"><label class="form-label fw-bold text-dark mb-1">Size: <span id="selected-size-label" class="fw-semibold text-secondary">Select Size</span></label><input type="hidden" id="size-select" required value=""><div class="d-flex flex-wrap gap-2" id="size-buttons-container">${product.sizes.map((s) => renderTemplate`<button type="button" class="btn btn-outline-secondary py-2 px-3 fw-semibold text-dark variant-btn" data-type="size"${addAttribute(s, "data-value")} style="border: 1px solid #dee2e6; background-color: #f8f9fa; border-radius: 6px; font-size: 0.9rem; transition: all 0.2s;">${s}</button>`)}</div></div>`}</div><!-- Variant Stock Display Badge --><div id="variant-stock-display" class="mb-3 px-3 py-2 rounded d-none" style="font-size: 0.85rem; font-weight: 600;"></div><div class="action-row d-flex align-items-center gap-3"><div class="quantity-selector d-flex align-items-center border rounded"><button class="quantity-btn decrease btn py-1 px-3 border-0" id="decrease-qty-btn" type="button"><i class="bi bi-dash"></i></button><input type="number" id="qty-input" class="quantity-input text-center border-0" value="1" min="1"${addAttribute(product.stock || 10, "max")} style="width: 50px;"><button class="quantity-btn increase btn py-1 px-3 border-0" id="increase-qty-btn" type="button"><i class="bi bi-plus"></i></button></div><button class="btn btn-primary primary-action-btn flex-grow-1" id="add-to-cart-btn"${addAttribute(product.stock <= 0, "disabled")}><i class="bi bi-bag-plus"></i> Add to Cart</button></div><button class="btn btn-outline-primary w-100 mt-2 py-2 fw-semibold" id="buy-now-btn"${addAttribute(product.stock <= 0, "disabled")}><i class="bi bi-lightning-charge"></i> Buy Now</button></div></div></div></div></section></main><script>(function(){${defineScriptVars({
		product,
		variants: productVariants
	})}
    // Image thumbnail swapping
    const thumbs = document.querySelectorAll('.thumbnail-item');
    const mainImg = document.getElementById('main-product-image');
    
    thumbs.forEach(t => {
      t.addEventListener('click', function() {
        thumbs.forEach(cell => cell.classList.remove('active'));
        this.classList.add('active');
        const newImgUrl = this.getAttribute('data-image');
        mainImg.setAttribute('src', newImgUrl);
        mainImg.setAttribute('data-zoom', newImgUrl);
      });
    });

    // Quantity selectors are handled by the global main.js script
    const qtyInput = document.getElementById('qty-input');

    // Dynamic Variant Stock Checker
    const colorSelect = document.getElementById('color-select');
    const sizeSelect = document.getElementById('size-select');
    const stockDisplay = document.getElementById('variant-stock-display');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    // Handle variant button clicks & styles
    const variantButtons = document.querySelectorAll('.variant-btn');
    variantButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const value = this.getAttribute('data-value');

        if (type === 'color') {
          const siblings = document.querySelectorAll('.variant-btn[data-type="color"]');
          siblings.forEach(s => {
            s.classList.remove('btn-primary', 'text-white');
            s.classList.add('btn-outline-secondary', 'text-dark');
            s.style.borderColor = '#dee2e6';
            s.style.backgroundColor = '#f8f9fa';
          });
          this.classList.remove('btn-outline-secondary', 'text-dark');
          this.classList.add('btn-primary', 'text-white');
          this.style.borderColor = 'var(--bs-primary)';
          this.style.backgroundColor = 'var(--bs-primary)';
          
          if (colorSelect) colorSelect.value = value;
          const label = document.getElementById('selected-color-label');
          if (label) label.textContent = value;
        } else if (type === 'size') {
          const siblings = document.querySelectorAll('.variant-btn[data-type="size"]');
          siblings.forEach(s => {
            s.classList.remove('btn-primary', 'text-white');
            s.classList.add('btn-outline-secondary', 'text-dark');
            s.style.borderColor = '#dee2e6';
            s.style.backgroundColor = '#f8f9fa';
          });
          this.classList.remove('btn-outline-secondary', 'text-dark');
          this.classList.add('btn-primary', 'text-white');
          this.style.borderColor = 'var(--bs-primary)';
          this.style.backgroundColor = 'var(--bs-primary)';

          if (sizeSelect) sizeSelect.value = value;
          const label = document.getElementById('selected-size-label');
          if (label) label.textContent = value;
        }

        checkVariantStock();
      });
    });

    function checkVariantStock() {
      const hasVariants = Array.isArray(variants) && variants.length > 0;
      if (!hasVariants) {
        // Fallback for standard non-variant product
        if (product.stock > 0) {
          if (buyNowBtn) buyNowBtn.disabled = false;
          if (addToCartBtn) addToCartBtn.disabled = false;
        } else {
          if (buyNowBtn) buyNowBtn.disabled = true;
          if (addToCartBtn) addToCartBtn.disabled = true;
        }
        return;
      }

      const color = colorSelect ? colorSelect.value : '';
      const size = sizeSelect ? sizeSelect.value : '';

      // If either selection is missing, disable buy actions until they select
      if ((colorSelect && !color) || (sizeSelect && !size)) {
        stockDisplay.classList.add('d-none');
        stockDisplay.innerHTML = '';
        if (buyNowBtn) buyNowBtn.disabled = true;
        if (addToCartBtn) addToCartBtn.disabled = true;
        return;
      }

      const targetColor = color.trim().toLowerCase();
      const targetSize = size.trim().toLowerCase();
      const match = variants.find(v => 
        (v.color || '').trim().toLowerCase() === targetColor &&
        (v.size || '').trim().toLowerCase() === targetSize
      );

      stockDisplay.classList.remove('d-none');
      if (match) {
        const stockQty = match.stock;
        qtyInput.setAttribute('max', stockQty);
        
        if (parseInt(qtyInput.value) > stockQty) {
          qtyInput.value = stockQty > 0 ? stockQty : 1;
        }

        if (stockQty > 0) {
          stockDisplay.className = 'mb-3 px-3 py-2 rounded bg-success-subtle text-success';
          stockDisplay.innerHTML = \`<i class="bi bi-check-circle-fill me-1"></i> Stock Tersedia: \${stockQty} unit\`;
          if (buyNowBtn) buyNowBtn.disabled = false;
          if (addToCartBtn) addToCartBtn.disabled = false;
        } else {
          stockDisplay.className = 'mb-3 px-3 py-2 rounded bg-danger-subtle text-danger';
          stockDisplay.innerHTML = \`<i class="bi bi-x-circle-fill me-1"></i> Stok Habis untuk varian ini\`;
          if (buyNowBtn) buyNowBtn.disabled = true;
          if (addToCartBtn) addToCartBtn.disabled = true;
        }
      } else {
        stockDisplay.className = 'mb-3 px-3 py-2 rounded bg-danger-subtle text-danger';
        stockDisplay.innerHTML = \`<i class="bi bi-exclamation-triangle-fill me-1"></i> Kombinasi varian tidak tersedia\`;
        if (buyNowBtn) buyNowBtn.disabled = true;
        if (addToCartBtn) addToCartBtn.disabled = true;
      }
    }

    if (colorSelect) colorSelect.addEventListener('change', checkVariantStock);
    if (sizeSelect) sizeSelect.addEventListener('change', checkVariantStock);

    // Initial trigger
    checkVariantStock();

    // Add to Cart handler
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const color = colorSelect ? colorSelect.value : null;
        const size = sizeSelect ? sizeSelect.value : null;

        if (colorSelect && !color) {
          alert('Mohon pilih warna terlebih dahulu!');
          colorSelect.focus();
          return;
        }
        if (sizeSelect && !size) {
          alert('Mohon pilih ukuran terlebih dahulu!');
          sizeSelect.focus();
          return;
        }

        const qty = parseInt(qtyInput.value) || 1;
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: qty,
          color: color,
          size: size
        });
        
        // Visual feedback
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Added!';
        addToCartBtn.classList.remove('btn-primary');
        addToCartBtn.classList.add('btn-success');
        
        setTimeout(() => {
          addToCartBtn.innerHTML = originalText;
          addToCartBtn.classList.remove('btn-success');
          addToCartBtn.classList.add('btn-primary');
        }, 1500);
      });
    }

    // Buy Now handler: add to cart and redirect to checkout immediately
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        const color = colorSelect ? colorSelect.value : null;
        const size = sizeSelect ? sizeSelect.value : null;

        if (colorSelect && !color) {
          alert('Mohon pilih warna terlebih dahulu!');
          colorSelect.focus();
          return;
        }
        if (sizeSelect && !size) {
          alert('Mohon pilih ukuran terlebih dahulu!');
          sizeSelect.focus();
          return;
        }

        const qty = parseInt(qtyInput.value) || 1;
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: qty,
          color: color,
          size: size
        });
        // Redirect to checkout immediately
        window.location.href = '/checkout';
      });
    }
  })();<\/script>` })}`;
}, "D:/Kuliah/Magang/e-commerce/src/pages/product/[id].astro", void 0);
var $$file = "D:/Kuliah/Magang/e-commerce/src/pages/product/[id].astro";
var $$url = "/product/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/product/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
