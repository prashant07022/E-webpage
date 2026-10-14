/**
 * Bazaarly – script.js
 * =============================================================
 *  1 Data            5 Product cards & rendering   9 Checkout & orders
 *  2 State           6 Filters & sorting          10 Carousel & timer
 *  3 Helpers         7 Product dialog             11 Toasts
 *  4 Persistence     8 Cart & coupons             12 Init
 * =============================================================
 */
'use strict';

/* ---------- 1. DATA ---------- */
const CATEGORIES = [
  { id: 'Electronics',    icon: '🎧', c1: '#6C5CE7', c2: '#C9C3FA' },
  { id: 'Fashion',        icon: '👗', c1: '#E8588F', c2: '#FFC2D8' },
  { id: 'Home & Kitchen', icon: '🏠', c1: '#12A57F', c2: '#B5F0DC' },
  { id: 'Beauty',         icon: '💄', c1: '#E5734B', c2: '#FFD3C0' },
  { id: 'Sports',         icon: '🏏', c1: '#1E7FE0', c2: '#BFE0FF' },
  { id: 'Books',          icon: '📚', c1: '#E0A21B', c2: '#FFEDB5' },
];

// `image` is optional. Put a URL there to use a real photo instead of the emoji.
const PRODUCTS = [
  { id: 1,  category: 'Electronics', brand: 'Pulse',  name: 'Pulse Bass Wireless Headphones with 40h Battery', price: 1499, mrp: 3990, rating: 4.2, reviews: 48210, emoji: '🎧',image: 'https://www.boseindia.com/cdn/shop/files/QCUHII26-WhiteSmoke_Hero_RGB_5a852914-141c-40a1-9df4-0d4b53d929e8.jpg?v=1772695633?w=400&auto=format&fit=crop', deal: true,  variants: { label: 'Colour', values: ['Black', 'Blue', 'Red'] }, features: ['40-hour playtime', 'Deep bass drivers', 'Built-in mic for calls', 'Type-C fast charging'], description: 'Wireless over-ear headphones tuned for bass, with soft ear cushions for long listening sessions.' },
  { id: 2,  category: 'Electronics', brand: 'Zenox',  name: 'Zenox Nova 5G (8GB RAM, 128GB Storage)',          price: 13999, mrp: 18999, rating: 4.3, reviews: 22140, emoji: '📱',image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDb7QK1vApeZG_3H941z1hwqArq3emteids0FBGktSmQ&s=10?w=400&auto=format&fit=crop', deal: false, variants: { label: 'Colour', values: ['Midnight', 'Aqua'] }, features: ['6.6" 120Hz display', '50MP dual camera', '5000mAh battery', '5G ready'], description: 'A smooth, fast everyday phone with a big battery and a bright high-refresh display.' },
  { id: 3,  category: 'Electronics', brand: 'Pulse',  name: 'Tempo Fit Smartwatch with Heart-Rate Monitor',    price: 1799, mrp: 4999, rating: 4.1, reviews: 15320, emoji: '⌚',image: 'https://gizmore.in/cdn/shop/files/0_44.jpg?v=1770128033&width=4001?w=400&auto=format&fit=crop', deal: true,  variants: { label: 'Strap', values: ['Black', 'Olive', 'Pink'] }, features: ['1.8" AMOLED display', 'SpO2 and heart-rate tracking', '100+ sports modes', '7-day battery'], description: 'Track workouts, sleep and notifications from your wrist.' },
  { id: 4,  category: 'Electronics', brand: 'VoltMax', name: 'VoltMax 20000mAh Fast-Charge Power Bank',        price: 1799, mrp: 2999, rating: 4.4, reviews: 31002, emoji: '🔋', deal: false, variants: null, features: ['20000mAh capacity', '22.5W fast charging', 'Dual USB + Type-C', 'Slim, travel-friendly'], description: 'Charge a phone four or five times on a single charge of the power bank.' },

  { id: 5,  category: 'Fashion', brand: 'UrbanRoots', name: 'Men’s Slim Fit Stretch Jeans',                  price: 899,  mrp: 2199, rating: 4.0, reviews: 9210, emoji: '👖', deal: false, variants: { label: 'Waist', values: ['30', '32', '34', '36'] }, features: ['Stretch denim', 'Slim fit', 'Machine washable', 'Mid-rise'], description: 'Comfortable everyday jeans with just enough stretch to move freely.' },
  { id: 6,  category: 'Fashion', brand: 'Aarav & Co', name: 'Women’s Cotton Printed Kurta Set',              price: 1199, mrp: 2499, rating: 4.4, reviews: 4310, emoji: '👘', deal: false, variants: { label: 'Size', values: ['S', 'M', 'L', 'XL'] }, features: ['Breathable pure cotton', 'Kurta, pant and dupatta', 'Block print', 'Easy wash'], description: 'A light, comfortable three-piece set for festive days and everyday wear.' },
  { id: 7,  category: 'Fashion', brand: 'Stride', name: 'Stride Cloud Running Shoes',                        price: 1799, mrp: 3499, rating: 4.3, reviews: 12800, emoji: '👟', deal: true,  variants: { label: 'UK size', values: ['6', '7', '8', '9', '10'] }, features: ['Cushioned EVA sole', 'Breathable mesh upper', 'Lightweight, 240 g', 'Non-slip grip'], description: 'Light, bouncy running shoes that handle daily runs and gym sessions.' },
  { id: 8,  category: 'Fashion', brand: 'Trailmate', name: 'Weekend Canvas Backpack, 25L',                   price: 899,  mrp: 1799, rating: 4.2, reviews: 7600, emoji: '🎒', deal: false, variants: { label: 'Colour', values: ['Navy', 'Khaki', 'Grey'] }, features: ['Fits 15.6" laptop', 'Water-resistant canvas', 'Padded straps', '3 zip compartments'], description: 'A tough everyday backpack for college, commuting and short trips.' },

  { id: 9,  category: 'Home & Kitchen', brand: 'Brewmate', name: 'Brewmate Electric Kettle 1.8L Stainless Steel', price: 899, mrp: 1595, rating: 4.3, reviews: 25400, emoji: '🫖', deal: true, variants: null, features: ['1500W fast boil', 'Auto shut-off', 'Stainless steel body', '1-year warranty'], description: 'Boils water in minutes for tea, noodles, soups and more.' },
  { id: 10, category: 'Home & Kitchen', brand: 'Chulha', name: 'Chulha Non-Stick Cookware Set, 3 Pieces',         price: 1999, mrp: 3999, rating: 4.2, reviews: 8800, emoji: '🍳', deal: false, variants: null, features: ['Kadhai, tawa and fry pan', 'Induction base', 'PFOA-free coating', 'Cool-touch handles'], description: 'The three pans most Indian kitchens use every day, in one set.' },
  { id: 11, category: 'Home & Kitchen', brand: 'SleepWell', name: 'SleepWell Cotton Double Bedsheet with 2 Pillow Covers', price: 699, mrp: 1499, rating: 4.1, reviews: 11230, emoji: '🛏️', deal: false, variants: { label: 'Design', values: ['Floral', 'Geometric', 'Plain Blue'] }, features: ['144 TC cotton', 'Fade-resistant print', 'Fits double beds', 'Machine washable'], description: 'Soft, breathable bedsheet that gets better with every wash.' },
  { id: 12, category: 'Home & Kitchen', brand: 'Lumio', name: 'Lumio Rechargeable LED Study Lamp',               price: 549, mrp: 999, rating: 4.4, reviews: 6700, emoji: '💡', deal: false, variants: null, features: ['3 brightness levels', 'Eye-care light', 'Rechargeable battery', 'Foldable neck'], description: 'A compact lamp that works through power cuts and stays gentle on the eyes.' },

  { id: 13, category: 'Beauty', brand: 'GlowLab', name: 'GlowLab 10% Vitamin C Face Serum, 30ml',                price: 499, mrp: 899, rating: 4.2, reviews: 18900, emoji: '🧴', deal: false, variants: null, features: ['10% Vitamin C', 'Brightens dull skin', 'Lightweight, non-sticky', 'Dermatologically tested'], description: 'A daily serum that helps even out skin tone and add glow.' },
  { id: 14, category: 'Beauty', brand: 'Groomy', name: 'Groomy Cordless Beard Trimmer with 20 Length Settings', price: 999, mrp: 1999, rating: 4.3, reviews: 14500, emoji: '🪒', deal: true,  variants: null, features: ['60-minute runtime', 'USB charging', 'Washable blades', '20 length settings'], description: 'Precise, quiet trimming for clean edges and an even beard.' },
  { id: 15, category: 'Beauty', brand: 'Vanaspati', name: 'Vanaspati Herbal Shampoo with Amla & Reetha, 340ml', price: 299, mrp: 450, rating: 4.0, reviews: 20100, emoji: '🌿', deal: false, variants: null, features: ['Amla, reetha and shikakai', 'Sulphate-free', 'Gentle on daily use', 'Suitable for all hair types'], description: 'A mild herbal shampoo that cleans without stripping your hair.' },
  { id: 16, category: 'Beauty', brand: 'GlowLab', name: 'GlowLab Matte Sunscreen SPF 50 PA++++, 50g',            price: 349, mrp: 599, rating: 4.5, reviews: 9800, emoji: '☀️', deal: false, variants: null, features: ['SPF 50 PA++++', 'No white cast', 'Matte finish', 'Water-resistant'], description: 'Broad-spectrum sun protection that sits comfortably under makeup.' },

  { id: 17, category: 'Sports', brand: 'FlexFit', name: 'FlexFit Anti-Slip Yoga Mat, 6mm',                      price: 599, mrp: 1299, rating: 4.3, reviews: 16200, emoji: '🧘', deal: false, variants: { label: 'Colour', values: ['Purple', 'Green', 'Black'] }, features: ['6mm cushioning', 'Anti-slip surface', 'Carry strap included', 'Odour-free material'], description: 'Comfortable grip and cushioning for yoga, stretching and floor workouts.' },
  { id: 18, category: 'Sports', brand: 'IronBeat', name: 'IronBeat Adjustable Dumbbell Set, 10kg',              price: 1999, mrp: 3299, rating: 4.2, reviews: 5400, emoji: '🏋️', deal: false, variants: null, features: ['Adjustable weight plates', 'Anti-rust coating', 'Comfortable grip', 'Includes 2 rods'], description: 'Build strength at home with plates you can change as you progress.' },
  { id: 19, category: 'Sports', brand: 'Willowcraft', name: 'Willowcraft Kashmir Willow Cricket Bat',            price: 1499, mrp: 2499, rating: 4.1, reviews: 2100, emoji: '🏏', deal: true,  variants: { label: 'Size', values: ['Short Handle', 'Full'] }, features: ['Kashmir willow', 'Cane handle', 'Scuff sheet included', 'Ideal for tennis and leather-ball practice'], description: 'A balanced bat for practice, gully cricket and club nets.' },
  { id: 20, category: 'Sports', brand: 'SmashPro', name: 'SmashPro Badminton Racket Pair with Cover',           price: 799, mrp: 1499, rating: 4.2, reviews: 7400, emoji: '🏸', deal: false, variants: null, features: ['Lightweight aluminium frame', 'Pre-strung', 'Padded grip', '2 rackets + 3 shuttles'], description: 'Everything you need for a weekend game at the park.' },

  { id: 21, category: 'Books', brand: 'Penwell', name: 'Money Basics for Everyone: A Beginner’s Guide to Saving and Investing', price: 249, mrp: 399, rating: 4.5, reviews: 9100, emoji: '📘', deal: false, variants: null, features: ['Paperback, 240 pages', 'Plain-language explanations', 'Examples in rupees', 'English'], description: 'A friendly introduction to budgeting, saving and investing.' },
  { id: 22, category: 'Books', brand: 'Penwell', name: 'Learn Python in 30 Days: Practice-Based Guide',        price: 349, mrp: 599, rating: 4.4, reviews: 6500, emoji: '🐍', deal: false, variants: null, features: ['Paperback, 320 pages', '30 daily exercises', 'Beginner friendly', 'English'], description: 'Learn to code by building small programs every day for a month.' },
  { id: 23, category: 'Books', brand: 'Inkwood', name: 'Midnight Express: A Mystery Novel',                    price: 199, mrp: 350, rating: 4.2, reviews: 3300, emoji: '📕', deal: false, variants: null, features: ['Paperback, 288 pages', 'Fast-paced thriller', 'English'], description: 'A train, a locked compartment and one passenger who isn’t who they claim to be.' },
  { id: 24, category: 'Books', brand: 'Inkwood', name: 'The Kids’ Treasury of Illustrated Stories',            price: 299, mrp: 450, rating: 4.6, reviews: 4100, emoji: '📚', deal: false, variants: null, features: ['Hardcover, 160 pages', 'Full-colour pictures', 'Ages 4–8', 'English'], description: 'Twenty short, colourful stories for bedtime and reading practice.' },
];

const SLIDES = [
  { title: 'Big savings on electronics', text: 'Headphones, smartwatches and power banks at up to 60% off.', cta: 'Shop electronics', cat: 'Electronics', emoji: '🎧', bg: 'linear-gradient(120deg,#3B2A6B,#6C5CE7)' },
  { title: 'Fresh styles, friendly prices', text: 'Kurtas, jeans, shoes and bags for every day of the week.',   cta: 'Shop fashion',      cat: 'Fashion',     emoji: '👟', bg: 'linear-gradient(120deg,#B02A63,#F25C54)' },
  { title: 'Get moving this season',     text: 'Yoga mats, dumbbells and rackets to start a new routine.',   cta: 'Shop sports',       cat: 'Sports',      emoji: '🏋️', bg: 'linear-gradient(120deg,#0B5FA8,#1C9C6F)' },
];

const PRICE_MAX = 15000;
const FREE_SHIP_AT = 499;
const SHIP_FEE = 40;
const PAGE_SIZE = 8;
const MAX_QTY = 10;
const COUPONS = {
  SAVE10:  { type: 'pct',  value: 10,  min: 499, cap: 300, label: '10% off (max ₹300)' },
  FLAT150: { type: 'flat', value: 150, min: 999, cap: 150, label: '₹150 off orders over ₹999' },
};

/* ---------- 2. STATE ---------- */
const state = {
  category: 'all',
  brands: new Set(),
  maxPrice: PRICE_MAX,
  minRating: 0,
  search: '',
  sort: 'featured',
  wishOnly: false,
  visible: PAGE_SIZE,

  cart: [],        // { key, id, variant, qty }
  wish: new Set(),
  coupon: null,
  orders: [],
  recent: [],

  detailId: null,
  detail: { variant: '', qty: 1 },
  pendingBuyNow: false,
};

/* ---------- 3. HELPERS ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = id => PRODUCTS.find(p => p.id === id);
const catOf = p => CATEGORIES.find(c => c.id === p.category);
const money = n => '₹' + n.toLocaleString('en-IN');
const discountPct = p => Math.round(((p.mrp - p.price) / p.mrp) * 100);
const lineKey = (id, variant) => `${id}|${variant}`;
const lineTotal = l => byId(l.id).price * l.qty;
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const addDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }); };

/* ---------- 4. PERSISTENCE ---------- */
const KEY = 'bazaarly_v1';
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      cart: state.cart, wish: [...state.wish], coupon: state.coupon, orders: state.orders, recent: state.recent,
    }));
  } catch (e) { /* storage blocked – keep working in memory */ }
}
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!raw) return;
    state.cart   = (raw.cart || []).filter(l => byId(l.id));
    state.wish   = new Set((raw.wish || []).filter(byId));
    state.coupon = COUPONS[raw.coupon] ? raw.coupon : null;
    state.orders = raw.orders || [];
    state.recent = (raw.recent || []).filter(byId);
  } catch (e) { /* ignore corrupt data */ }
}

