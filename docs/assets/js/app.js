const Omega = (() => {
  const LS = {
    cart: 'omega_official_cart_v1',
    session: 'omega_official_session_v1',
    theme: 'omega_official_theme_v1',
    lang: 'omega_official_lang_v1'
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
      renderDbWarning();
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
    const valid = ['inicio', 'productos', 'carrito', 'login', 'mis-compras', 'admin', 'empleado', 'contacto'];
    if (!valid.includes(route)) route = '404';
    const user = currentUser();
    if (route === 'admin' && user?.role !== 'ADMIN') { toast('Acceso permitido solo para administrador.', 'danger'); route = user ? 'inicio' : 'login'; }
    if (route === 'empleado' && user?.role !== 'EMPLEADO') { toast('Acceso permitido solo para empleados.', 'danger'); route = user ? 'inicio' : 'login'; }
    if (route === 'mis-compras' && user?.role !== 'CLIENTE') { toast('Debes iniciar sesión como cliente.', 'danger'); route = user ? 'inicio' : 'login'; }

    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    document.getElementById(`page-${route}`)?.classList.add('active-section');
    document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.route === route));
    window.location.hash = route;
    await renderRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function renderRoute(route) {
    if (!db) { renderDbWarning(); return; }
    if (route === 'inicio') renderHome();
    if (route === 'productos') renderProducts();
    if (route === 'carrito') renderCart();
    if (route === 'mis-compras') renderMyOrders();
    if (route === 'admin') renderAdmin();
    if (route === 'empleado') renderEmployee();
    updateNav();
  }

  function updateNav() {
    const user = currentUser();
    document.querySelectorAll('.nav-admin').forEach(e => e.style.display = user?.role === 'ADMIN' ? '' : 'none');
    document.querySelectorAll('.nav-employee').forEach(e => e.style.display = user?.role === 'EMPLEADO' ? '' : 'none');
    document.querySelectorAll('.nav-client').forEach(e => e.style.display = user?.role === 'CLIENTE' ? '' : 'none');
    document.getElementById('authText').textContent = user ? `${user.name.split(' ')[0]} (${user.role})` : 'Ingresar';
    document.getElementById('cartBadge').textContent = cart().reduce((acc, item) => acc + item.quantity, 0);
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

  async function checkout() {
    if (!db) return toast('Configura la base de datos antes de finalizar compras.', 'danger');
    const user = currentUser();
    if (!user || user.role !== 'CLIENTE') { toast('Debes iniciar sesión como cliente para finalizar la compra.', 'danger'); return navigate('login'); }
    const c = cart();
    if (!c.length) return toast('El carrito está vacío.', 'danger');
    const allProducts = products();
    const items = c.map(i => {
      const p = allProducts.find(x => x.id === i.productId);
      return { productId: p.id, name: p.name, price: p.price, quantity: i.quantity, image: p.image, stock: p.stock };
    });
    const insufficient = items.find(i => i.quantity > i.stock);
    if (insufficient) return toast(`No hay stock suficiente para ${insufficient.name}.`, 'danger');
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const orderId = uid('order');

    try {
      const { error: orderError } = await db.from('orders').insert({ id: orderId, user_id: user.id, created_at: nowDate(), status: 'PENDIENTE', total });
      if (orderError) throw orderError;

      const rows = items.map(i => ({ order_id: orderId, product_id: i.productId, name: i.name, price: i.price, quantity: i.quantity, image: i.image }));
      const { error: itemError } = await db.from('order_items').insert(rows);
      if (itemError) throw itemError;

      for (const item of items) {
        const newStock = Math.max(0, item.stock - item.quantity);
        const { error: stockError } = await db.from('products').update({ stock: newStock }).eq('id', item.productId);
        if (stockError) throw stockError;
      }

      setLocal(LS.cart, []);
      await loadAll();
      toast('Compra registrada como PENDIENTE.', 'success');
      await renderAll();
      await navigate('mis-compras');
    } catch (error) {
      console.error(error);
      toast(`No se pudo registrar la compra: ${error.message}`, 'danger');
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
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const email = document.getElementById('regEmail').value.trim();
    if (password.length < 6) return toast('La contraseña debe tener al menos 6 caracteres.', 'danger');
    if (password !== confirm) return toast('Las contraseñas no coinciden.', 'danger');
    if (users().some(u => u.email.toLowerCase() === email.toLowerCase())) return toast('El correo ya existe.', 'danger');
    const interests = [...document.querySelectorAll('#registerForm .interest-grid input:checked')].map(i => i.value);
    const id = uid('user');
    const passwordHash = await hashText(password);
    const row = {
      id,
      name: document.getElementById('regName').value.trim(),
      email,
      password_hash: passwordHash,
      role: 'CLIENTE',
      phone: document.getElementById('regPhone').value.trim(),
      address: document.getElementById('regAddress').value.trim(),
      city: document.getElementById('regCity').value.trim(),
      country: document.getElementById('regCountry').value.trim(),
      birth_date: document.getElementById('regBirth').value || null,
      interests,
      newsletter: document.getElementById('regNewsletter').checked,
      created_at: nowDate()
    };
    const { error } = await db.from('users').insert(row);
    if (error) return toast(`No se pudo crear la cuenta: ${error.message}`, 'danger');
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
    const { error } = await db.from('users').insert(row);
    if (error) return toast(`No se pudo crear empleado: ${error.message}`, 'danger');
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
    const { error } = await db.from('products').upsert(product, { onConflict: 'id' });
    if (error) return toast(`No se pudo guardar producto: ${error.message}`, 'danger');
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
    const { error } = await db.from('products').update({ active: !p.active }).eq('id', id);
    if (error) return toast(`No se pudo actualizar producto: ${error.message}`, 'danger');
    await loadAll();
    renderEmployee();
    renderProducts();
    toast('Estado actualizado.', 'success');
  }

  async function setOrderStatus(id, status) {
    const { error } = await db.from('orders').update({ status }).eq('id', id);
    if (error) return toast(`No se pudo actualizar pedido: ${error.message}`, 'danger');
    await loadAll();
    renderEmployee();
    toast(`Pedido marcado como ${status}.`, 'success');
  }

  function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
  }

  function empty(text) { return `<div class="empty-state">${esc(text)}</div>`; }

  function applyTheme() {
    const theme = localStorage.getItem(LS.theme) || 'dark';
    document.body.classList.toggle('light-mode', theme === 'light');
    document.getElementById('themeToggle').innerHTML = theme === 'light' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  }

  async function renderAll() {
    if (!db) { renderDbWarning(); return; }
    updateNav(); renderHome(); renderProducts(); renderCart();
  }

  async function refreshData() {
    await loadAll(true);
    await renderAll();
    const route = window.location.hash.replace('#', '') || 'inicio';
    await renderRoute(route);
  }

  function initEvents() {
    ['searchInput','genreFilter','categoryFilter','minPrice','maxPrice','sortFilter'].forEach(id => document.getElementById(id)?.addEventListener('input', renderProducts));
    document.getElementById('loginForm').addEventListener('submit', async e => { e.preventDefault(); await login(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value); });
    document.getElementById('registerForm').addEventListener('submit', async e => { e.preventDefault(); await register(); });
    document.getElementById('employeeForm').addEventListener('submit', async e => { e.preventDefault(); await createEmployee(); });
    document.getElementById('productForm').addEventListener('submit', async e => { e.preventDefault(); await saveProduct(); });
    document.getElementById('themeToggle').addEventListener('click', () => { localStorage.setItem(LS.theme, document.body.classList.contains('light-mode') ? 'dark' : 'light'); applyTheme(); if (adminChart) renderChart(); });
    document.getElementById('adminMetric').addEventListener('change', renderChart);
    document.getElementById('adminPeriod').addEventListener('change', renderChart);
    document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', e => { const route = el.dataset.route; if (route) { e.preventDefault(); navigate(route); } }));
    document.querySelectorAll('[data-order-filter]').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('[data-order-filter]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentOrderFilter = btn.dataset.orderFilter; renderMyOrders(); }));
    document.getElementById('languageSelect').value = localStorage.getItem(LS.lang) || 'es';
    document.getElementById('languageSelect').addEventListener('change', e => { localStorage.setItem(LS.lang, e.target.value); toast(e.target.value === 'en' ? 'Language saved.' : 'Idioma guardado.', 'success'); });
  }

  async function init() {
    applyTheme();
    initEvents();
    if (!db) {
      renderDbWarning();
      toast('Configura Supabase para activar la base de datos SQL.', 'danger');
    } else {
      await loadAll();
      await renderAll();
    }
    const initial = window.location.hash.replace('#', '') || 'inicio';
    await navigate(initial);
  }

  return { init, navigate, openAuthOrLogout, clearFilters, changeQty, addToCart, updateCartQty, removeCart, checkout, openProduct, quickAdd, fillLogin, togglePassword, showEmployeeModal, editProduct, clearProductForm, toggleProduct, setOrderStatus, refreshData };
})();

document.addEventListener('DOMContentLoaded', Omega.init);
