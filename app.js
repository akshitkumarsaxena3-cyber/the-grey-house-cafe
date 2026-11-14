/**
 * THE GREY HOUSE CAFE & ROOFTOP LOUNGE - BAREILLY
 * Interactive Frontend Controller & State Management
 */

// Authentic Menu Database sourced from Google Business & Official Listings
const MENU_DATA = [
  {
    id: 1,
    name: "Signature Cheese Balls",
    category: "starters",
    diet: "veg",
    price: 332,
    rating: "4.8",
    popular: true,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    desc: "Crispy golden crumb-crusted spheres stuffed with molten mozzarella, herbs & served with spicy dip."
  },
  {
    id: 2,
    name: "Veg Kurkure Momos (8 Pcs)",
    category: "asian",
    diet: "veg",
    price: 257,
    rating: "4.9",
    popular: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    desc: "Crunchy crumb-coated dumplings packed with spicy seasoned vegetables, served with authentic Schezwan mayo."
  },
  {
    id: 3,
    name: "Mix Sauce Pasta (Pink Sauce)",
    category: "pasta-pizza",
    diet: "veg",
    price: 401,
    rating: "4.7",
    popular: true,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80",
    desc: "Penne pasta tossed in a luxurious blend of velvety Alfredo & rich Pomodoro sauce with herbs & olives."
  },
  {
    id: 4,
    name: "Chicken White Sauce Pasta",
    category: "pasta-pizza",
    diet: "non-veg",
    price: 449,
    rating: "4.8",
    popular: true,
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80",
    desc: "Silky Alfredo pasta loaded with tender smoked herb chicken chunks, parmesan cheese & toasted garlic."
  },
  {
    id: 5,
    name: "Paneer Angara Tikka",
    category: "tandoor",
    diet: "veg",
    price: 380,
    rating: "4.9",
    popular: true,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    desc: "Cottage cheese cubes marinated in charcoal-infused hot spices and clay-oven roasted to perfection."
  },
  {
    id: 6,
    name: "Classic Tandoori Chicken",
    category: "tandoor",
    diet: "non-veg",
    price: 407,
    rating: "4.8",
    popular: true,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    desc: "Authentic whole spring chicken steeped in curd-ginger-garlic marinade and roasted over glowing coals."
  },
  {
    id: 7,
    name: "Fresh Mint Virgin Mojito",
    category: "beverages",
    diet: "veg",
    price: 238,
    rating: "4.9",
    popular: true,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    desc: "Refreshing cooler with muddled fresh garden mint, zesty key lime, sparkling soda & chilled crushed ice."
  },
  {
    id: 8,
    name: "Peri Peri Cheesy Fries",
    category: "starters",
    diet: "veg",
    price: 293,
    rating: "4.6",
    popular: false,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    desc: "Crispy skin-on golden potato fries tossed in fiery African peri peri dust and smothered in melted cheese."
  },
  {
    id: 9,
    name: "Honey Chilli Potato (750ml Box)",
    category: "starters",
    diet: "veg",
    price: 325,
    rating: "4.7",
    popular: true,
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=600&q=80",
    desc: "Crisp potato fingers glazed in an irresistible sweet-spicy honey chilli sauce and toasted sesame seeds."
  },
  {
    id: 10,
    name: "Cheesy Garlic Bread",
    category: "starters",
    diet: "veg",
    price: 298,
    rating: "4.7",
    popular: false,
    image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=600&q=80",
    desc: "Freshly baked artisan baguette loaded with roasted herb garlic butter and bubbling golden mozzarella."
  },
  {
    id: 11,
    name: "Tandoori Paneer Overload",
    category: "tandoor",
    diet: "veg",
    price: 189,
    rating: "4.6",
    popular: false,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    desc: "Bite-sized soft paneer chunks roasted with tandoori dry rub, capsicum, onions & mint drizzle."
  },
  {
    id: 12,
    name: "Paneer Butter Masala (Rich Gravy)",
    category: "tandoor",
    diet: "veg",
    price: 401,
    rating: "4.8",
    popular: false,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    desc: "Silky cubes of fresh paneer simmered in a rich tomato, butter, and cashew cream gravy."
  },
  {
    id: 13,
    name: "Chicken Red Sauce Arbiatta Pasta",
    category: "pasta-pizza",
    diet: "non-veg",
    price: 462,
    rating: "4.7",
    popular: false,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    desc: "Al dente penne tossed in robust spicy Arbiatta tomato sauce, basil, cracked black pepper & juicy chicken."
  },
  {
    id: 14,
    name: "The Grey House Big Burger Pizza",
    category: "pasta-pizza",
    diet: "veg",
    price: 420,
    rating: "4.8",
    popular: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    desc: "House special crossover sensation: deep dish pizza stuffed like a gourmet burger with melted double cheese."
  },
  {
    id: 15,
    name: "Wok-Tossed Veg Hakka Noodles",
    category: "asian",
    diet: "veg",
    price: 311,
    rating: "4.6",
    popular: false,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    desc: "Long noodles stir-fried in smoking wok with julienne bell peppers, shredded cabbage, carrots & soy seasonings."
  },
  {
    id: 16,
    name: "Fiery Schezwan Noodles",
    category: "asian",
    diet: "veg",
    price: 325,
    rating: "4.7",
    popular: false,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    desc: "Spicy tossed noodles with in-house crushed red chilli paste, garlic oil, spring onion greens and vegetables."
  },
  {
    id: 17,
    name: "Burnt Chilly Garlic Noodles",
    category: "asian",
    diet: "veg",
    price: 335,
    rating: "4.8",
    popular: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
    desc: "Aromatic noodles infused with golden roasted garlic chunks, bird's eye chillies, and Asian sesame greens."
  },
  {
    id: 18,
    name: "Crispy Golden Spring Rolls",
    category: "asian",
    diet: "veg",
    price: 280,
    rating: "4.6",
    popular: false,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    desc: "Delicate pastry cylinders packed with seasoned glass noodles & wok vegetables, flash-fried to a shatter-crisp."
  },
  {
    id: 19,
    name: "Thick Oreo Fudge Shake",
    category: "beverages",
    diet: "veg",
    price: 265,
    rating: "4.9",
    popular: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    desc: "Velvety cream shake blended with whole crunchy Oreos, dark Belgian chocolate drizzle & whipped topping."
  },
  {
    id: 20,
    name: "Sparkling Strawberry Mojito",
    category: "beverages",
    diet: "veg",
    price: 238,
    rating: "4.7",
    popular: false,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
    desc: "Sweet sun-ripened strawberry puree infused with fresh lime wedges, mint leaves and bubbly soda."
  }
];

