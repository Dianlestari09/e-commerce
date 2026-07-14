import { T as createComponent, _ as renderHead, f as renderTemplate, l as renderSlot, n as renderScript, v as addAttribute, w as createAstro } from "./server_Dt_BWqqO.mjs";
import "./compiler_kmuGzyek.mjs";
import { t as supabase } from "./supabase_CciFyEBF.mjs";
//#region src/layouts/ShopLayout.astro
createAstro("https://astro.build");
var $$ShopLayout = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShopLayout;
	const { title = "ShopWise - E-Commerce", description = "ShopWise Bootstrap E-Commerce Template" } = Astro.props;
	let layoutSettings = {
		utility_promo_text: "Free delivery on orders over $75",
		footer_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh vehicula, facilisis magna ut, consectetur lorem.",
		contact_address: "123 Fashion Street, New York, NY 10001",
		contact_phone: "+1 (555) 123-4567",
		contact_email: "hello@example.com",
		newsletter_title: "Join Our Newsletter",
		newsletter_desc: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals."
	};
	try {
		const { data: dbLayout } = await supabase.from("site_settings").select("*").eq("key", "layout").maybeSingle();
		if (dbLayout && dbLayout.value) layoutSettings = {
			...layoutSettings,
			...dbLayout.value
		};
	} catch (layoutError) {
		console.warn("Failed to fetch layout settings from Supabase, using defaults:", layoutError);
	}
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="keywords" content=""><!-- Favicons --><link href="/shop/assets/img/favicon.png" rel="icon"><link href="/shop/assets/img/apple-touch-icon.png" rel="apple-touch-icon"><!-- Fonts --><link href="https://fonts.googleapis.com" rel="preconnect"><link href="https://fonts.gstatic.com" rel="preconnect" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- Vendor CSS Files --><link href="/shop/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"><link href="/shop/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"><link href="/shop/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet"><link href="/shop/assets/vendor/drift-zoom/drift-basic.css" rel="stylesheet"><link href="/shop/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet"><!-- Main CSS File --><link href="/shop/assets/css/main.css" rel="stylesheet">${renderHead($$result)}</head><body class="index-page"><header id="header" class="header position-relative"><!-- Top Utility Bar --><div class="utility-bar"><div class="container-fluid container-xl"><div class="row align-items-center"><div class="col-auto"><div class="utility-links"><a href="#" class="utility-link"><i class="bi bi-pin-map"></i><span>Find a Store</span></a><span class="utility-divider"></span><a href="#" class="utility-link"><i class="bi bi-headset"></i><span>Support</span></a></div></div><div class="col text-end"><span class="promo-text">${layoutSettings.utility_promo_text}</span></div></div></div></div><!-- Main Header --><div class="main-bar"><div class="container-fluid container-xl"><div class="row align-items-center gy-2"><!-- Logo --><div class="col-auto"><a href="/" class="logo d-flex align-items-center"><i class="bi bi-cart2"></i><h1 class="sitename">ShopWise</h1></a></div><!-- Search --><div class="col d-none d-lg-block"><form class="search-bar" action="/search" method="GET"><i class="bi bi-search search-icon"></i><input type="text" name="q" class="search-field" placeholder="Search for products, brands, and more..."><button class="search-submit" type="submit">Search</button></form></div><!-- Actions --><div class="col-auto ms-auto ms-lg-0"><div class="action-group d-flex align-items-center"><!-- Mobile Search Toggle --><button class="action-btn mobile-search-toggle d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#mobileSearch" aria-expanded="false" aria-controls="mobileSearch"><i class="bi bi-search"></i></button><!-- Account --><div class="dropdown"><button class="action-btn" data-bs-toggle="dropdown" aria-label="Account"><i class="bi bi-person-circle"></i></button><div class="dropdown-menu account-flyout"><div class="flyout-header" id="auth-header"><h6>Welcome Back</h6><p>Log in for a personalized experience</p></div><div class="flyout-actions" id="auth-actions"><a href="/login" class="btn btn-primary-action">Log In</a><a href="/register" class="btn btn-outline-action">Register</a></div><div class="flyout-links"><a href="/track-order"><i class="bi bi-receipt"></i><span>Order History</span></a><a href="/addresses"><i class="bi bi-geo-alt"></i><span>My Addresses</span></a><a href="/admin" id="admin-panel-link" class="d-none"><i class="bi bi-shield-lock"></i><span>Admin Panel</span></a></div></div></div><!-- Wishlist Dropdown --><div class="dropdown d-none d-md-block"><button class="action-btn" data-bs-toggle="dropdown" aria-label="Wishlist"><i class="bi bi-heart"></i><span class="badge-count" id="wishlist-badge-count">0</span></button><div class="dropdown-menu cart-flyout" style="right: 0; left: auto; min-width: 320px;"><div class="flyout-top"><h6>Your Wishlist</h6><span class="items-label" id="wishlist-flyout-qty">0 items</span></div><div class="flyout-items" id="wishlist-flyout-items"><p class="text-center p-3 text-muted">Your wishlist is empty</p></div><div class="flyout-bottom border-top p-3 text-center"><button class="btn btn-outline-primary btn-sm w-100" id="clear-wishlist-btn" type="button">Clear Wishlist</button></div></div></div><!-- Cart --><div class="dropdown"><button class="action-btn" data-bs-toggle="dropdown" aria-label="Cart"><i class="bi bi-bag"></i><span class="badge-count" id="cart-badge-count">0</span></button><div class="dropdown-menu cart-flyout"><div class="flyout-top"><h6>Your Bag</h6><span class="items-label" id="cart-flyout-qty">0 items</span></div><div class="flyout-items" id="cart-flyout-items"><p class="text-center p-3 text-muted">Your cart is empty</p></div><div class="flyout-bottom"><div class="subtotal-row"><span>Subtotal</span><span class="subtotal-value" id="cart-flyout-subtotal">$0.00</span></div><a href="/checkout" class="btn btn-proceed">Proceed to Checkout</a><a href="/cart" class="link-viewbag">View full bag →</a></div></div></div><!-- Mobile Navigation Toggle --><i class="mobile-nav-toggle d-xl-none bi bi-list me-0"></i></div></div></div></div></div><!-- Navigation --><div class="nav-strip"><div class="container-fluid container-xl position-relative"><nav id="navmenu" class="navmenu"><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/category">Category</a></li><li><a href="/articles">Artikel</a></li><li><a href="/cart">Cart</a></li><li><a href="/checkout">Checkout</a></li><li><a href="/track-order"><i class="bi bi-truck me-1"></i>Track Order</a></li></ul></nav></div></div><!-- Mobile Search Form --><div class="collapse" id="mobileSearch"><div class="container-fluid container-xl"><form class="mobile-search" action="/search" method="GET"><div class="mobile-search-inner"><i class="bi bi-search"></i><input type="text" name="q" class="form-control" placeholder="What are you looking for?"></div></form></div></div></header>${renderSlot($$result, $$slots["default"])}<footer id="footer" class="footer"><div class="footer-newsletter"><div class="container"><div class="row justify-content-center"><div class="col-lg-8 text-center"><h2>${layoutSettings.newsletter_title}</h2><p>${layoutSettings.newsletter_desc}</p><form action="#" method="post" class="php-email-form"><div class="newsletter-form d-flex"><input type="email" name="email" placeholder="Your email address" required=""><button type="submit">Subscribe</button></div><div class="loading">Loading</div><div class="error-message"></div><div class="sent-message">Your subscription request has been sent. Thank you!</div></form></div></div></div></div><div class="footer-main"><div class="container"><div class="row gy-4"><div class="col-lg-3 col-md-6 col-sm-12"><div class="footer-widget footer-about"><a href="/" class="logo"><span class="sitename">ShopWise</span></a><p>${layoutSettings.footer_desc}</p><div class="footer-contact mt-4"><div class="contact-item"><i class="bi bi-geo-alt"></i><span>${layoutSettings.contact_address}</span></div><div class="contact-item"><i class="bi bi-telephone"></i><span>${layoutSettings.contact_phone}</span></div><div class="contact-item"><i class="bi bi-envelope"></i><span>${layoutSettings.contact_email}</span></div></div></div></div><div class="col-lg-2 col-md-6 col-sm-6"><div class="footer-widget"><h4>Shop</h4><ul class="footer-links"><li><a href="/category">New Arrivals</a></li><li><a href="/category">Bestsellers</a></li><li><a href="/category">Women's Clothing</a></li><li><a href="/category">Men's Clothing</a></li><li><a href="/category">Accessories</a></li></ul></div></div><div class="col-lg-2 col-md-6 col-sm-6"><div class="footer-widget"><h4>Support</h4><ul class="footer-links"><li><a href="#">Help Center</a></li><li><a href="/account">Order Status</a></li><li><a href="#">Shipping Info</a></li><li><a href="#">Returns &amp; Exchanges</a></li><li><a href="/contact">Contact Us</a></li></ul></div></div><div class="col-lg-2 col-md-6 col-sm-6"><div class="footer-widget"><h4>Company</h4><ul class="footer-links"><li><a href="/about">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Affiliates</a></li></ul></div></div><div class="col-lg-3 col-md-6 col-sm-6"><div class="footer-widget"><h4>Download Our App</h4><p>Shop on the go with our mobile app</p><div class="app-buttons"><a href="#" class="app-btn"><i class="bi bi-apple"></i><span>App Store</span></a><a href="#" class="app-btn"><i class="bi bi-google-play"></i><span>Google Play</span></a></div></div></div></div></div></div><div class="footer-bottom"><div class="container"><div class="payment-methods d-flex align-items-center justify-content-center"><span>We Accept:</span><div class="payment-icons"><i class="bi bi-credit-card" aria-label="Credit Card"></i><i class="bi bi-paypal" aria-label="PayPal"></i><i class="bi bi-apple" aria-label="Apple Pay"></i><i class="bi bi-google" aria-label="Google Pay"></i><i class="bi bi-shop" aria-label="Shop Pay"></i><i class="bi bi-cash" aria-label="Cash on Delivery"></i></div></div><div class="legal-links"><a href="#">Terms of Service</a><a href="#">Privacy Policy</a><a href="#">Cookies Settings</a></div><div class="copyright text-center"><p>© <span>Copyright</span> <strong class="sitename">ShopWise</strong>. All Rights Reserved.</p></div></div></div></footer><!-- Global Quick View Variant Modal --><div class="modal fade" id="quick-view-modal" tabindex="-1" aria-labelledby="quickViewModalLabel" aria-hidden="true" style="z-index: 1060;"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden"><div class="modal-body p-0"><button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1070;"></button><div class="row g-0"><!-- Product Image Column --><div class="col-md-6 bg-light d-flex align-items-center justify-content-center p-4 position-relative" style="min-height: 350px;"><img id="qv-product-image" src="" alt="Product Image" class="img-fluid rounded-3 object-fit-cover" style="max-height: 300px;"><div id="qv-loading-spinner" class="position-absolute top-50 start-50 translate-middle d-none"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div></div><!-- Product Info & Selectors Column --><div class="col-md-6 p-4"><span id="qv-product-category" class="badge bg-secondary-subtle text-secondary-emphasis mb-2" style="font-size: 0.75rem;">Category</span><h4 id="qv-product-name" class="fw-bold mb-2">Product Name</h4><div class="d-flex align-items-center gap-2 mb-3"><span id="qv-product-price" class="fs-4 fw-bold text-primary">$0.00</span><span id="qv-product-was-price" class="text-decoration-line-through text-muted small d-none">$0.00</span></div><p id="qv-product-description" class="text-muted small mb-3" style="max-height: 80px; overflow-y: auto;">Description...</p><div class="separator my-3" style="border-top: 1px solid #eee;"></div><!-- Color Selector --><div id="qv-color-section" class="mb-3 d-none"><label class="form-label fw-bold text-dark small mb-2">Color: <span id="qv-selected-color" class="fw-semibold text-secondary">Select Color</span></label><div class="d-flex flex-wrap gap-2" id="qv-color-container"></div></div><!-- Size Selector --><div id="qv-size-section" class="mb-3 d-none"><label class="form-label fw-bold text-dark small mb-2">Size: <span id="qv-selected-size" class="fw-semibold text-secondary">Select Size</span></label><div class="d-flex flex-wrap gap-2" id="qv-size-container"></div></div><!-- Stock Alert/Badge --><div id="qv-stock-display" class="mb-3 px-3 py-2 rounded d-none" style="font-size: 0.825rem; font-weight: 600;"></div><!-- Actions --><div class="d-flex align-items-center gap-3 mt-4"><div class="quantity-selector d-flex align-items-center border rounded"><button class="btn py-1 px-2 border-0" id="qv-dec-btn" type="button"><i class="bi bi-dash"></i></button><input type="number" id="qv-qty-input" class="text-center border-0" value="1" min="1" max="99" style="width: 40px; font-size: 0.9rem; outline: none; background: transparent;"><button class="btn py-1 px-2 border-0" id="qv-inc-btn" type="button"><i class="bi bi-plus"></i></button></div><button class="btn btn-primary fw-semibold flex-grow-1" id="qv-add-btn"><i class="bi bi-bag-plus me-1"></i> Add to Cart</button></div></div></div></div></div></div></div><!-- Lightbox Overlay for Payment Proof --><div id="payment-proof-lightbox" class="d-none position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="background: rgba(0, 0, 0, 0.85); z-index: 9999; backdrop-filter: blur(5px); transition: all 0.3s ease-in-out;"><div class="position-absolute top-0 end-0 m-4"><button onclick="closePaymentProofModal()" class="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center shadow-lg" style="width: 45px; height: 45px; border: none; font-size: 1.5rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="bi bi-x-lg text-dark"></i></button></div><div class="p-3 text-center" style="max-width: 90%; max-height: 90%;"><img id="payment-proof-img" src="" alt="Bukti Transfer" class="img-fluid rounded shadow-lg border border-white border-2" style="max-height: 80vh; object-fit: contain;"></div></div><!-- Toast Notification Container --><div class="position-fixed top-0 end-0 p-3" style="z-index: 9999;"><div id="shop-toast" class="toast align-items-center text-white bg-dark border-0 rounded-3 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true"><div class="d-flex"><div class="toast-body d-flex align-items-center gap-2"><i class="bi bi-check-circle-fill text-success" id="toast-icon"></i><span id="toast-message">Item added to cart!</span></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div></div><!-- Scroll Top --><a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a><!-- Vendor JS Files --><script src="/shop/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"><\/script><script src="/shop/assets/vendor/swiper/swiper-bundle.min.js"><\/script><script src="/shop/assets/vendor/drift-zoom/Drift.min.js"><\/script><script src="/shop/assets/vendor/glightbox/js/glightbox.min.js"><\/script><script src="/shop/assets/vendor/purecounter/purecounter_vanilla.js"><\/script><!-- Main JS File --><script src="/shop/assets/js/main.js"><\/script><!-- Client-side Cart State Script --><script>
    // Initialize or load cart from localStorage
    function updateCartUI() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Update badges
      const badges = document.querySelectorAll('#cart-badge-count');
      badges.forEach(b => b.textContent = totalItems);
      
      const flyoutQty = document.getElementById('cart-flyout-qty');
      if (flyoutQty) flyoutQty.textContent = \`\${totalItems} item\${totalItems !== 1 ? 's' : ''}\`;
      
      const flyoutSubtotal = document.getElementById('cart-flyout-subtotal');
      if (flyoutSubtotal) flyoutSubtotal.textContent = \`$\${subtotal.toFixed(2)}\`;
      
      const flyoutContainer = document.getElementById('cart-flyout-items');
      if (flyoutContainer) {
        if (cart.length === 0) {
          flyoutContainer.innerHTML = '<p class="text-center p-3 text-muted">Your cart is empty</p>';
        } else {
          flyoutContainer.innerHTML = cart.map((item, idx) => \`
            <div class="flyout-item">
              <div class="flyout-item-thumb">
                <img src="\${item.image || '/shop/assets/img/product/product-default.webp'}" alt="\${item.name}" class="img-fluid">
              </div>
              <div class="flyout-item-details">
                <h6>\${item.name}</h6>
                \${(item.color || item.size) ? \`<p class="text-muted mb-1" style="font-size: 0.72rem; line-height: 1.1;">\${[item.color, item.size].filter(Boolean).join(' / ')}</p>\` : ''}
                <div class="item-bottom">
                  <span class="item-price">$\${item.price.toFixed(2)}</span>
                  <span class="item-qty">x\${item.quantity}</span>
                </div>
              </div>
              <button class="item-dismiss" aria-label="Remove item" onclick="removeCartItem(\${idx})">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          \`).join('');
        }
      }
    }

    window.removeCartItem = function(index) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      // Dispatch event for components that listen
      window.dispatchEvent(new Event('cart-updated'));
    }

    window.showToast = function(message, isSuccess = true) {
      const toastEl = document.getElementById('shop-toast');
      const toastMsg = document.getElementById('toast-message');
      const toastIcon = document.getElementById('toast-icon');
      if (toastMsg) toastMsg.textContent = message;
      if (toastIcon) {
        toastIcon.className = isSuccess ? 'bi bi-check-circle-fill text-success' : 'bi bi-exclamation-triangle-fill text-danger';
      }
      if (toastEl) {
        const bootstrap = window.bootstrap;
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
      }
    }

    window.addToCart = function(product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find(item => 
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
      );
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity || 1,
          color: product.color || null,
          size: product.size || null
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      window.dispatchEvent(new Event('cart-updated'));
      window.showToast(\`"\${product.name}" added to cart!\`);
    }

    // Wishlist script
    function updateWishlistUI() {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const totalItems = wishlist.length;
      
      const badge = document.getElementById('wishlist-badge-count');
      if (badge) badge.textContent = totalItems;
      
      const flyoutQty = document.getElementById('wishlist-flyout-qty');
      if (flyoutQty) flyoutQty.textContent = \`\${totalItems} item\${totalItems !== 1 ? 's' : ''}\`;
      
      const flyoutContainer = document.getElementById('wishlist-flyout-items');
      if (flyoutContainer) {
        if (wishlist.length === 0) {
          flyoutContainer.innerHTML = '<p class="text-center p-3 text-muted">Your wishlist is empty</p>';
        } else {
          flyoutContainer.innerHTML = wishlist.map((item, idx) => \`
            <div class="flyout-item">
              <div class="flyout-item-thumb">
                <img src="\${item.image || '/shop/assets/img/product/product-default.webp'}" alt="\${item.name}" class="img-fluid">
              </div>
              <div class="flyout-item-details">
                <h6>\${item.name}</h6>
                <div class="item-bottom">
                  <span class="item-price">$\${item.price.toFixed(2)}</span>
                  <button class="btn btn-sm btn-primary py-0 px-2 ms-2" onclick="wishlistToCart('\${item.id}', '\${item.name.replace(/'/g, "\\\\'")}', \${item.price}, '\${item.image}', \${idx})" style="font-size:0.75rem;">
                    + <i class="bi bi-bag"></i>
                  </button>
                </div>
              </div>
              <button class="item-dismiss" aria-label="Remove item" onclick="removeWishlistItem(\${idx})">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          \`).join('');
        }
      }
      
      // Update heart icon states across the page
      const heartBtns = document.querySelectorAll('[aria-label="Add to wishlist"]');
      heartBtns.forEach(btn => {
        const prodCard = btn.closest('.product-card');
        if (prodCard) {
          const viewLink = prodCard.querySelector('a[href^="/product/"]');
          if (viewLink) {
            const urlParts = viewLink.getAttribute('href').split('/');
            const id = urlParts[urlParts.length - 1];
            const inWishlist = wishlist.some(item => item.id === id);
            const icon = btn.querySelector('i');
            if (icon) {
              if (inWishlist) {
                icon.className = 'bi bi-heart-fill text-danger';
              } else {
                icon.className = 'bi bi-heart';
              }
            }
          }
        }
      });
    }

    window.toggleWishlist = function(product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const index = wishlist.findIndex(item => item.id === product.id);
      
      if (index > -1) {
        wishlist.splice(index, 1);
        window.showToast(\`"\${product.name}" removed from wishlist!\`, false);
      } else {
        wishlist.push(product);
        window.showToast(\`"\${product.name}" added to wishlist!\`);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlistUI();
      window.dispatchEvent(new Event('wishlist-updated'));
    }

    window.removeWishlistItem = function(index) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const removed = wishlist.splice(index, 1)[0];
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlistUI();
      window.dispatchEvent(new Event('wishlist-updated'));
      if (removed) {
        window.showToast(\`"\${removed.name}" removed from wishlist!\`, false);
      }
    }

    window.wishlistToCart = function(id, name, price, image, idx) {
      window.addToCart({ id, name, price, image });
      window.removeWishlistItem(idx);
    }

    // Global Quick View Modal variables and functions
    window.qvSelectedColor = '';
    window.qvSelectedSize = '';
    window.qvVariants = [];
    window.qvProduct = null;
    window.quickViewModalObj = null;

    window.handleQuickAdd = function(event, id, name, price, image, hasVariants) {
      if (hasVariants) {
        event.preventDefault();
        event.stopPropagation();
        window.showQuickAdd(id);
      } else {
        window.addToCart({ id, name, price: Number(price), image, quantity: 1 });
      }
    };

    window.showQuickAdd = async function(productId) {
      // Lazy init bootstrap modal if not done yet
      if (!window.quickViewModalObj && window.bootstrap) {
        const modalEl = document.getElementById('quick-view-modal');
        if (modalEl) {
          window.quickViewModalObj = new window.bootstrap.Modal(modalEl);
        }
      }
      
      if (!window.quickViewModalObj) {
        console.error("Bootstrap is not loaded or modal element not found.");
        return;
      }

      // Show modal in loading state
      window.quickViewModalObj.show();
      
      const imgEl = document.getElementById('qv-product-image');
      const nameEl = document.getElementById('qv-product-name');
      const priceEl = document.getElementById('qv-product-price');
      const wasPriceEl = document.getElementById('qv-product-was-price');
      const descEl = document.getElementById('qv-product-description');
      const catEl = document.getElementById('qv-product-category');
      const spinner = document.getElementById('qv-loading-spinner');
      const addBtn = document.getElementById('qv-add-btn');
      
      const colorSection = document.getElementById('qv-color-section');
      const sizeSection = document.getElementById('qv-size-section');
      const colorContainer = document.getElementById('qv-color-container');
      const sizeContainer = document.getElementById('qv-size-container');
      const stockDisplay = document.getElementById('qv-stock-display');
      const qtyInput = document.getElementById('qv-qty-input');

      // Clear previous inputs
      imgEl.src = '';
      nameEl.textContent = 'Loading...';
      priceEl.textContent = '';
      wasPriceEl.classList.add('d-none');
      descEl.textContent = '';
      catEl.textContent = '';
      spinner.classList.remove('d-none');
      
      colorSection.classList.add('d-none');
      sizeSection.classList.add('d-none');
      colorContainer.innerHTML = '';
      sizeContainer.innerHTML = '';
      stockDisplay.classList.add('d-none');
      qtyInput.value = 1;
      addBtn.disabled = true;

      window.qvSelectedColor = '';
      window.qvSelectedSize = '';
      window.qvVariants = [];
      window.qvProduct = null;

      try {
        const supabase = window.supabase;
        if (!supabase) {
          throw new Error("Supabase client is not initialized.");
        }

        // Fetch product details
        const { data: product, error: pErr } = await supabase
          .from('products')
          .select('*, categories(name)')
          .eq('id', productId)
          .single();

        if (pErr || !product) throw pErr || new Error("Product not found");

        // Fetch variants
        const { data: variants, error: vErr } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', productId);

        if (vErr) throw vErr;

        window.qvProduct = product;
        window.qvVariants = variants || [];

        // Populate elements
        imgEl.src = product.images?.[0] || '/shop/assets/img/product/product-default.webp';
        nameEl.textContent = product.name;
        priceEl.textContent = \`$\${Number(product.price).toFixed(2)}\`;
        if (product.sale_price) {
          wasPriceEl.textContent = \`$\${Number(product.sale_price).toFixed(2)}\`;
          wasPriceEl.classList.remove('d-none');
        }
        descEl.textContent = product.description || 'No description available.';
        catEl.textContent = product.categories?.name || 'General';
        spinner.classList.add('d-none');

        // Render Colors
        if (product.colors && product.colors.length > 0) {
          colorSection.classList.remove('d-none');
          product.colors.forEach(c => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-outline-secondary py-2 px-3 fw-semibold text-dark';
            btn.style.border = '1px solid #dee2e6';
            btn.style.backgroundColor = '#f8f9fa';
            btn.style.borderRadius = '6px';
            btn.style.fontSize = '0.85rem';
            btn.style.transition = 'all 0.2s';
            btn.textContent = c;
            btn.addEventListener('click', () => {
              // Highlight selected
              colorContainer.querySelectorAll('button').forEach(b => {
                b.className = 'btn btn-outline-secondary py-2 px-3 fw-semibold text-dark';
                b.style.borderColor = '#dee2e6';
                b.style.backgroundColor = '#f8f9fa';
              });
              btn.className = 'btn btn-primary py-2 px-3 fw-semibold text-white';
              btn.style.borderColor = 'var(--bs-primary)';
              btn.style.backgroundColor = 'var(--bs-primary)';
              
              window.qvSelectedColor = c;
              document.getElementById('qv-selected-color').textContent = c;
              window.checkQvVariantStock();
            });
            colorContainer.appendChild(btn);
          });
        }

        // Render Sizes
        if (product.sizes && product.sizes.length > 0) {
          sizeSection.classList.remove('d-none');
          product.sizes.forEach(s => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-outline-secondary py-2 px-3 fw-semibold text-dark';
            btn.style.border = '1px solid #dee2e6';
            btn.style.backgroundColor = '#f8f9fa';
            btn.style.borderRadius = '6px';
            btn.style.fontSize = '0.85rem';
            btn.style.transition = 'all 0.2s';
            btn.textContent = s;
            btn.addEventListener('click', () => {
              // Highlight selected
              sizeContainer.querySelectorAll('button').forEach(b => {
                b.className = 'btn btn-outline-secondary py-2 px-3 fw-semibold text-dark';
                b.style.borderColor = '#dee2e6';
                b.style.backgroundColor = '#f8f9fa';
              });
              btn.className = 'btn btn-primary py-2 px-3 fw-semibold text-white';
              btn.style.borderColor = 'var(--bs-primary)';
              btn.style.backgroundColor = 'var(--bs-primary)';
              
              window.qvSelectedSize = s;
              document.getElementById('qv-selected-size').textContent = s;
              window.checkQvVariantStock();
            });
            sizeContainer.appendChild(btn);
          });
        }

        // Handle quantity limits if no variants
        const hasColors = product.colors && product.colors.length > 0;
        const hasSizes = product.sizes && product.sizes.length > 0;
        if (!hasColors && !hasSizes) {
          qtyInput.setAttribute('max', product.stock || 10);
          addBtn.disabled = product.stock <= 0;
        }

      } catch (err) {
        console.error("Failed to load quick view details:", err);
        nameEl.textContent = 'Failed to load details';
        spinner.classList.add('d-none');
      }
    };

    window.checkQvVariantStock = function() {
      const stockDisplay = document.getElementById('qv-stock-display');
      const addBtn = document.getElementById('qv-add-btn');
      const qtyInput = document.getElementById('qv-qty-input');
      const product = window.qvProduct;
      const variants = window.qvVariants;
      
      if (!product) return;
      
      const hasColors = product.colors && product.colors.length > 0;
      const hasSizes = product.sizes && product.sizes.length > 0;
      
      if ((hasColors && !window.qvSelectedColor) || (hasSizes && !window.qvSelectedSize)) {
        stockDisplay.classList.add('d-none');
        addBtn.disabled = true;
        return;
      }
      
      const targetColor = (window.qvSelectedColor || '').trim().toLowerCase();
      const targetSize = (window.qvSelectedSize || '').trim().toLowerCase();
      
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
          addBtn.disabled = false;
        } else {
          stockDisplay.className = 'mb-3 px-3 py-2 rounded bg-danger-subtle text-danger';
          stockDisplay.innerHTML = \`<i class="bi bi-x-circle-fill me-1"></i> Stok Habis untuk varian ini\`;
          addBtn.disabled = true;
        }
      } else {
        stockDisplay.className = 'mb-3 px-3 py-2 rounded bg-danger-subtle text-danger';
        stockDisplay.innerHTML = \`<i class="bi bi-exclamation-triangle-fill me-1"></i> Kombinasi varian tidak tersedia\`;
        addBtn.disabled = true;
      }
    };

    // Run on load
    document.addEventListener('DOMContentLoaded', () => {
      updateCartUI();
      updateWishlistUI();
      
      const clearWishlistBtn = document.getElementById('clear-wishlist-btn');
      clearWishlistBtn?.addEventListener('click', () => {
        localStorage.setItem('wishlist', JSON.stringify([]));
        updateWishlistUI();
        window.showToast('Wishlist cleared!', false);
      });

      // Quantity listener setup for quick view modal
      const qvQtyInput = document.getElementById('qv-qty-input');
      const qvDecBtn = document.getElementById('qv-dec-btn');
      const qvIncBtn = document.getElementById('qv-inc-btn');
      const qvAddBtn = document.getElementById('qv-add-btn');

      qvDecBtn?.addEventListener('click', () => {
        let val = parseInt(qvQtyInput.value) || 1;
        if (val > 1) qvQtyInput.value = val - 1;
      });

      qvIncBtn?.addEventListener('click', () => {
        let val = parseInt(qvQtyInput.value) || 1;
        const maxVal = parseInt(qvQtyInput.getAttribute('max')) || 99;
        if (val < maxVal) qvQtyInput.value = val + 1;
      });

      qvAddBtn?.addEventListener('click', () => {
        if (!window.qvProduct) return;
        const qty = parseInt(qvQtyInput.value) || 1;
        
        window.addToCart({
          id: window.qvProduct.id,
          name: window.qvProduct.name,
          price: Number(window.qvProduct.price),
          image: window.qvProduct.images?.[0] || '/shop/assets/img/product/product-default.webp',
          quantity: qty,
          color: window.qvSelectedColor || null,
          size: window.qvSelectedSize || null
        });

        // Hide modal
        window.quickViewModalObj?.hide();
      });

      // Lightbox click-outside handler
      const plb = document.getElementById('payment-proof-lightbox');
      plb?.addEventListener('click', function(e) {
        if (e.target === this) {
          window.closePaymentProofModal();
        }
      });
    });

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

    window.addEventListener('cart-updated-internal', updateCartUI);
    window.addEventListener('wishlist-updated-internal', updateWishlistUI);
  <\/script>${renderScript($$result, "D:/Kuliah/Magang/e-commerce/src/layouts/ShopLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/Kuliah/Magang/e-commerce/src/layouts/ShopLayout.astro", void 0);
//#endregion
export { $$ShopLayout as t };
