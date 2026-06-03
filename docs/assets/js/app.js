const Omega = (() => {
  const LS = {
    cart: 'omega_official_cart_v1',
    session: 'omega_official_session_v1',
    theme: 'omega_official_theme_v1',
    lang: 'omega_official_lang_v1',
    users: 'omega_official_users_local_v1',
    products: 'omega_official_products_local_v1',
    orders: 'omega_official_orders_local_v1',
    seeded: 'omega_official_seeded_local_v1'
  };

  const config = window.OMEGA_SUPABASE || {};
  const isConfigured = Boolean(
    config.url &&
    config.anonKey &&
    !config.url.includes('PEGA_AQUI') &&
    !config.anonKey.includes('PEGA_AQUI') &&
    window.supabase
  );

  const db = isConfigured ? window.supabase.createClient(config.url, config.anonKey) : null;

  let adminChart = null;
  let currentOrderFilter = 'ALL';
  let current3DProductId = null;
  let state = {
    users: [],
    products: [],
    orders: [],
    loading: false
  };

  const money = (value) => `$${Number(value || 0).toFixed(2)}`;
  const nowDate = () => new Date().toISOString();
  const uid = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const esc = (text = '') => String(text).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const getLocal = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };
  const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));


  function seedLocalData() {
    if (localStorage.getItem(LS.seeded)) return;

    const initialUsers = [
      {
        id: 'u_admin', name: 'Administrador Omega', email: 'admin@omegafigures.com',
        passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
        role: 'ADMIN', phone: '+593000000000', address: 'Oficina principal', city: 'Quito', country: 'Ecuador',
        birthDate: '', interests: ['Estadísticas'], newsletter: false, createdAt: '2026-05-01T09:00:00.000Z'
      },
      {
        id: 'u_emp', name: 'Empleado Omega', email: 'empleado@omegafigures.com',
        passwordHash: 'ccc13e8ab0819e3ab61719de4071ecae6c1d3cd35dc48b91cad3481f20922f9f',
        role: 'EMPLEADO', phone: '+593000000001', address: 'Sucursal online', city: 'Quito', country: 'Ecuador',
        birthDate: '', interests: ['Gestión'], newsletter: false, createdAt: '2026-05-02T09:00:00.000Z'
      },
      {
        id: 'u_cli', name: 'Cliente Omega', email: 'cliente@omegafigures.com',
        passwordHash: '09a31a7001e261ab1e056182a71d3cf57f582ca9a29cff5eb83be0f0549730a9',
        role: 'CLIENTE', phone: '+593000000002', address: 'Dirección principal', city: 'Quito', country: 'Ecuador',
        birthDate: '', interests: ['Anime','Promociones'], newsletter: true, createdAt: '2026-05-03T09:00:00.000Z'
      }
    ];

    const initialProducts = [
      { id: 'p1', name: 'Cyberpunk Collector Bot', category: 'Figura', genre: 'Cyberpunk', description: 'Figura futurista con casco neón, acabado tecnológico y base decorativa.', price: 54.99, stock: 9, image: 'assets/img/figure-1.svg', active: true, featured: true, createdAt: nowDate() },
      { id: 'p2', name: 'Omega Ninja Shadow', category: 'Figura', genre: 'Anime', description: 'Figura ninja de colección con traje oscuro, armas decorativas y estilo moderno.', price: 39.99, stock: 12, image: 'assets/img/figure-2.svg', active: true, featured: true, createdAt: nowDate() },
      { id: 'p3', name: 'Retro Pixel Warrior', category: 'Coleccionable', genre: 'Retro', description: 'Figura inspirada en videojuegos clásicos, perfecta para amantes del estilo vintage.', price: 24.99, stock: 18, image: 'assets/img/figure-3.svg', active: true, featured: true, createdAt: nowDate() },
      { id: 'p4', name: 'Dragon Guardian Statue', category: 'Estatua', genre: 'Fantasía', description: 'Estatua de dragón con acabado de fantasía, textura detallada y base de exhibición.', price: 74.99, stock: 7, image: 'assets/img/figure-4.svg', active: true, featured: true, createdAt: nowDate() },
      { id: 'p5', name: 'Galaxy Space Ranger', category: 'Figura', genre: 'Ciencia ficción', description: 'Figura espacial con armadura brillante y detalles galácticos.', price: 64.50, stock: 11, image: 'assets/img/figure-5.svg', active: true, featured: false, createdAt: nowDate() },
      { id: 'p6', name: 'Samurai Flame Edition', category: 'Coleccionable', genre: 'Anime', description: 'Samurái edición especial con colores intensos y accesorios intercambiables.', price: 49.90, stock: 14, image: 'assets/img/figure-6.svg', active: true, featured: false, createdAt: nowDate() },
      { id: 'p7', name: 'Dark Knight Mini Statue', category: 'Estatua', genre: 'Héroes', description: 'Mini estatua de estilo oscuro para exhibición en escritorio o repisa.', price: 34.75, stock: 16, image: 'assets/img/figure-7.svg', active: true, featured: false, createdAt: nowDate() },
      { id: 'p8', name: 'Arcade Robot Classic', category: 'Figura', genre: 'Retro', description: 'Robot de colección con estética arcade y acabado brillante.', price: 29.99, stock: 20, image: 'assets/img/figure-8.svg', active: true, featured: false, createdAt: nowDate() }
    ];

    const initialOrders = [
      {
        id: 'o1', userId: 'u_cli', createdAt: '2026-05-04T11:20:00.000Z', status: 'PENDIENTE', total: 54.99,
        customerName: 'Cliente Omega', shippingPhone: '+593000000002', shippingAddress: 'Dirección principal', shippingCity: 'Quito', shippingCountry: 'Ecuador', shippingNotes: '', paymentMethod: 'CARD', paymentBrand: 'VISA', paymentLast4: '4242',
        items: [{ productId: 'p1', name: 'Cyberpunk Collector Bot', price: 54.99, quantity: 1, image: 'assets/img/figure-1.svg' }]
      },
      {
        id: 'o2', userId: 'u_cli', createdAt: '2026-05-05T15:45:00.000Z', status: 'APROBADA', total: 49.98,
        customerName: 'Cliente Omega', shippingPhone: '+593000000002', shippingAddress: 'Dirección principal', shippingCity: 'Quito', shippingCountry: 'Ecuador', shippingNotes: '', paymentMethod: 'TRANSFER', paymentBrand: 'TRANSFERENCIA', paymentLast4: '',
        items: [{ productId: 'p3', name: 'Retro Pixel Warrior', price: 24.99, quantity: 2, image: 'assets/img/figure-3.svg' }]
      }
    ];

    setLocal(LS.users, initialUsers);
    setLocal(LS.products, initialProducts);
    setLocal(LS.orders, initialOrders);
    localStorage.setItem(LS.seeded, 'true');
  }

  function loadLocalAll() {
    seedLocalData();
    state.users = getLocal(LS.users, []);
    state.products = getLocal(LS.products, []);
    state.orders = getLocal(LS.orders, []);
  }

  function saveLocalAll() {
    setLocal(LS.users, state.users);
    setLocal(LS.products, state.products);
    setLocal(LS.orders, state.orders);
  }

  const usingLocalData = () => !db;

  async function hashText(text) {
    const encoded = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function mapUser(row) {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      phone: row.phone || '',
      address: row.address || '',
      city: row.city || '',
      country: row.country || '',
      birthDate: row.birth_date || '',
      interests: row.interests || [],
      newsletter: Boolean(row.newsletter),
      createdAt: row.created_at
    };
  }

  function mapProduct(row) {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      genre: row.genre,
      description: row.description,
      price: Number(row.price || 0),
      stock: Number(row.stock || 0),
      image: row.image,
      active: Boolean(row.active),
      featured: Boolean(row.featured),
      createdAt: row.created_at
    };
  }

  function mapOrder(row) {
    const items = (row.order_items || []).map(i => ({
      productId: i.product_id,
      name: i.name,
      price: Number(i.price || 0),
      quantity: Number(i.quantity || 0),
      image: i.image
    }));
    return {
      id: row.id,
      userId: row.user_id,
      createdAt: row.created_at,
      status: row.status,
      total: Number(row.total || 0),
      customerName: row.customer_name || '',
      shippingPhone: row.shipping_phone || '',
      shippingAddress: row.shipping_address || '',
      shippingCity: row.shipping_city || '',
      shippingCountry: row.shipping_country || '',
      shippingNotes: row.shipping_notes || '',
      paymentMethod: row.payment_method || '',
      paymentBrand: row.payment_brand || '',
      paymentLast4: row.payment_last4 || '',
      items
    };
  }

  async function dbSelect(table, queryBuilder) {
    if (!db) throw new Error('Supabase no está configurado.');
    const query = queryBuilder ? queryBuilder(db.from(table)) : db.from(table).select('*');
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async function loadAll(showMessage = false) {
    if (!db) {
      loadLocalAll();
      if (showMessage) toast('Datos actualizados en modo local.', 'success');
      return;
    }

    try {
      state.loading = true;
      const [usersRows, productsRows, ordersRows] = await Promise.all([
        dbSelect('users', q => q.select('*').order('created_at', { ascending: false })),
        dbSelect('products', q => q.select('*').order('created_at', { ascending: false })),
        dbSelect('orders', q => q.select('*, order_items(*)').order('created_at', { ascending: false }))
      ]);

      state.users = usersRows.map(mapUser);
      state.products = productsRows.map(mapProduct);
      state.orders = ordersRows.map(mapOrder);

      if (showMessage) toast('Datos actualizados desde la base SQL.', 'success');
    } catch (error) {
      console.error(error);
      toast(`Error de base de datos: ${error.message}`, 'danger');
    } finally {
      state.loading = false;
    }
  }

  function renderDbWarning() {
    const message = `<div class="alert alert-warning rounded-4">
      <strong>Base de datos no configurada.</strong><br>
      Abre <code>docs/assets/js/supabase-config.js</code>, coloca tu <code>SUPABASE_URL</code> y tu <code>anon public key</code>. Después ejecuta el SQL incluido en <code>database/omegafiguresweb_supabase.sql</code>.
    </div>`;
    ['featuredProducts','productsGrid','cartItems','myOrdersList','employeeProductsTable','employeeOrdersTable','employeesTable'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = message;
    });
    document.getElementById('heroProductsCount').textContent = '0';
    document.getElementById('heroOrdersCount').textContent = '0';
    document.getElementById('productCountText').textContent = '0';
    updateNav();
  }

  const products = () => state.products;
  const users = () => state.users;
  const orders = () => state.orders;
  const cart = () => getLocal(LS.cart, []);
  const session = () => getLocal(LS.session, null);
  const currentUser = () => users().find(u => u.id === session()?.userId) || null;

  function toast(message, type = 'info') {
    const area = document.getElementById('toastArea');
    if (!area) return;
    const node = document.createElement('div');
    node.className = `omega-toast ${type}`;
    node.innerHTML = esc(message);
    area.appendChild(node);
    setTimeout(() => node.remove(), 4200);
  }

  async function navigate(route) {
    route = String(route || 'inicio').replace(/^#/, '');
    if (route.startsWith('page-')) route = route.slice(5);
    const valid = ['inicio', 'productos', 'experiencia3d', 'carrito', 'login', 'mis-compras', 'admin', 'empleado', 'contacto'];
    if (!valid.includes(route)) route = '404';

    updateNav();

    const user = currentUser();
    if (route === 'admin' && user?.role !== 'ADMIN') { toast('Acceso permitido solo para administrador.', 'danger'); route = user ? 'inicio' : 'login'; }
    if (route === 'empleado' && user?.role !== 'EMPLEADO') { toast('Acceso permitido solo para empleados.', 'danger'); route = user ? 'inicio' : 'login'; }
    if (route === 'mis-compras' && user?.role !== 'CLIENTE') { toast('Debes iniciar sesión como cliente.', 'danger'); route = user ? 'inicio' : 'login'; }

    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    document.getElementById(`page-${route}`)?.classList.add('active-section');
    document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.route === route));
    window.location.hash = route;
    await renderRoute(route);
    sharkSay(route === 'experiencia3d' ? '¡Bienvenido al visor 3D!' : route === 'carrito' ? 'Revisa tus productos antes del pago.' : route === 'productos' ? 'Puedes filtrar por género y precio.' : 'Estoy aquí para ayudarte.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function renderRoute(route) {
    updateNav();
    if (route === 'inicio') renderHome();
    if (route === 'productos') renderProducts();
    if (route === 'experiencia3d') render3DExperience();
    if (route === 'carrito') renderCart();
    if (route === 'mis-compras') renderMyOrders();
    if (route === 'admin') renderAdmin();
    if (route === 'empleado') renderEmployee();
    updateNav();
  }

  function updateNav() {
    const user = currentUser();
    document.querySelectorAll('.nav-admin').forEach(e => { e.hidden = user?.role !== 'ADMIN'; });
    document.querySelectorAll('.nav-employee').forEach(e => { e.hidden = user?.role !== 'EMPLEADO'; });
    document.querySelectorAll('.nav-client').forEach(e => { e.hidden = user?.role !== 'CLIENTE'; });

    const authText = document.getElementById('authText');
    if (authText) authText.textContent = user ? `${user.name.split(' ')[0]} (${user.role})` : 'Ingresar';

    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) cartBadge.textContent = cart().reduce((acc, item) => acc + item.quantity, 0);
  }

  async function openAuthOrLogout() {
    const user = currentUser();
    if (!user) return navigate('login');
    if (confirm(`Sesión activa: ${user.name}. ¿Deseas cerrar sesión?`)) {
      localStorage.removeItem(LS.session);
      toast('Sesión cerrada.', 'success');
      await renderAll();
      await navigate('inicio');
    }
  }

  function productCard(product) {
    return `<div class="col-sm-6 col-xl-3">
      <article class="product-card">
        <div class="product-image-wrap" onclick="Omega.openProduct('${product.id}')" role="button" tabindex="0">
          <img src="${esc(product.image)}" alt="${esc(product.name)}">
          <div class="product-image-overlay"><button class="btn btn-gradient" type="button">Ver detalles</button></div>
        </div>
        <div class="product-body">
          <div class="d-flex flex-wrap gap-2"><span class="badge-soft">${esc(product.genre)}</span><span class="badge-soft">${esc(product.category)}</span></div>
          <h3 class="product-title">${esc(product.name)}</h3>
          <p class="product-description">${esc(product.description)}</p>
          <div class="d-flex justify-content-between align-items-center mb-3"><span class="product-stock">Stock: ${product.stock}</span><span class="product-price">${money(product.price)}</span></div>
          <div class="d-flex gap-2 align-items-center justify-content-between flex-wrap">
            <div class="qty-control"><button class="qty-btn" onclick="Omega.changeQty(this,-1)" type="button">−</button><input class="qty-input" type="number" min="1" max="${product.stock}" value="1"><button class="qty-btn" onclick="Omega.changeQty(this,1)" type="button">+</button></div>
            <button class="btn btn-gradient" onclick="Omega.addToCart('${product.id}', this)" type="button"><i class="bi bi-cart-plus"></i></button>
          </div>
        </div>
      </article>
    </div>`;
  }


  function render3DExperience() {
    const active = products().filter(p => p.active);
    if (!active.length) return;
    if (!current3DProductId || !active.some(p => p.id === current3DProductId)) current3DProductId = active[0].id;
    const selected = active.find(p => p.id === current3DProductId) || active[0];
    const img = document.getElementById('viewer3DImage');
    if (!img) return;
    img.src = selected.image;
    img.alt = `Vista 3D de ${selected.name}`;
    document.getElementById('viewer3DTitle').textContent = selected.name;
    document.getElementById('viewer3DDescription').textContent = selected.description;
    document.getElementById('viewer3DGenre').textContent = selected.genre;
    document.getElementById('viewer3DCategory').textContent = selected.category;
    document.getElementById('viewer3DPrice').textContent = money(selected.price);
    const list = document.getElementById('viewer3DList');
    if (list) {
      list.innerHTML = active.slice(0, 8).map(p => `<button class="viewer-product-option ${p.id === selected.id ? 'active' : ''}" type="button" onclick="Omega.select3DProduct('${p.id}')">
        <img src="${esc(p.image)}" alt="${esc(p.name)}">
        <span><strong>${esc(p.name)}</strong><small>${esc(p.genre)} · ${money(p.price)}</small></span>
      </button>`).join('');
    }
  }

  function select3DProduct(productId) {
    current3DProductId = productId;
    render3DExperience();
    triggerSpring3D();
    toast('Modelo 3D actualizado.', 'success');
  }

  function move3DViewer(event) {
    const stage = document.getElementById('viewer3DStage');
    const obj = document.getElementById('viewer3DObject');
    if (!stage || !obj) return;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const rotateY = x * 18;
    const rotateX = -y * 14;
    obj.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  }

  function reset3DViewer() {
    const obj = document.getElementById('viewer3DObject');
    if (obj) obj.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
  }

  function triggerSpring3D() {
    const obj = document.getElementById('viewer3DObject');
    if (!obj) return;
    obj.classList.remove('spring-active');
    void obj.offsetWidth;
    obj.classList.add('spring-active');
    setTimeout(() => obj.classList.remove('spring-active'), 950);
  }

  function renderHome() {
    const active = products().filter(p => p.active);
    document.getElementById('heroProductsCount').textContent = active.length;
    document.getElementById('heroOrdersCount').textContent = orders().length;
    document.getElementById('featuredProducts').innerHTML = active.filter(p => p.featured).slice(0, 4).map(productCard).join('') || empty('No existen productos destacados.');
  }

  function fillSelect(id, values, allText) {
    const el = document.getElementById(id);
    if (!el) return;
    const current = el.value;
    el.innerHTML = `<option value="">${allText}</option>` + values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
    el.value = current;
  }

  function renderProducts() {
    const all = products().filter(p => p.active);
    fillSelect('genreFilter', [...new Set(all.map(p => p.genre))].sort(), 'Todos');
    fillSelect('categoryFilter', [...new Set(all.map(p => p.category))].sort(), 'Todas');
    const q = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
    const genre = document.getElementById('genreFilter')?.value || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const min = Number(document.getElementById('minPrice')?.value || 0);
    const maxRaw = document.getElementById('maxPrice')?.value;
    const max = maxRaw ? Number(maxRaw) : Infinity;
    const sort = document.getElementById('sortFilter')?.value || 'recommended';
    let list = all.filter(p => (!q || `${p.name} ${p.category} ${p.genre} ${p.description}`.toLowerCase().includes(q)) && (!genre || p.genre === genre) && (!category || p.category === category) && p.price >= min && p.price <= max);
    if (sort === 'priceAsc') list.sort((a,b) => a.price - b.price);
    if (sort === 'priceDesc') list.sort((a,b) => b.price - a.price);
    if (sort === 'nameAsc') list.sort((a,b) => a.name.localeCompare(b.name));
    document.getElementById('productCountText').textContent = list.length;
    document.getElementById('productsGrid').innerHTML = list.map(productCard).join('') || empty('No se encontraron productos con esos filtros.');
  }

  function clearFilters() {
    ['searchInput','genreFilter','categoryFilter','minPrice','maxPrice'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('sortFilter').value = 'recommended';
    renderProducts();
  }

  function changeQty(button, delta) {
    const input = button.closest('.qty-control').querySelector('.qty-input');
    const max = Number(input.max || 99);
    let value = Number(input.value || 1) + delta;
    if (value < 1) value = 1;
    if (value > max) value = max;
    input.value = value;
  }

  function addToCart(productId, button) {
    const product = products().find(p => p.id === productId && p.active);
    if (!product) return toast('Producto no disponible.', 'danger');
    const qty = Number(button.closest('.product-body').querySelector('.qty-input').value || 1);
    const c = cart();
    const existing = c.find(i => i.productId === productId);
    if (existing) existing.quantity = Math.min(product.stock, existing.quantity + qty);
    else c.push({ productId, quantity: Math.min(qty, product.stock) });
    setLocal(LS.cart, c);
    updateNav();
    toast('Producto agregado al carrito.', 'success');
  }

  function renderCart() {
    const list = cart().map(item => ({ ...item, product: products().find(p => p.id === item.productId) })).filter(i => i.product);
    if (!list.length) {
      document.getElementById('cartItems').innerHTML = empty('Tu carrito está vacío.');
      document.getElementById('cartSubtotal').textContent = money(0);
      document.getElementById('cartTotal').textContent = money(0);
      return;
    }
    document.getElementById('cartItems').innerHTML = list.map(i => `<div class="cart-item">
      <img src="${esc(i.product.image)}" alt="${esc(i.product.name)}">
      <div><h5>${esc(i.product.name)}</h5><p class="text-secondary mb-2">${esc(i.product.genre)} · ${money(i.product.price)}</p><div class="qty-control"><button class="qty-btn" onclick="Omega.updateCartQty('${i.productId}',-1)">−</button><input class="qty-input" value="${i.quantity}" readonly><button class="qty-btn" onclick="Omega.updateCartQty('${i.productId}',1)">+</button></div></div>
      <div class="cart-actions text-lg-end"><strong class="d-block fs-5 mb-2">${money(i.product.price * i.quantity)}</strong><button class="btn btn-soft btn-sm" onclick="Omega.removeCart('${i.productId}')"><i class="bi bi-trash"></i></button></div>
    </div>`).join('');
    const total = list.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    document.getElementById('cartSubtotal').textContent = money(total);
    document.getElementById('cartTotal').textContent = money(total);
  }

  function updateCartQty(productId, delta) {
    const c = cart();
    const item = c.find(i => i.productId === productId);
    const p = products().find(x => x.id === productId);
    if (!item || !p) return;
    item.quantity += delta;
    if (item.quantity <= 0) c.splice(c.indexOf(item), 1);
    if (item.quantity > p.stock) item.quantity = p.stock;
    setLocal(LS.cart, c);
    renderCart(); updateNav();
  }

  function removeCart(productId) {
    setLocal(LS.cart, cart().filter(i => i.productId !== productId));
    renderCart(); updateNav();
  }

  function getCartDetails() {
    const allProducts = products();
    return cart().map(i => {
      const product = allProducts.find(p => p.id === i.productId);
      return product ? { ...i, product } : null;
    }).filter(Boolean);
  }

  function getCartTotal(items = getCartDetails()) {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  function setInvalid(el, invalid) {
    if (!el) return;
    el.classList.toggle('is-invalid', Boolean(invalid));
  }

  function onlyDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }


  function calculateAge(dateValue) {
    if (!dateValue) return null;
    const birth = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  function isValidAge(dateValue, minAge, maxAge = 100) {
    const age = calculateAge(dateValue);
    return age !== null && age >= minAge && age <= maxAge;
  }

  function validFullName(value) {
    const text = String(value || '').trim().replace(/\s+/g, ' ');
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/.test(text);
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
  }

  function validPassword(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(String(value || ''));
  }

  function validOptionalId(value) {
    const digits = onlyDigits(value);
    return digits.length === 0 || (digits.length >= 8 && digits.length <= 15);
  }

  function formatCardNumber(value) {
    return onlyDigits(value).slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
  }

  function detectCardBrand(number) {
    const digits = onlyDigits(number);
    if (/^4/.test(digits)) return 'VISA';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'MASTERCARD';
    if (/^3[47]/.test(digits)) return 'AMEX';
    if (/^6(?:011|5)/.test(digits)) return 'DISCOVER';
    return 'CARD';
  }

  function validLuhn(number) {
    const digits = onlyDigits(number);
    if (digits.length < 13 || digits.length > 19) return false;
    if (/(\d)\1{12,}/.test(digits)) return false;
    const brand = detectCardBrand(digits);
    if (brand === 'CARD') return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = Number(digits[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  function formatExpiry(value) {
    const digits = onlyDigits(value).slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function validExpiry(value) {
    const match = String(value || '').match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = Number(match[1]);
    const year = Number(`20${match[2]}`);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const expiry = new Date(year, month, 0, 23, 59, 59);
    const maxExpiry = new Date(now.getFullYear() + 10, now.getMonth() + 1, 0, 23, 59, 59);
    return expiry >= now && expiry <= maxExpiry;
  }

  function updateCardPreview() {
    const numberInput = document.getElementById('cardNumber');
    const nameInput = document.getElementById('cardName');
    const number = numberInput?.value || '';
    const digits = onlyDigits(number);
    const brand = detectCardBrand(number);
    const previewNumber = digits
      ? formatCardNumber(digits.padEnd(16, '•')).replace(/•/g, '•')
      : '•••• •••• •••• ••••';
    document.getElementById('cardPreviewNumber').textContent = previewNumber;
    document.getElementById('cardPreviewName').textContent = (nameInput?.value || 'NOMBRE APELLIDO').toUpperCase();
    document.getElementById('cardBrandBadge').textContent = brand;
    updatePaymentValidationHint();
  }


  function updatePaymentValidationHint() {
    const hint = document.getElementById('cardValidationHint');
    const number = document.getElementById('cardNumber')?.value || '';
    if (!hint) return;
    const digits = onlyDigits(number);
    if (!digits.length) {
      hint.className = 'payment-validation-hint mt-2';
      hint.textContent = 'Usa una tarjeta válida. Ejemplo de prueba: 4242 4242 4242 4242.';
      return;
    }
    const brand = detectCardBrand(number);
    if (validLuhn(number)) {
      hint.className = 'payment-validation-hint mt-2 valid';
      hint.textContent = `Tarjeta ${brand} válida. Se guardarán solo los últimos 4 dígitos.`;
    } else {
      hint.className = 'payment-validation-hint mt-2 invalid';
      hint.textContent = 'El número no supera la validación Luhn. Revisa los dígitos.';
    }
  }

  function togglePaymentFields() {
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'CARD';
    document.getElementById('cardFields')?.classList.toggle('d-none', method !== 'CARD');
    document.getElementById('transferFields')?.classList.toggle('d-none', method !== 'TRANSFER');
    document.querySelectorAll('.payment-method').forEach(label => {
      const input = label.querySelector('input');
      label.classList.toggle('active', input?.checked);
    });
  }

  function renderCheckoutSummary() {
    const items = getCartDetails();
    const box = document.getElementById('checkoutSummaryItems');
    if (!box) return;
    box.innerHTML = items.map(item => `<div class="checkout-summary-item">
      <img src="${esc(item.product.image)}" alt="${esc(item.product.name)}">
      <div class="flex-grow-1">
        <strong>${esc(item.product.name)}</strong>
        <small>${item.quantity} x ${money(item.product.price)}</small>
      </div>
      <span>${money(item.product.price * item.quantity)}</span>
    </div>`).join('');
    const total = getCartTotal(items);
    document.getElementById('checkoutSubtotal').textContent = money(total);
    document.getElementById('checkoutShipping').textContent = money(0);
    document.getElementById('checkoutTotal').textContent = money(total);
  }

  function prefillCheckoutForm() {
    const user = currentUser();
    if (!user) return;
    document.getElementById('checkoutName').value = user.name || '';
    document.getElementById('checkoutPhone').value = user.phone || '';
    document.getElementById('checkoutAddress').value = user.address || '';
    document.getElementById('checkoutCity').value = user.city || '';
    document.getElementById('checkoutCountry').value = user.country || 'Ecuador';
    document.getElementById('cardName').value = user.name || '';
    document.getElementById('payerBirth').value = user.birthDate || user.birth_date || '';
    document.getElementById('payerId').value = '';
    document.getElementById('checkoutNotes').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cardExpiry').value = '';
    document.getElementById('cardCvv').value = '';
    document.getElementById('checkoutTerms').checked = false;
    document.querySelectorAll('#checkoutForm .is-invalid, #checkoutForm .is-valid').forEach(el => el.classList.remove('is-invalid', 'is-valid'));
    updateCardPreview();
    togglePaymentFields();
  }

  function openCheckout() {
    if (!db) return toast('Configura la base de datos antes de finalizar compras.', 'danger');
    const user = currentUser();
    if (!user || user.role !== 'CLIENTE') {
      toast('Debes iniciar sesión como cliente para finalizar la compra.', 'danger');
      return navigate('login');
    }
    if (!cart().length) return toast('El carrito está vacío.', 'danger');
    prefillCheckoutForm();
    renderCheckoutSummary();
    bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModal')).show();
  }

  function validateCheckoutForm() {
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'CARD';
    let valid = true;
    const checkoutName = document.getElementById('checkoutName');
    const checkoutPhone = document.getElementById('checkoutPhone');
    const checkoutAddress = document.getElementById('checkoutAddress');
    const checkoutCity = document.getElementById('checkoutCity');
    const checkoutCountry = document.getElementById('checkoutCountry');

    const validations = [
      [checkoutName, String(checkoutName?.value || '').trim().length < 3],
      [checkoutPhone, onlyDigits(checkoutPhone?.value).length < 9],
      [checkoutAddress, String(checkoutAddress?.value || '').trim().length < 8],
      [checkoutCity, String(checkoutCity?.value || '').trim().length < 2],
      [checkoutCountry, String(checkoutCountry?.value || '').trim().length < 2]
    ];
    validations.forEach(([el, invalid]) => {
      setInvalid(el, invalid);
      el?.classList.toggle('is-valid', !invalid);
      if (invalid) valid = false;
    });

    if (method === 'CARD') {
      const cardName = document.getElementById('cardName');
      const payerBirth = document.getElementById('payerBirth');
      const payerId = document.getElementById('payerId');
      const cardNumber = document.getElementById('cardNumber');
      const cardExpiry = document.getElementById('cardExpiry');
      const cardCvv = document.getElementById('cardCvv');
      const cardNameInvalid = !validFullName(cardName.value);
      const payerBirthInvalid = !isValidAge(payerBirth.value, 18, 100);
      const payerIdInvalid = !validOptionalId(payerId.value);
      const cardNumberInvalid = !validLuhn(cardNumber.value);
      const cardExpiryInvalid = !validExpiry(cardExpiry.value);
      const cvvDigits = onlyDigits(cardCvv.value);
      const brand = detectCardBrand(cardNumber.value);
      const requiredCvvLength = brand === 'AMEX' ? 4 : 3;
      const cardCvvInvalid = cvvDigits.length !== requiredCvvLength || /^0+$/.test(cvvDigits);
      [
        [cardName, cardNameInvalid],
        [payerBirth, payerBirthInvalid],
        [payerId, payerIdInvalid],
        [cardNumber, cardNumberInvalid],
        [cardExpiry, cardExpiryInvalid],
        [cardCvv, cardCvvInvalid]
      ].forEach(([el, invalid]) => {
        setInvalid(el, invalid);
        el?.classList.toggle('is-valid', !invalid);
        if (invalid) valid = false;
      });
    }

    const terms = document.getElementById('checkoutTerms');
    setInvalid(terms, !terms.checked);
    if (!terms.checked) valid = false;
    return valid;
  }

  async function checkout() {
    if (!validateCheckoutForm()) {
      toast('Revisa los datos de entrega y pago antes de continuar.', 'danger');
      return;
    }

    const user = currentUser();
    if (!user || user.role !== 'CLIENTE') {
      toast('Debes iniciar sesión como cliente para finalizar la compra.', 'danger');
      return navigate('login');
    }

    const c = cart();
    if (!c.length) return toast('El carrito está vacío.', 'danger');

    const items = getCartDetails().map(i => ({
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.image,
      stock: i.product.stock
    }));

    const insufficient = items.find(i => i.quantity > i.stock);
    if (insufficient) return toast(`No hay stock suficiente para ${insufficient.name}.`, 'danger');

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'CARD';
    const cardNumber = document.getElementById('cardNumber').value;
    const paymentLast4 = paymentMethod === 'CARD' ? onlyDigits(cardNumber).slice(-4) : null;
    const paymentBrand = paymentMethod === 'CARD' ? detectCardBrand(cardNumber) : 'TRANSFERENCIA';

    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const orderId = uid('order');
    const submitBtn = document.getElementById('checkoutSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';

    try {
      const orderPayload = {
        id: orderId,
        user_id: user.id,
        created_at: nowDate(),
        status: 'PENDIENTE',
        total,
        customer_name: document.getElementById('checkoutName').value.trim(),
        shipping_phone: document.getElementById('checkoutPhone').value.trim(),
        shipping_address: document.getElementById('checkoutAddress').value.trim(),
        shipping_city: document.getElementById('checkoutCity').value.trim(),
        shipping_country: document.getElementById('checkoutCountry').value.trim(),
        shipping_notes: document.getElementById('checkoutNotes').value.trim(),
        payment_method: paymentMethod,
        payment_brand: paymentBrand,
        payment_last4: paymentLast4
      };

      if (db) {
        const { error: orderError } = await db.from('orders').insert(orderPayload);
        if (orderError) throw orderError;

        const rows = items.map(i => ({ order_id: orderId, product_id: i.productId, name: i.name, price: i.price, quantity: i.quantity, image: i.image }));
        const { error: itemError } = await db.from('order_items').insert(rows);
        if (itemError) throw itemError;

        for (const item of items) {
          const newStock = Math.max(0, item.stock - item.quantity);
          const { error: stockError } = await db.from('products').update({ stock: newStock }).eq('id', item.productId);
          if (stockError) throw stockError;
        }
        await loadAll();
      } else {
        const localOrder = {
          id: orderPayload.id,
          userId: orderPayload.user_id,
          createdAt: orderPayload.created_at,
          status: orderPayload.status,
          total: orderPayload.total,
          customerName: orderPayload.customer_name,
          shippingPhone: orderPayload.shipping_phone,
          shippingAddress: orderPayload.shipping_address,
          shippingCity: orderPayload.shipping_city,
          shippingCountry: orderPayload.shipping_country,
          shippingNotes: orderPayload.shipping_notes,
          paymentMethod: orderPayload.payment_method,
          paymentBrand: orderPayload.payment_brand,
          paymentLast4: orderPayload.payment_last4,
          items: items.map(i => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity, image: i.image }))
        };
        state.orders.unshift(localOrder);
        items.forEach(item => {
          const p = state.products.find(product => product.id === item.productId);
          if (p) p.stock = Math.max(0, p.stock - item.quantity);
        });
        saveLocalAll();
      }

      setLocal(LS.cart, []);
      bootstrap.Modal.getInstance(document.getElementById('checkoutModal'))?.hide();
      toast(`Compra registrada correctamente. Pago: ${paymentBrand}${paymentLast4 ? ` •••• ${paymentLast4}` : ''}.`, 'success');
      await renderAll();
      await navigate('mis-compras');
    } catch (error) {
      console.error(error);
      toast(`No se pudo registrar la compra: ${error.message}`, 'danger');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-lock-fill me-2"></i>Confirmar compra';
    }
  }

  function renderMyOrders() {
    const user = currentUser();
    if (!user) return;
    let list = orders().filter(o => o.userId === user.id);
    if (currentOrderFilter !== 'ALL') list = list.filter(o => o.status === currentOrderFilter);
    document.getElementById('myOrdersList').innerHTML = list.map(orderCard).join('') || empty('No tienes compras en esta categoría.');
  }

  function orderCard(order, actions = false) {
    return `<article class="order-card">
      <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap"><div><h5>Orden ${esc(order.id)}</h5><p class="text-secondary mb-0">${new Date(order.createdAt).toLocaleString()}</p></div><span class="status-badge status-${order.status}">${order.status}</span></div>
      <hr class="border-secondary-subtle">
      ${order.items.map(i => `<div class="d-flex justify-content-between gap-3 mb-2"><span>${esc(i.name)} x ${i.quantity}</span><strong>${money(i.price * i.quantity)}</strong></div>`).join('')}
      <div class="order-meta-grid mt-3">
        ${order.shippingAddress ? `<span><i class="bi bi-geo-alt"></i> ${esc(order.shippingCity || '')} · ${esc(order.shippingAddress)}</span>` : ''}
        ${order.paymentMethod ? `<span><i class="bi bi-credit-card"></i> ${esc(order.paymentBrand || order.paymentMethod)}${order.paymentLast4 ? ` •••• ${esc(order.paymentLast4)}` : ''}</span>` : ''}
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3"><strong>Total: ${money(order.total)}</strong>${actions ? orderActions(order) : ''}</div>
    </article>`;
  }

  function orderActions(order) {
    return `<div class="d-flex gap-2 flex-wrap"><button class="btn btn-soft btn-sm" onclick="Omega.setOrderStatus('${order.id}','APROBADA')">Aprobar</button><button class="btn btn-soft btn-sm" onclick="Omega.setOrderStatus('${order.id}','RECHAZADA')">Rechazar</button><button class="btn btn-soft btn-sm" onclick="Omega.setOrderStatus('${order.id}','ENVIADA')">Enviada</button></div>`;
  }

  function renderAdmin() {
    const allOrders = orders();
    const clientes = users().filter(u => u.role === 'CLIENTE');
    const approved = allOrders.filter(o => ['APROBADA','ENVIADA'].includes(o.status));
    const totalSales = approved.reduce((acc, o) => acc + o.total, 0);
    const rendimiento = allOrders.length ? Math.round((approved.length / allOrders.length) * 100) : 0;
    document.getElementById('adminStatsCards').innerHTML = [
      ['bi-bag-check','Compras', allOrders.length], ['bi-people','Nuevos clientes', clientes.length], ['bi-currency-dollar','Ventas', money(totalSales)], ['bi-speedometer2','Rendimiento', `${rendimiento}%`]
    ].map(([icon,label,value]) => `<div class="col-md-6 col-xl-3"><div class="stat-card"><div class="icon"><i class="bi ${icon}"></i></div><h3>${value}</h3><p>${label}</p></div></div>`).join('');
    renderChart();
    renderEmployeesTable();
  }

  function renderChart() {
    const metric = document.getElementById('adminMetric').value;
    const labels = document.getElementById('adminPeriod').value === 'semana' ? ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'] : document.getElementById('adminPeriod').value === 'mes' ? ['S1','S2','S3','S4'] : ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const allOrders = orders();
    const clients = users().filter(u => u.role === 'CLIENTE');
    let data;
    if (metric === 'compras') data = labels.map((_, i) => allOrders.filter((__, idx) => idx % labels.length === i).length);
    else if (metric === 'clientes') data = labels.map((_, i) => clients.filter((__, idx) => idx % labels.length === i).length);
    else data = labels.map((_, i) => Math.min(100, 70 + (i * 3) + allOrders.filter(o => ['APROBADA','ENVIADA'].includes(o.status)).length));
    const ctx = document.getElementById('adminChart');
    if (!ctx || !window.Chart) return;
    if (adminChart) adminChart.destroy();
    adminChart = new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: metric, data, tension: .35, fill: true }] }, options: { responsive: true, plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text') } } }, scales: { x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--muted') } }, y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--muted') } } } } });
  }

  function renderEmployeesTable() {
    const emps = users().filter(u => u.role === 'EMPLEADO');
    document.getElementById('employeesTable').innerHTML = table(['Nombre','Correo','Teléfono','Creado'], emps.map(e => [e.name, e.email, e.phone || '-', new Date(e.createdAt).toLocaleDateString()]));
  }

  function renderEmployee() {
    const prods = products();
    document.getElementById('employeeProductsTable').innerHTML = table(['Producto','Género','Precio','Stock','Estado','Acciones'], prods.map(p => [p.name, p.genre, money(p.price), p.stock, p.active ? 'Activo' : 'Inactivo', `<button class="btn btn-soft btn-sm" onclick="Omega.editProduct('${p.id}')">Editar</button> <button class="btn btn-soft btn-sm" onclick="Omega.toggleProduct('${p.id}')">${p.active ? 'Desactivar' : 'Activar'}</button>`]));
    const pending = orders().filter(o => o.status === 'PENDIENTE');
    document.getElementById('employeeOrdersTable').innerHTML = pending.map(o => orderCard(o, true)).join('') || empty('No hay pedidos pendientes.');
  }

  function table(headers, rows) {
    if (!rows.length) return empty('No hay información registrada.');
    return `<div class="table-responsive"><table class="table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function openProduct(productId) {
    const p = products().find(x => x.id === productId);
    if (!p) return;
    document.getElementById('productModalContent').innerHTML = `<div class="row g-4 align-items-center"><div class="col-lg-6"><img class="modal-product-img" src="${esc(p.image)}" alt="${esc(p.name)}"></div><div class="col-lg-6"><div class="d-flex gap-2 flex-wrap mb-3"><span class="badge-soft">${esc(p.genre)}</span><span class="badge-soft">${esc(p.category)}</span></div><h2 class="fw-bold">${esc(p.name)}</h2><p class="text-secondary fs-5">${esc(p.description)}</p><div class="d-flex justify-content-between my-4"><span>Stock: <strong>${p.stock}</strong></span><span class="product-price">${money(p.price)}</span></div><button class="btn btn-gradient btn-lg" data-bs-dismiss="modal" onclick="Omega.quickAdd('${p.id}')">Agregar al carrito</button></div></div>`;
    bootstrap.Modal.getOrCreateInstance(document.getElementById('productModal')).show();
  }

  function quickAdd(productId) {
    const body = document.createElement('div');
    body.innerHTML = `<div class="product-body"><input class="qty-input" value="1"></div>`;
    addToCart(productId, { closest: () => body.querySelector('.product-body') });
  }

  async function login(email, password) {
    const hash = await hashText(password);
    const user = users().find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hash);
    if (!user) return toast('Correo o contraseña incorrectos.', 'danger');
    setLocal(LS.session, { userId: user.id, loginAt: nowDate() });
    toast(`Bienvenido/a ${user.name}.`, 'success');
    await renderAll();
    await navigate(user.role === 'ADMIN' ? 'admin' : user.role === 'EMPLEADO' ? 'empleado' : 'productos');
  }

  function fillLogin(email, password) {
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = password;
  }

  async function register() {
    const form = document.getElementById('registerForm');
    form.querySelectorAll('.is-invalid, .is-valid').forEach(el => el.classList.remove('is-invalid', 'is-valid'));
    document.getElementById('regPasswordFeedback')?.classList.add('d-none');
    document.getElementById('regConfirmFeedback')?.classList.add('d-none');

    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const name = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const phone = document.getElementById('regPhone');
    const birth = document.getElementById('regBirth');
    const city = document.getElementById('regCity');
    const country = document.getElementById('regCountry');
    const address = document.getElementById('regAddress');
    const passwordInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirm');
    const email = emailInput.value.trim();

    const checks = [
      [name, !validFullName(name.value)],
      [emailInput, !validEmail(email)],
      [phone, phone.value.trim() && onlyDigits(phone.value).length < 9],
      [birth, !isValidAge(birth.value, 13, 100)],
      [city, String(city.value || '').trim().length < 2],
      [country, String(country.value || '').trim().length < 2],
      [address, String(address.value || '').trim().length < 6],
      [passwordInput, !validPassword(password)],
      [confirmInput, password !== confirm]
    ];

    let formValid = true;
    checks.forEach(([el, invalid]) => {
      setInvalid(el, invalid);
      el?.classList.toggle('is-valid', !invalid);
      if (invalid) formValid = false;
    });
    if (!validPassword(password)) document.getElementById('regPasswordFeedback')?.classList.remove('d-none');
    if (password !== confirm) document.getElementById('regConfirmFeedback')?.classList.remove('d-none');
    if (!formValid) return toast('Revisa los datos del registro antes de crear la cuenta.', 'danger');
    if (users().some(u => u.email.toLowerCase() === email.toLowerCase())) return toast('El correo ya existe.', 'danger');
    const interests = [...document.querySelectorAll('#registerForm .interest-grid input:checked')].map(i => i.value);
    const id = uid('user');
    const passwordHash = await hashText(password);
    const row = {
      id,
      name: name.value.trim().replace(/\s+/g, ' '),
      email,
      password_hash: passwordHash,
      role: 'CLIENTE',
      phone: phone.value.trim(),
      address: address.value.trim(),
      city: city.value.trim(),
      country: country.value.trim(),
      birth_date: birth.value || null,
      interests,
      newsletter: document.getElementById('regNewsletter').checked,
      created_at: nowDate()
    };
    if (db) {
      const { error } = await db.from('users').insert(row);
      if (error) return toast(`No se pudo crear la cuenta: ${error.message}`, 'danger');
    } else {
      state.users.unshift(mapUser(row));
      saveLocalAll();
    }
    setLocal(LS.session, { userId: id, loginAt: nowDate() });
    toast('Cuenta creada correctamente.', 'success');
    document.getElementById('registerForm').reset();
    await loadAll();
    await renderAll();
    await navigate('productos');
  }

  function showEmployeeModal() {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('employeeModal')).show();
  }

  async function createEmployee() {
    const email = document.getElementById('empEmail').value.trim();
    if (users().some(u => u.email.toLowerCase() === email.toLowerCase())) return toast('El correo ya existe.', 'danger');
    const row = {
      id: uid('emp'),
      name: document.getElementById('empName').value.trim(),
      email,
      password_hash: await hashText(document.getElementById('empPassword').value),
      role: 'EMPLEADO',
      phone: document.getElementById('empPhone').value.trim(),
      address: '',
      city: '',
      country: 'Ecuador',
      birth_date: null,
      interests: ['Gestión de tienda'],
      newsletter: false,
      created_at: nowDate()
    };
    if (db) {
      const { error } = await db.from('users').insert(row);
      if (error) return toast(`No se pudo crear empleado: ${error.message}`, 'danger');
    } else {
      state.users.unshift(mapUser(row));
      saveLocalAll();
    }
    document.getElementById('employeeForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
    toast('Empleado creado correctamente.', 'success');
    await loadAll();
    renderAdmin();
  }

  async function saveProduct() {
    const id = document.getElementById('prodId').value || uid('prod');
    const product = {
      id,
      name: document.getElementById('prodName').value.trim(),
      category: document.getElementById('prodCategory').value.trim(),
      genre: document.getElementById('prodGenre').value.trim(),
      price: Number(document.getElementById('prodPrice').value),
      stock: Number(document.getElementById('prodStock').value),
      image: document.getElementById('prodImage').value.trim() || 'assets/img/figure-1.svg',
      description: document.getElementById('prodDesc').value.trim(),
      active: document.getElementById('prodActive').checked,
      featured: products().find(p => p.id === id)?.featured || false
    };
    if (db) {
      const { error } = await db.from('products').upsert(product, { onConflict: 'id' });
      if (error) return toast(`No se pudo guardar producto: ${error.message}`, 'danger');
    } else {
      const normalized = mapProduct({
        id: product.id,
        name: product.name,
        category: product.category,
        genre: product.genre,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        active: product.active,
        featured: product.featured,
        created_at: products().find(p => p.id === id)?.createdAt || nowDate()
      });
      const index = state.products.findIndex(p => p.id === id);
      if (index >= 0) state.products[index] = normalized;
      else state.products.unshift(normalized);
      saveLocalAll();
    }
    clearProductForm();
    toast('Producto guardado en la base SQL.', 'success');
    await loadAll();
    renderEmployee();
    renderProducts();
  }

  function editProduct(id) {
    const p = products().find(x => x.id === id);
    if (!p) return;
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodName').value = p.name;
    document.getElementById('prodCategory').value = p.category;
    document.getElementById('prodGenre').value = p.genre;
    document.getElementById('prodPrice').value = p.price;
    document.getElementById('prodStock').value = p.stock;
    document.getElementById('prodImage').value = p.image;
    document.getElementById('prodDesc').value = p.description;
    document.getElementById('prodActive').checked = p.active;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearProductForm() {
    document.getElementById('productForm')?.reset();
    document.getElementById('prodId').value = '';
    document.getElementById('prodActive').checked = true;
  }

  async function toggleProduct(id) {
    const p = products().find(x => x.id === id);
    if (!p) return;
    if (db) {
      const { error } = await db.from('products').update({ active: !p.active }).eq('id', id);
      if (error) return toast(`No se pudo actualizar producto: ${error.message}`, 'danger');
      await loadAll();
    } else {
      p.active = !p.active;
      saveLocalAll();
    }
    renderEmployee();
    renderProducts();
    toast('Estado actualizado.', 'success');
  }

  async function setOrderStatus(id, status) {
    if (db) {
      const { error } = await db.from('orders').update({ status }).eq('id', id);
      if (error) return toast(`No se pudo actualizar pedido: ${error.message}`, 'danger');
      await loadAll();
    } else {
      const order = state.orders.find(o => o.id === id);
      if (order) order.status = status;
      saveLocalAll();
    }
    renderEmployee();
    toast(`Pedido marcado como ${status}.`, 'success');
  }

  function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
  }


  function toggleSharkMessage() {
    const shark = document.getElementById('sharkMascot');
    const bubble = document.getElementById('sharkBubble');
    if (!shark || !bubble) return;
    const user = currentUser();
    const tips = [
      'Recuerda revisar la cantidad antes de pagar.',
      'Puedes explorar las figuras en el apartado 3D.',
      user ? `¡Hola ${user.name.split(' ')[0]}! Tu rol actual es ${user.role}.` : 'Inicia sesión para guardar tus compras.',
      'Omega Shark vigila que el carrito esté listo.'
    ];
    bubble.textContent = tips[Math.floor(Math.random() * tips.length)];
    shark.classList.toggle('show-message');
    if (shark.classList.contains('show-message')) setTimeout(() => shark.classList.remove('show-message'), 4200);
  }

  function sharkSay(message) {
    const shark = document.getElementById('sharkMascot');
    const bubble = document.getElementById('sharkBubble');
    if (!shark || !bubble) return;
    bubble.textContent = message;
    shark.classList.add('show-message');
    setTimeout(() => shark.classList.remove('show-message'), 3600);
  }

  function empty(text) { return `<div class="empty-state">${esc(text)}</div>`; }

  function applyTheme() {
    const theme = localStorage.getItem(LS.theme) || 'dark';
    document.body.classList.toggle('light-mode', theme === 'light');
    document.getElementById('themeToggle').innerHTML = theme === 'light' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  }

  async function renderAll() {
    updateNav();
    renderHome(); renderProducts(); renderCart(); render3DExperience();
  }

  async function refreshData() {
    await loadAll(true);
    await renderAll();
    const rawRoute = window.location.hash.replace('#', '') || 'inicio';
    const route = rawRoute.startsWith('page-') ? rawRoute.slice(5) : rawRoute;
    await renderRoute(route);
  }

  function initEvents() {
    ['searchInput','genreFilter','categoryFilter','minPrice','maxPrice','sortFilter'].forEach(id => document.getElementById(id)?.addEventListener('input', renderProducts));
    document.getElementById('loginForm')?.addEventListener('submit', async e => { e.preventDefault(); await login(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value); });
    document.getElementById('registerForm')?.addEventListener('submit', async e => { e.preventDefault(); await register(); });
    ['regName','regEmail','regPhone','regBirth','regCity','regCountry','regAddress','regPassword','regConfirm'].forEach(id => document.getElementById(id)?.addEventListener('input', e => e.target.classList.remove('is-invalid')));
    document.getElementById('employeeForm')?.addEventListener('submit', async e => { e.preventDefault(); await createEmployee(); });
    document.getElementById('productForm')?.addEventListener('submit', async e => { e.preventDefault(); await saveProduct(); });
    document.getElementById('checkoutForm')?.addEventListener('submit', async e => { e.preventDefault(); await checkout(); });
    document.querySelectorAll('input[name="paymentMethod"]').forEach(input => input.addEventListener('change', togglePaymentFields));
    document.getElementById('cardNumber')?.addEventListener('input', e => { e.target.value = formatCardNumber(e.target.value); updateCardPreview(); setInvalid(e.target, onlyDigits(e.target.value).length >= 13 && !validLuhn(e.target.value)); });
    document.getElementById('cardExpiry')?.addEventListener('input', e => { e.target.value = formatExpiry(e.target.value); setInvalid(e.target, e.target.value.length === 5 && !validExpiry(e.target.value)); });
    document.getElementById('cardCvv')?.addEventListener('input', e => { e.target.value = onlyDigits(e.target.value).slice(0, 4); const brand = detectCardBrand(document.getElementById('cardNumber')?.value || ''); const len = brand === 'AMEX' ? 4 : 3; setInvalid(e.target, e.target.value.length > 0 && (e.target.value.length !== len || /^0+$/.test(e.target.value))); });
    document.getElementById('cardName')?.addEventListener('input', e => { updateCardPreview(); setInvalid(e.target, e.target.value.trim().length > 0 && !validFullName(e.target.value)); });
    document.getElementById('payerBirth')?.addEventListener('change', e => setInvalid(e.target, e.target.value && !isValidAge(e.target.value, 18, 100)));
    document.getElementById('payerId')?.addEventListener('input', e => { e.target.value = onlyDigits(e.target.value).slice(0, 15); setInvalid(e.target, !validOptionalId(e.target.value)); });
    document.getElementById('themeToggle')?.addEventListener('click', () => { localStorage.setItem(LS.theme, document.body.classList.contains('light-mode') ? 'dark' : 'light'); applyTheme(); if (adminChart) renderChart(); });
    document.getElementById('adminMetric')?.addEventListener('change', renderChart);
    document.getElementById('adminPeriod')?.addEventListener('change', renderChart);
    document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', e => { const route = el.dataset.route; if (route) { e.preventDefault(); navigate(route); } }));
    document.querySelectorAll('[data-order-filter]').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('[data-order-filter]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentOrderFilter = btn.dataset.orderFilter; renderMyOrders(); }));
    if (document.getElementById('languageSelect')) document.getElementById('languageSelect').value = localStorage.getItem(LS.lang) || 'es';
    document.getElementById('languageSelect')?.addEventListener('change', e => { localStorage.setItem(LS.lang, e.target.value); toast(e.target.value === 'en' ? 'Language saved.' : 'Idioma guardado.', 'success'); });
  }

  async function init() {
    applyTheme();
    initEvents();
    updateNav();
    await loadAll();
    await renderAll();
    const initialRaw = window.location.hash.replace('#', '') || 'inicio';
    const initial = initialRaw.startsWith('page-') ? initialRaw.slice(5) : initialRaw;
    await navigate(initial);
  }

  return { init, navigate, openAuthOrLogout, clearFilters, changeQty, addToCart, updateCartQty, removeCart, openCheckout, checkout, openProduct, quickAdd, fillLogin, togglePassword, showEmployeeModal, editProduct, clearProductForm, toggleProduct, setOrderStatus, refreshData, render3DExperience, select3DProduct, move3DViewer, reset3DViewer, triggerSpring3D, toggleSharkMessage };
})();

document.addEventListener('DOMContentLoaded', Omega.init);