// Application State
const state = {
  cart: {}, // { itemId: quantity }
  activeCategory: 'all',
  activeDiet: 'all',
  searchQuery: ''
};

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  renderMenu();
  setupEventListeners();
  updateCartUI();

  // Set default reservation date to today or tomorrow
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Set dynamic copyright year
  const yearElem = document.getElementById('currentYear');
  if (yearElem) yearElem.textContent = new Date().getFullYear();
});

/**
 * 1. Live Operating Hours & Status Calculator
 * Hours: 11:30 AM to 12:30 AM (Next Day)
 */
function initLiveHours() {
  const badge = document.getElementById('liveStatusBadge');
  const text = document.getElementById('liveStatusText');
  const pill = document.getElementById('contactLivePill');

  function checkStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMin;

    // 11:30 AM = 11*60 + 30 = 690 mins
    // 12:30 AM (midnight next day) = 0*60 + 30 = 30 mins
    // So Cafe is open from 690 mins (11:30 AM) until 1440 mins (midnight) AND from 0 mins to 30 mins (12:30 AM)
    const isOpen = (currentTimeInMinutes >= 690) || (currentTimeInMinutes <= 30);

    if (isOpen) {
      if (badge) {
        badge.classList.remove('closed');
        text.textContent = 'OPEN NOW • Closes 12:30 AM';
      }
      if (pill) {
        pill.className = 'live-status-pill open';
        pill.innerHTML = '<span class="pulse-dot"></span> Open Today Till 12:30 AM';
      }
    } else {
      if (badge) {
        badge.classList.add('closed');
        text.textContent = 'CLOSED • Reopens 11:30 AM';
      }
      if (pill) {
        pill.className = 'live-status-pill closed';
        pill.innerHTML = '<span class="pulse-dot"></span> Closed Now • Opens at 11:30 AM';
      }
    }
  }

  checkStatus();
  setInterval(checkStatus, 60000); // Check every minute
}