/* ---------- 5. PRODUCT CARDS & RENDERING ---------- */
/** Image if provided (with emoji fallback), otherwise a coloured emoji tile. */
function tileHTML(p) {
  const c = catOf(p);
  const inner = p.image
    ? `<img src="${p.image}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'emoji',textContent:'${p.emoji}'}))">`
    : `<span class="emoji" aria-hidden="true">${p.emoji}</span>`;
  return `<div class="tile" style="--c1:${c.c1}33;--c2:${c.c2}">${inner}</div>`;
}

function cardHTML(p) {
  const wished = state.wish.has(p.id);
  return `
  <article class="card" data-id="${p.id}">
    <span class="badge">${discountPct(p)}% off</span>
    <button class="heart" data-action="wish" aria-pressed="${wished}" aria-label="${wished ? 'Remove' : 'Add'} ${p.name} ${wished ? 'from' : 'to'} wishlist">${wished ? '♥' : '♡'}</button>
    <button data-action="view" aria-label="View ${p.name}" style="display:block">${tileHTML(p)}</button>
    <div class="card-body">
      <p class="brand">${p.brand}</p>
      <h3><button data-action="view">${p.name}</button></h3>
      <p class="rating-row"><span class="rating-pill">${p.rating} ★</span> (${p.reviews.toLocaleString('en-IN')})</p>
      <p class="price-row"><span class="price">${money(p.price)}</span><span class="mrp">${money(p.mrp)}</span></p>
      <p class="delivery">${p.price >= FREE_SHIP_AT ? 'Free delivery' : '+ ₹40 delivery'}</p>
    </div>
    <div class="card-actions"><button class="btn btn-dark btn-block btn-small" data-action="add" aria-label="Add ${p.name} to cart">Add to cart</button></div>
  </article>`;
}

