/* ==========================================
   Natural Paradise - Interactive JS Script
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const mainHeader = document.getElementById('mainHeader');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const scrollIndicatorLink = document.getElementById('scrollIndicatorLink');
  
  // Scent Notes elements
  const noteTabs = document.querySelectorAll('.note-tab');
  const noteTitle = document.getElementById('noteTitle');
  const noteDesc = document.getElementById('noteDesc');

  // Shade selector elements
  const shadeSwatches = document.querySelectorAll('.shade-swatch');
  const shadeName = document.getElementById('shadeName');
  const shadeDesc = document.getElementById('shadeDesc');
  const shadeHerbs = document.getElementById('shadeHerbs');
  const addHaircolorBtn = document.getElementById('addHaircolorBtn');

  // Cart Drawer elements
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartEmptyMessage = document.getElementById('cartEmptyMessage');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const addCartBtns = document.querySelectorAll('.btn-add-cart');

  // Newsletter Elements
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');

  // --- Sticky Header Scroll Logic ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Mobile Hamburger Menu Toggle ---
  if (mobileMenuToggle && mobileNavOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavOverlay.classList.contains('open');
      if (isOpen) {
        mobileNavOverlay.classList.remove('open');
        mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
      } else {
        mobileNavOverlay.classList.add('open');
        mobileMenuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        document.body.style.overflow = 'hidden';
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNavOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('open');
        mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scent Notes Data & Widget Interactivity ---
  const scentNotesData = {
    head: {
      title: "Top: Citrus Orchard & Crisp Pear",
      desc: "The initial burst reveals notes of organic Bulgarian wild bergamot, fresh mandarin peel, and crisp orchard pear, yielding an energizing, sparkling introduction."
    },
    heart: {
      title: "Heart: Jasmine & Damask Rose Petals",
      desc: "As the top notes disperse, the core reveals organic jasmine sambac, Damascus red rose petals, and a touch of wild mountain lavender."
    },
    base: {
      title: "Base: Aged Cedarwood & Soft Vetiver",
      desc: "The lingering dry-down is anchored by organic cedarwood oil, warm Indonesian patchouli leaf, amber resin, and soft Madagascar vanilla beans."
    }
  };

  noteTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      noteTabs.forEach(t => t.classList.remove('active'));
      // Add active to current
      tab.classList.add('active');

      // Update contents
      const noteType = tab.getAttribute('data-note');
      const data = scentNotesData[noteType];
      
      noteTitle.style.opacity = 0;
      noteDesc.style.opacity = 0;
      
      setTimeout(() => {
        noteTitle.textContent = data.title;
        noteDesc.textContent = data.desc;
        noteTitle.style.opacity = 1;
        noteDesc.style.opacity = 1;
      }, 150);
    });
  });

  // Fade transitions support in CSS
  noteTitle.style.transition = 'opacity 0.25s ease';
  noteDesc.style.transition = 'opacity 0.25s ease';

  // --- Hair Shade Data & Widget Interactivity ---
  const shadeData = {
    chestnut: {
      name: "Deep Chestnut",
      desc: "A rich, multi-dimensional dark brown with subtle golden undertones. Suitable for natural light brown to black hair bases.",
      herbs: "Organic Henna Leaf & Indigo Powder"
    },
    honey: {
      name: "Golden Honey",
      desc: "A warm, radiant blonde with glowing honey reflections. Suitable for light blonde, dark blonde, or grey hair bases.",
      herbs: "Chamomile Flower & Organic Cassia Powder"
    },
    copper: {
      name: "Copper Sunset",
      desc: "A vibrant, fiery auburn shade rich in copper undertones. Suitable for natural medium blonde to light brown hair.",
      herbs: "Pure Henna Leaf & Calendula Extract"
    },
    black: {
      name: "Midnight Black",
      desc: "A sleek, deep velvet black with cold slate reflections. Provides absolute coverage of all grey hair.",
      herbs: "Indigo Fermented Leaves & Organic Amla Fruit"
    }
  };

  shadeSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      // Update active swatch
      shadeSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      // Update content panel
      const selectedShade = swatch.getAttribute('data-shade');
      const data = shadeData[selectedShade];

      shadeName.style.opacity = 0;
      shadeDesc.style.opacity = 0;
      shadeHerbs.style.opacity = 0;

      setTimeout(() => {
        shadeName.textContent = data.name;
        shadeDesc.textContent = data.desc;
        shadeHerbs.innerHTML = `<strong>Key Botanicals:</strong> ${data.herbs}`;
        
        shadeName.style.opacity = 1;
        shadeDesc.style.opacity = 1;
        shadeHerbs.style.opacity = 1;

        // Update the Haircolor Cart Button variant details
        addHaircolorBtn.setAttribute('data-variant', data.name);
      }, 150);
    });
  });

  shadeName.style.transition = 'opacity 0.25s ease';
  shadeDesc.style.transition = 'opacity 0.25s ease';
  shadeHerbs.style.transition = 'opacity 0.25s ease';

  // --- Shopping Cart Drawer Logic ---
  let cart = JSON.parse(localStorage.getItem('np_cart')) || [];

  // Open/Close Cart
  openCartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) closeCart();
  });

  function openCart() {
    cartDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Add Item Click handler
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      const img = btn.getAttribute('data-img');
      const variant = btn.getAttribute('data-variant') || null;

      addToCart(id, name, price, img, variant);
    });
  });

  function addToCart(id, name, price, img, variant) {
    // Check if item with same ID and variant exists
    const existingIndex = cart.findIndex(item => item.id === id && item.variant === variant);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        img,
        variant,
        quantity: 1
      });
    }

    saveCart();
    renderCart();
    openCart();
    showToast(`Added ${name} ${variant ? `(${variant}) ` : ''}to your bag.`);
  }

  function removeFromCart(id, variant) {
    cart = cart.filter(item => !(item.id === id && item.variant === variant));
    saveCart();
    renderCart();
    showToast("Item removed from your bag.");
  }

  function updateQuantity(id, variant, amount) {
    const itemIndex = cart.findIndex(item => item.id === id && item.variant === variant);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += amount;
      
      if (cart[itemIndex].quantity <= 0) {
        removeFromCart(id, variant);
      } else {
        saveCart();
        renderCart();
      }
    }
  }

  function saveCart() {
    localStorage.setItem('np_cart', JSON.stringify(cart));
  }

  function renderCart() {
    // Calculate totals
    let totalItems = 0;
    let subtotalPrice = 0;

    if (cart.length === 0) {
      cartEmptyMessage.style.display = 'flex';
      cartItemsList.style.display = 'none';
      cartItemsList.innerHTML = '';
    } else {
      cartEmptyMessage.style.display = 'none';
      cartItemsList.style.display = 'flex';
      
      // Clear container and populate
      cartItemsList.innerHTML = '';
      cart.forEach(item => {
        totalItems += item.quantity;
        subtotalPrice += item.price * item.quantity;

        const cartItemHTML = `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h3 class="cart-item-name">${item.name}</h3>
              ${item.variant ? `<div class="cart-item-details">Shade: ${item.variant}</div>` : ''}
              <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
              <button class="qty-btn minus-qty-btn" aria-label="Decrease quantity">-</button>
              <span class="cart-item-qty">${item.quantity}</span>
              <button class="qty-btn plus-qty-btn" aria-label="Increase quantity">+</button>
              <button class="btn-remove-item" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        `;

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = cartItemHTML;
        const itemElement = tempContainer.firstElementChild;

        // Wire event listeners for this item
        itemElement.querySelector('.minus-qty-btn').addEventListener('click', () => {
          updateQuantity(item.id, item.variant, -1);
        });

        itemElement.querySelector('.plus-qty-btn').addEventListener('click', () => {
          updateQuantity(item.id, item.variant, 1);
        });

        itemElement.querySelector('.btn-remove-item').addEventListener('click', () => {
          removeFromCart(item.id, item.variant);
        });

        cartItemsList.appendChild(itemElement);
      });
    }

    // Update displays
    cartCountBadge.textContent = totalItems;
    cartSubtotal.textContent = `$${subtotalPrice.toFixed(2)}`;
  }

  // Checkout click flow
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast("Your bag is empty. Please add items to checkout.");
    } else {
      showToast("Thank you for your order! This demo has simulated checkout.");
      cart = [];
      saveCart();
      renderCart();
      closeCart();
    }
  });

  // --- Toast Notifications System ---
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: var(--accent-gold);"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto fadeout after 3s
    setTimeout(() => {
      toast.classList.add('fade-out');
      // Remove from DOM after animation finishes
      toast.addEventListener('animationend', (e) => {
        if (e.animationName === 'fadeOutLeft') {
          toast.remove();
        }
      });
    }, 3000);
  }

  // --- Newsletter Interactivity ---
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email) {
        showToast("Subscribed! Thank you for joining Natural Paradise.");
        newsletterEmail.value = '';
      }
    });
  }

  // Initial cart render on page load
  renderCart();
});