/**
 * 2. Menu Rendering & Filtering
 */
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  const emptyState = document.getElementById('emptyMenuState');
  if (!grid) return;

  // Filter items
  const filtered = MENU_DATA.filter(item => {
    // Category match
    const categoryMatch = state.activeCategory === 'all' || item.category === state.activeCategory;
    
    // Diet match
    const dietMatch = state.activeDiet === 'all' || item.diet === state.activeDiet;

    // Search query match
    const q = state.searchQuery.toLowerCase().trim();
    const searchMatch = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);

    return categoryMatch && dietMatch && searchMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(item => {
    const qty = state.cart[item.id] || 0;
    const isVeg = item.diet === 'veg';

    return `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <span class="diet-badge-tag ${item.diet}">
            <span class="diet-dot ${item.diet}"></span> ${isVeg ? 'VEG' : 'NON-VEG'}
          </span>
          ${item.popular ? '<span class="popular-badge"><i class="fa-solid fa-fire"></i> Chef Special</span>' : ''}
        </div>
        <div class="menu-body">
          <div class="menu-title-row">
            <h4 class="menu-title">${item.name}</h4>
            <span class="menu-price">₹${item.price}</span>
          </div>
          <p class="menu-desc">${item.desc}</p>
          <div class="menu-footer-action">
            <div class="dish-rating">
              <i class="fa-solid fa-star text-gold"></i> <strong>${item.rating}</strong>
            </div>
            ${qty > 0 ? `
              <div class="qty-counter">
                <button class="qty-btn" onclick="modifyCart(${item.id}, -1)">-</button>
                <span class="qty-val">${qty}</span>
                <button class="qty-btn" onclick="modifyCart(${item.id}, 1)">+</button>
              </div>
            ` : `
              <button class="add-tray-btn" onclick="modifyCart(${item.id}, 1)">
                <i class="fa-solid fa-plus"></i> Add to Tray
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 3. Cart & Order Tray State Modification
 */
function modifyCart(itemId, delta) {
  const current = state.cart[itemId] || 0;
  const updated = current + delta;

  if (updated <= 0) {
    delete state.cart[itemId];
  } else {
    state.cart[itemId] = updated;
  }

  // Find dish info for toast
  const dish = MENU_DATA.find(d => d.id === itemId);
  if (delta > 0 && dish) {
    showToast(`Added 1x ${dish.name} to order tray!`);
  }

  renderMenu();
  updateCartUI();
}

function clearCart() {
  state.cart = {};
  renderMenu();
  updateCartUI();
  showToast('Order tray cleared.');
}

function updateCartUI() {
  const badge = document.getElementById('cartBadgeCount');
  const listContainer = document.getElementById('cartItemsList');
  const subtotalElem = document.getElementById('cartSubtotal');
  const gstElem = document.getElementById('cartGst');
  const grandTotalElem = document.getElementById('cartGrandTotal');

  const itemIds = Object.keys(state.cart);
  const totalCount = itemIds.reduce((sum, id) => sum + state.cart[id], 0);

  if (badge) badge.textContent = totalCount;

  if (!listContainer) return;

  if (itemIds.length === 0) {
    listContainer.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-receipt"></i>
        <h4>Your tray is empty</h4>
        <p>Explore our menu and add your favorite dishes to build an instant bill estimate.</p>
      </div>
    `;
    if (subtotalElem) subtotalElem.textContent = '₹0';
    if (gstElem) gstElem.textContent = '₹0';
    if (grandTotalElem) grandTotalElem.textContent = '₹0';
    return;
  }

  let subtotal = 0;

  listContainer.innerHTML = itemIds.map(id => {
    const item = MENU_DATA.find(d => d.id === parseInt(id));
    if (!item) return '';
    const qty = state.cart[id];
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <span>₹${item.price} &times; ${qty} = ₹${itemTotal}</span>
        </div>
        <div class="qty-counter">
          <button class="qty-btn" onclick="modifyCart(${item.id}, -1)">-</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn" onclick="modifyCart(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  if (subtotalElem) subtotalElem.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (gstElem) gstElem.textContent = `₹${gst.toLocaleString('en-IN')}`;
  if (grandTotalElem) grandTotalElem.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

/**
 * 4. WhatsApp Pre-Order Generator
 */
function sendOrderViaWhatsApp() {
  const itemIds = Object.keys(state.cart);
  if (itemIds.length === 0) {
    alert('Please add at least one dish to your tray first.');
    return;
  }

  let subtotal = 0;
  let itemsListText = '';

  itemIds.forEach((id, index) => {
    const item = MENU_DATA.find(d => d.id === parseInt(id));
    if (item) {
      const qty = state.cart[id];
      const itemCost = item.price * qty;
      subtotal += itemCost;
      itemsListText += `${index + 1}. ${item.name} x ${qty} = ₹${itemCost}\n`;
    }
  });

  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const message = `*🌟 PRE-ORDER REQUEST - THE GREY HOUSE CAFE 🌟*

Hello The Grey House Team,
I would like to place a pre-order / reservation inquiry with the following dishes:

*Selected Menu Items:*
${itemsListText}
*Subtotal:* ₹${subtotal}
*Est. 5% GST:* ₹${gst}
*Estimated Grand Total:* ₹${grandTotal}

Please let me know table availability / preparation timing. Thank you!`;

  const phone = '919758883331';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/**
 * 5. Table Reservation Modal Handling
 */
function openReservationModal(preferredSpace = '') {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    if (preferredSpace) {
      const spaceSelect = document.getElementById('resSpace');
      if (spaceSelect) spaceSelect.value = preferredSpace;
    }
  }
}

function closeReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function handleReservationSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('resName').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const space = document.getElementById('resSpace').value;
  const special = document.getElementById('resSpecial').value.trim();

  const message = `*🥂 TABLE RESERVATION REQUEST - THE GREY HOUSE BAREILLY 🥂*

Hello The Grey House Team,
I would like to reserve a table at your cafe.

*Guest Name:* ${name}
*Contact Phone:* ${phone}
*Date:* ${date}
*Time Slot:* ${time}
*Guests:* ${guests}
*Preferred Space:* ${space}
${special ? `*Special Request / Occasion:* ${special}\n` : ''}
Please confirm table availability. Thank you!`;

  const cafePhone = '919758883331';
  const waUrl = `https://wa.me/${cafePhone}?text=${encodeURIComponent(message)}`;
  
  closeReservationModal();
  showToast('Opening WhatsApp to confirm reservation...');
  window.open(waUrl, '_blank');
}

/**
 * 6. Lightbox Viewer
 */
function openLightbox(imgSrc, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = imgSrc;
    if (cap) cap.textContent = caption || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeLightbox(e) {
  if (e && e.target && e.target.id === 'lightboxImg') return; // Don't close if clicking the image itself
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

/**
 * 7. Toast Notifications
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const msg = document.getElementById('toastMsg');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.classList.add('active');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/**
 * 8. Event Listeners Setup
 */
function setupEventListeners() {
  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');

  if (toggleBtn && drawer && backdrop) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      backdrop.classList.add('active');
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Close on link click
    document.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Cart Drawer Toggle
  const cartOpenBtn = document.getElementById('cartOpenBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartOpenBtn && cartOverlay) {
    cartOpenBtn.addEventListener('click', () => {
      cartOverlay.classList.add('active');
      cartOverlay.setAttribute('aria-hidden', 'false');
    });

    const closeCart = () => {
      cartOverlay.classList.remove('active');
      cartOverlay.setAttribute('aria-hidden', 'true');
    };

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Reservation Modal Overlay close on click outside
  const resModal = document.getElementById('reservationModal');
  if (resModal) {
    resModal.addEventListener('click', (e) => {
      if (e.target === resModal) closeReservationModal();
    });
  }

  // Category Filter Tabs
  document.querySelectorAll('.menu-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.menu-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.activeCategory = target.getAttribute('data-category');
      renderMenu();
    });
  });

  // Diet Filter Pills
  document.querySelectorAll('.diet-toggles .diet-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.diet-toggles .diet-pill').forEach(p => p.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.activeDiet = target.getAttribute('data-diet');
      renderMenu();
    });
  });

  // Menu Search with Clear Button
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (searchInput && clearBtn) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (state.searchQuery.trim().length > 0) {
        clearBtn.style.display = 'block';
      } else {
        clearBtn.style.display = 'none';
      }
      renderMenu();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearBtn.style.display = 'none';
      renderMenu();
    });
  }

  // Sticky Header Scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
}

function resetMenuFilters() {
  state.activeCategory = 'all';
  state.activeDiet = 'all';
  state.searchQuery = '';

  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.menu-tabs .tab-btn').forEach(b => {
    if (b.getAttribute('data-category') === 'all') b.classList.add('active');
    else b.classList.remove('active');
  });

  document.querySelectorAll('.diet-toggles .diet-pill').forEach(p => {
    if (p.getAttribute('data-diet') === 'all') p.classList.add('active');
    else p.classList.remove('active');
  });

  renderMenu();
}

// Global functions for inline HTML calls
window.modifyCart = modifyCart;
window.clearCart = clearCart;
window.sendOrderViaWhatsApp = sendOrderViaWhatsApp;
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;
window.handleReservationSubmit = handleReservationSubmit;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.resetMenuFilters = resetMenuFilters;