function renderCategoryStrip() {
  const all = [{ id: 'all', icon: '🛍️', label: 'All' }, ...CATEGORIES.map(c => ({ ...c, label: c.id }))];
  $('#cat-strip').innerHTML = all.map(c =>
    `<button class="cat-btn" data-cat="${c.id}" aria-pressed="${state.category === c.id}">${c.icon} ${c.label}</button>`).join('');
}

function renderBrands() {
  const pool = PRODUCTS.filter(p => state.category === 'all' || p.category === state.category);
  const brands = [...new Set(pool.map(p => p.brand))].sort();
  // drop selected brands that no longer exist in this category
  state.brands.forEach(b => { if (!brands.includes(b)) state.brands.delete(b); });
  $('#brand-group').innerHTML = `<legend>Brand</legend>` + brands.map(b =>
    `<label><input type="checkbox" value="${b}" ${state.brands.has(b) ? 'checked' : ''}> ${b}</label>`).join('');
}

function renderChips() {
  const chips = [];
  if (state.category !== 'all') chips.push({ k: 'cat', label: state.category });
  state.brands.forEach(b => chips.push({ k: 'brand', v: b, label: b }));
  if (state.maxPrice < PRICE_MAX) chips.push({ k: 'price', label: `Up to ${money(state.maxPrice)}` });
  if (state.minRating) chips.push({ k: 'rating', label: `${state.minRating}★ & above` });
  if (state.wishOnly) chips.push({ k: 'wish', label: 'Wishlist only' });
  if (state.search.trim()) chips.push({ k: 'search', label: `“${state.search.trim()}”` });
  $('#chips').innerHTML = chips.map(c =>
    `<span class="chip">${c.label}<button data-k="${c.k}" data-v="${c.v || ''}" aria-label="Remove filter ${c.label}">&times;</button></span>`).join('');
}

function renderProducts() {
  const list = getFiltered();
  const shown = list.slice(0, state.visible);
  $('#grid').innerHTML = shown.map(cardHTML).join('');
  $('#empty').hidden = list.length > 0;
  $('#load-more').hidden = list.length <= state.visible;
  $('#result-count').textContent = list.length ? `${list.length} product${list.length === 1 ? '' : 's'}` : '';
  renderChips();
  $$('.cat-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === state.category)));
}

function renderDeals() {
  $('#deal-row').innerHTML = PRODUCTS.filter(p => p.deal).map(cardHTML).join('');
}
function renderRecent() {
  const items = state.recent.map(byId).filter(Boolean).slice(0, 6);
  $('#recent').hidden = items.length === 0;
  $('#recent-row').innerHTML = items.map(cardHTML).join('');
}
function rerenderCards() { renderProducts(); renderDeals(); renderRecent(); }

/* ---------- 6. FILTERS & SORTING ---------- */
function getFiltered() {
  const q = state.search.trim().toLowerCase();
  const list = PRODUCTS.filter(p => {
    if (state.category !== 'all' && p.category !== state.category) return false;
    if (state.brands.size && !state.brands.has(p.brand)) return false;
    if (p.price > state.maxPrice) return false;
    if (p.rating < state.minRating) return false;
    if (state.wishOnly && !state.wish.has(p.id)) return false;
    if (q && ![p.name, p.brand, p.category, p.description].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
  const sorters = {
    'price-asc':  (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'rating':     (a, b) => b.rating - a.rating,
    'discount':   (a, b) => discountPct(b) - discountPct(a),
  };
  if (sorters[state.sort]) list.sort(sorters[state.sort]);
  return list;
}

function syncControls() {
  $('#price-range').value = state.maxPrice;
  $('#price-value').textContent = money(state.maxPrice);
  $$('input[name="rating"]').forEach(r => r.checked = Number(r.value) === state.minRating);
  $('#search').value = state.search;
  $('#sort').value = state.sort;
  $('#wish-btn').setAttribute('aria-pressed', String(state.wishOnly));
}

function setCategory(cat) {
  state.category = cat; state.visible = PAGE_SIZE;
  renderBrands(); renderProducts();
}
function clearFilters() {
  Object.assign(state, { category: 'all', maxPrice: PRICE_MAX, minRating: 0, search: '', sort: 'featured', wishOnly: false, visible: PAGE_SIZE });
  state.brands.clear();
  syncControls(); renderBrands(); renderProducts();
}
const goShop = () => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });

function toggleWish(id) {
  const p = byId(id);
  if (state.wish.has(id)) { state.wish.delete(id); toast(`Removed from wishlist`); }
  else { state.wish.add(id); toast(`Added ${p.brand} item to wishlist`); }
  save(); updateWishCount(); rerenderCards();
  if (state.detailId === id) renderDetail();
}
function updateWishCount() {
  const el = $('#wish-count'); el.textContent = state.wish.size; el.hidden = state.wish.size === 0;
}

/* ---------- 7. PRODUCT DIALOG ---------- */
function openDetail(id) {
  const p = byId(id);
  state.detailId = id;
  state.detail = { variant: p.variants ? p.variants.values[0] : '', qty: 1 };
  state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 8);
  save(); renderRecent();
  renderDetail();
  $('#product-dialog').showModal();
}

function renderDetail() {
  const p = byId(state.detailId); if (!p) return;
  const d = state.detail;
  const wished = state.wish.has(p.id);
  const variantHTML = p.variants ? `
    <div>
      <span class="opt-label" id="var-label">${p.variants.label}: <strong>${d.variant}</strong></span>
      <div class="opt-group" role="radiogroup" aria-labelledby="var-label">
        ${p.variants.values.map(v => `<label><input type="radio" name="variant" value="${v}" ${v === d.variant ? 'checked' : ''}><span>${v}</span></label>`).join('')}
      </div>
    </div>` : '';

  $('#detail').innerHTML = `
    ${tileHTML(p)}
    <div class="d-info">
      <div><p class="brand">${p.brand} · ${p.category}</p><h2 id="d-name">${p.name}</h2></div>
      <p class="rating-row"><span class="rating-pill">${p.rating} ★</span> ${p.reviews.toLocaleString('en-IN')} ratings</p>
      <p class="d-price">${money(p.price)}<span class="mrp">${money(p.mrp)}</span><span class="off">${discountPct(p)}% off</span></p>
      <p class="d-desc">${p.description}</p>
      <ul class="feature-list">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      ${variantHTML}
      <div class="buy-row">
        <div class="stepper">
          <button data-d="dec" aria-label="Decrease quantity">&minus;</button>
          <output aria-live="polite">${d.qty}</output>
          <button data-d="inc" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-outline" data-d="wish" aria-pressed="${wished}">${wished ? '♥ Wishlisted' : '♡ Wishlist'}</button>
      </div>
      <div class="buy-row">
        <button class="btn btn-dark" data-d="add">Add to cart</button>
        <button class="btn btn-primary" data-d="buy">Buy now · ${money(p.price * d.qty)}</button>
      </div>
      <div>
        <label class="opt-label" for="pin">Check delivery</label>
        <div class="pin-check">
          <input id="pin" type="text" inputmode="numeric" maxlength="6" placeholder="Enter PIN code" />
          <button class="btn btn-outline btn-small" data-d="pin" type="button">Check</button>
        </div>
        <p class="pin-msg" id="pin-msg" role="status"></p>
      </div>
      <p class="perks"><span>7-day returns</span><span>1-year warranty*</span><span>Secure payments</span></p>
    </div>`;
}

function onDetail(e) {
  const t = e.target, d = state.detail;
  if (t.name === 'variant') { d.variant = t.value; renderDetail(); $('input[name="variant"]:checked').focus(); return; }
  const btn = t.closest('[data-d]');
  if (!btn || e.type !== 'click') return;
  const act = btn.dataset.d;
  if (act === 'inc' && d.qty < MAX_QTY) { d.qty++; renderDetail(); $('[data-d="inc"]').focus(); }
  if (act === 'dec' && d.qty > 1)       { d.qty--; renderDetail(); $('[data-d="dec"]').focus(); }
  if (act === 'wish') toggleWish(state.detailId);
  if (act === 'add')  { addToCart(state.detailId, d.variant, d.qty); $('#product-dialog').close(); openCart(); }
  if (act === 'buy')  { addToCart(state.detailId, d.variant, d.qty, true); $('#product-dialog').close(); openCheckout(); }
  if (act === 'pin')  checkPin();
}

function checkPin() {
  const v = $('#pin').value.trim(), msg = $('#pin-msg');
  if (!/^[1-9]\d{5}$/.test(v)) { msg.className = 'pin-msg bad'; msg.textContent = 'Enter a valid 6-digit PIN code.'; return; }
  msg.className = 'pin-msg ok';
  msg.textContent = `Delivery by ${addDays(3)}. Cash on delivery available.`;
}

/* ---------- 8. CART & COUPONS ---------- */
function addToCart(id, variant = '', qty = 1, silent = false) {
  const p = byId(id), key = lineKey(id, variant);
  const line = state.cart.find(l => l.key === key);
  if (line) line.qty = Math.min(line.qty + qty, MAX_QTY);
  else state.cart.push({ key, id, variant, qty });
  save(); renderCart();
  if (!silent) toast(`Added to cart: ${p.brand} item`);
}
function changeQty(key, delta) {
  const l = state.cart.find(x => x.key === key); if (!l) return;
  l.qty = Math.min(l.qty + delta, MAX_QTY);
  if (l.qty < 1) state.cart = state.cart.filter(x => x.key !== key);
  save(); renderCart();
}
function removeLine(key) { state.cart = state.cart.filter(l => l.key !== key); save(); renderCart(); }
function moveToWish(key) {
  const l = state.cart.find(x => x.key === key); if (!l) return;
  state.wish.add(l.id); removeLine(key); updateWishCount(); rerenderCards(); toast('Moved to wishlist');
}
function clearCart() { state.cart = []; state.coupon = null; save(); renderCart(); }

function calcTotals() {
  const subtotal = state.cart.reduce((s, l) => s + lineTotal(l), 0);
  const mrpTotal = state.cart.reduce((s, l) => s + byId(l.id).mrp * l.qty, 0);
  const c = state.coupon ? COUPONS[state.coupon] : null;
  let discount = 0, short = 0;
  if (c) {
    if (subtotal >= c.min) discount = Math.min(c.type === 'pct' ? Math.round(subtotal * c.value / 100) : c.value, c.cap);
    else short = c.min - subtotal;
  }
  const after = subtotal - discount;
  const shipping = subtotal === 0 || after >= FREE_SHIP_AT ? 0 : SHIP_FEE;
  return { subtotal, mrpTotal, discount, shipping, total: after + shipping, short, saved: mrpTotal - subtotal + discount };
}

function totalsHTML(t) {
  return `
    <div><dt>Price (${state.cart.reduce((s, l) => s + l.qty, 0)} items)</dt><dd>${money(t.subtotal)}</dd></div>
    ${t.discount ? `<div class="save"><dt>Coupon discount</dt><dd>-${money(t.discount)}</dd></div>` : ''}
    <div><dt>Delivery</dt><dd>${t.shipping ? money(t.shipping) : 'Free'}</dd></div>
    <div class="grand"><dt>Total</dt><dd>${money(t.total)}</dd></div>`;
}

function renderCart() {
  const count = state.cart.reduce((s, l) => s + l.qty, 0);
  const badge = $('#cart-count'); badge.textContent = count; badge.hidden = count === 0;
  const empty = state.cart.length === 0;
  $('#cart-empty').hidden = !empty; $('#cart-foot').hidden = empty; $('#cart-lines').hidden = empty;

  $('#cart-lines').innerHTML = state.cart.map(l => {
    const p = byId(l.id);
    return `<li class="cart-line" data-key="${l.key}">
      ${tileHTML(p)}
      <div>
        <h3>${p.name}</h3>
        <p class="line-meta">${l.variant ? `${p.variants.label}: ${l.variant} · ` : ''}${money(p.price)} each</p>
        <div class="stepper">
          <button data-c="dec" aria-label="Decrease quantity">&minus;</button><output>${l.qty}</output><button data-c="inc" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="line-right">
        <span class="line-price">${money(lineTotal(l))}</span>
        <div><button class="link-btn" data-c="wish">Save for later</button><button class="link-btn" data-c="remove">Remove</button></div>
      </div>
    </li>`;
  }).join('');

  const t = calcTotals();
  $('#cart-totals').innerHTML = totalsHTML(t);
  $('#cart-savings').textContent = t.saved > 0 ? `You will save ${money(t.saved)} on this order` : '';

  const msg = $('#coupon-msg');
  if (state.coupon && t.short > 0) { msg.className = 'coupon-msg bad'; msg.textContent = `${state.coupon} needs ${money(t.short)} more in your cart.`; }
  else if (state.coupon)           { msg.className = 'coupon-msg ok';  msg.textContent = `${state.coupon} applied: ${COUPONS[state.coupon].label}.`; }
  else                             { msg.textContent = ''; }
}

function applyCoupon(raw) {
  const code = raw.trim().toUpperCase(), msg = $('#coupon-msg');
  if (!code) { msg.className = 'coupon-msg bad'; msg.textContent = 'Enter a coupon code.'; return; }
  if (!COUPONS[code]) { msg.className = 'coupon-msg bad'; msg.textContent = `“${code}” is not a valid code.`; return; }
  state.coupon = code; $('#coupon-input').value = ''; save(); renderCart();
}
function openCart() { renderCart(); $('#cart-dialog').showModal(); }

/* ---------- 9. CHECKOUT & ORDERS ---------- */
function openCheckout() {
  if (!state.cart.length) return;
  $('#co-step').hidden = false; $('#confirm').hidden = true;
  $('#co-form').reset(); clearErrors();
  const t = calcTotals();
  $('#sum-lines').innerHTML = state.cart.map(l => {
    const p = byId(l.id);
    return `<li><span>${p.name} × ${l.qty}${l.variant ? `<small>${p.variants.label}: ${l.variant}</small>` : ''}</span><span>${money(lineTotal(l))}</span></li>`;
  }).join('');
  $('#sum-totals').innerHTML = totalsHTML(t);
  $('#cart-dialog').close();
  $('#checkout-dialog').showModal();
}

function clearErrors() {
  $$('.error').forEach(e => e.textContent = '');
  $$('#co-form .invalid').forEach(e => e.classList.remove('invalid'));
}

function validateCheckout() {
  clearErrors();
  const rules = [
    ['c-name',    'e-name',    v => v.trim().length >= 2,                              'Enter your full name.'],
    ['c-phone',   'e-phone',   v => /^[6-9]\d{9}$/.test(v.replace(/\s/g, '')),         'Enter a valid 10-digit mobile number.'],
    ['c-email',   'e-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),       'Enter a valid email address.'],
    ['c-address', 'e-address', v => v.trim().length >= 10,                             'Enter your full address.'],
    ['c-city',    'e-city',    v => v.trim().length >= 2,                              'Enter your city.'],
    ['c-pin',     'e-pin',     v => /^[1-9]\d{5}$/.test(v.trim()),                     'Enter a 6-digit PIN code.'],
  ];
  let first = null;
  rules.forEach(([id, errId, ok, msg]) => {
    const el = document.getElementById(id);
    if (!ok(el.value)) { document.getElementById(errId).textContent = msg; el.classList.add('invalid'); first = first || el; }
  });
  if (first) first.focus();
  return !first;
}

function placeOrder() {
  if (!validateCheckout()) return;
  const t = calcTotals();
  const order = {
    id: 'BZ' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    date: new Date().toISOString(),
    eta: addDays(4),
    pay: $('input[name="pay"]:checked').value,
    total: t.total,
    items: state.cart.map(l => ({ id: l.id, variant: l.variant, qty: l.qty })),
  };
  state.orders.unshift(order);
  $('#cf-name').textContent = $('#c-name').value.trim();
  $('#cf-id').textContent = order.id;
  $('#cf-date').textContent = order.eta;
  $('#co-step').hidden = true; $('#confirm').hidden = false;
  clearCart();
}

function openOrders() {
  $('#orders-empty').hidden = state.orders.length > 0;
  $('#orders-list').innerHTML = state.orders.map(o => `
    <li class="order-card">
      <div class="order-top"><strong>${o.id}</strong><span class="status">Confirmed</span></div>
      <ul class="order-items">${o.items.map(i => { const p = byId(i.id); return p ? `<li><span aria-hidden="true">${p.emoji}</span>${p.name.split(' ').slice(0, 3).join(' ')} × ${i.qty}</li>` : ''; }).join('')}</ul>
      <p class="order-meta">${new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · ${o.pay} · <strong>${money(o.total)}</strong> · Arrives by ${o.eta}</p>
    </li>`).join('');
  $('#orders-dialog').showModal();
}

/* ---------- 10. CAROUSEL & TIMER ---------- */
const car = { i: 0, timer: null };

function renderCarousel() {
  $('#slides').innerHTML = SLIDES.map((s, i) => `
    <div class="slide" style="background:${s.bg}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SLIDES.length}">
      <div><h2>${s.title}</h2><p>${s.text}</p><button class="btn btn-primary" data-cat="${s.cat}">${s.cta}</button></div>
      <div class="art" aria-hidden="true">${s.emoji}</div>
    </div>`).join('');
  $('#dots').innerHTML = SLIDES.map((_, i) => `<button class="dot" data-i="${i}" aria-label="Go to offer ${i + 1}"></button>`).join('');
  goSlide(0);
}
function goSlide(i) {
  car.i = (i + SLIDES.length) % SLIDES.length;
  $('#slides').style.transform = `translateX(-${car.i * 100}%)`;
  $$('.dot').forEach((d, n) => d.setAttribute('aria-current', String(n === car.i)));
}
function startCarousel() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  stopCarousel(); car.timer = setInterval(() => goSlide(car.i + 1), 5000);
}
function stopCarousel() { clearInterval(car.timer); }

function tickTimer() {
  const now = new Date(), end = new Date(now); end.setHours(24, 0, 0, 0);
  const s = Math.max(0, Math.floor((end - now) / 1000));
  const pad = n => String(n).padStart(2, '0');
  $('#timer').textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s % 3600 / 60))}:${pad(s % 60)}`;
}

/* ---------- 11. TOASTS ---------- */
function toast(msg, ms = 2200) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, ms);
}

/* ---------- 12. INIT ---------- */
function handleCardClick(e) {
  const btn = e.target.closest('[data-action]'); if (!btn) return;
  const id = Number(btn.closest('.card').dataset.id);
  if (btn.dataset.action === 'view') openDetail(id);
  if (btn.dataset.action === 'wish') toggleWish(id);
  if (btn.dataset.action === 'add')  addToCart(id, byId(id).variants ? byId(id).variants.values[0] : '');
}

function init() {
  $('#year').textContent = new Date().getFullYear();
  load();
  renderCategoryStrip(); renderBrands(); renderCarousel(); renderDeals(); renderProducts(); renderRecent();
  renderCart(); updateWishCount(); syncControls();

  $('#foot-cats').innerHTML = CATEGORIES.map(c => `<li><button data-cat="${c.id}">${c.id}</button></li>`).join('');

  // Category buttons anywhere (strip, hero CTA, footer)
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    setCategory(b.dataset.cat); goShop();
  });

  // Filters
  const filters = $('#filters'), mq = window.matchMedia('(max-width: 1000px)');
  const syncOpen = () => { filters.open = !mq.matches; }; syncOpen(); mq.addEventListener('change', syncOpen);
  $('#price-range').addEventListener('input', e => { state.maxPrice = Number(e.target.value); state.visible = PAGE_SIZE; $('#price-value').textContent = money(state.maxPrice); renderProducts(); });
  $$('input[name="rating"]').forEach(r => r.addEventListener('change', () => { state.minRating = Number(r.value); state.visible = PAGE_SIZE; renderProducts(); }));
  $('#brand-group').addEventListener('change', e => {
    if (e.target.type !== 'checkbox') return;
    e.target.checked ? state.brands.add(e.target.value) : state.brands.delete(e.target.value);
    state.visible = PAGE_SIZE; renderProducts();
  });
  $('#clear-filters').addEventListener('click', clearFilters);
  $('#empty-reset').addEventListener('click', clearFilters);
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });
  $('#load-more').addEventListener('click', () => { state.visible += PAGE_SIZE; renderProducts(); });

  // Search (live while typing + on submit)
  const runSearch = v => { state.search = v; state.visible = PAGE_SIZE; renderProducts(); };
  $('#search').addEventListener('input', debounce(e => runSearch(e.target.value), 250));
  $('#search-form').addEventListener('submit', e => { e.preventDefault(); runSearch($('#search').value); goShop(); });

  // Remove a filter chip
  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('button[data-k]'); if (!b) return;
    const { k, v } = b.dataset;
    if (k === 'cat') state.category = 'all';
    if (k === 'brand') state.brands.delete(v);
    if (k === 'price') state.maxPrice = PRICE_MAX;
    if (k === 'rating') state.minRating = 0;
    if (k === 'wish') state.wishOnly = false;
    if (k === 'search') state.search = '';
    syncControls(); renderBrands(); renderProducts();
  });

  // Product grids
  ['#grid', '#deal-row', '#recent-row'].forEach(s => $(s).addEventListener('click', handleCardClick));

  // Header
  $('#cart-btn').addEventListener('click', openCart);
  $('#orders-btn').addEventListener('click', openOrders);
  $('#wish-btn').addEventListener('click', () => {
    state.wishOnly = !state.wishOnly; state.visible = PAGE_SIZE;
    if (state.wishOnly && !state.wish.size) toast('Tap the ♡ on any product to save it');
    syncControls(); renderProducts(); goShop();
  });

  // Dialogs
  $('#detail').addEventListener('click', onDetail);
  $('#detail').addEventListener('change', onDetail);
  $('#cart-lines').addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const key = b.closest('.cart-line').dataset.key, a = b.dataset.c;
    if (a === 'inc') changeQty(key, 1);
    if (a === 'dec') changeQty(key, -1);
    if (a === 'remove') removeLine(key);
    if (a === 'wish') moveToWish(key);
  });
  $('#coupon-form').addEventListener('submit', e => { e.preventDefault(); applyCoupon($('#coupon-input').value); });
  $('#checkout-btn').addEventListener('click', openCheckout);
  $('#place-order').addEventListener('click', placeOrder);
  $('#cf-orders').addEventListener('click', () => { $('#checkout-dialog').close(); openOrders(); });
  $$('#co-form input, #co-form textarea').forEach(f => f.addEventListener('input', () => {
    f.classList.remove('invalid');
    const err = document.getElementById('e-' + f.id.replace('c-', '')); if (err) err.textContent = '';
  }));

  // Shared dialog behaviour
  $$('dialog').forEach(dlg => {
    dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
    dlg.addEventListener('close', () => {
      if (!$$('dialog[open]').length) document.body.classList.remove('lock');
      if (dlg.id === 'product-dialog') state.detailId = null;
    });
    new MutationObserver(() => { if (dlg.open) document.body.classList.add('lock'); }).observe(dlg, { attributes: true, attributeFilter: ['open'] });
  });

  // Carousel
  $('#car-prev').addEventListener('click', () => { goSlide(car.i - 1); startCarousel(); });
  $('#car-next').addEventListener('click', () => { goSlide(car.i + 1); startCarousel(); });
  $('#dots').addEventListener('click', e => { const d = e.target.closest('[data-i]'); if (d) { goSlide(Number(d.dataset.i)); startCarousel(); } });
  const carEl = $('.carousel');
  carEl.addEventListener('mouseenter', stopCarousel); carEl.addEventListener('mouseleave', startCarousel);
  carEl.addEventListener('focusin', stopCarousel);    carEl.addEventListener('focusout', startCarousel);
  startCarousel();

  tickTimer(); setInterval(tickTimer, 1000);
}

document.addEventListener('DOMContentLoaded', init);
