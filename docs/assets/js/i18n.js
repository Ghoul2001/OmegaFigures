(() => {
  const LANG_KEY = 'omega_official_lang_v1';

  const esToEn = new Map(Object.entries({
    'Inicio': 'Home',
    'Productos': 'Products',
    'Mis compras': 'My orders',
    'Admin': 'Admin',
    'Empleado': 'Employee',
    'Redes': 'Social',
    'Carrito': 'Cart',
    'Ingresar': 'Sign in',
    'Catálogo': 'Catalog',
    'Busca por nombre, categoría, género y rango de precio.': 'Search by name, category, genre and price range.',
    'Buscar': 'Search',
    'Nombre, categoría o descripción': 'Name, category or description',
    'Género': 'Genre',
    'Categoría': 'Category',
    'Min': 'Min',
    'Max': 'Max',
    'Orden': 'Sort',
    'Recomendado': 'Recommended',
    'Precio ↑': 'Price ↑',
    'Precio ↓': 'Price ↓',
    'Nombre A-Z': 'Name A-Z',
    'Todos': 'All',
    'Todas': 'All',
    'productos encontrados': 'products found',
    'Actualizar catálogo': 'Refresh catalog',
    'Ver detalles': 'View details',
    'Stock': 'Stock',
    'Producto agregado al carrito.': 'Product added to cart.',
    'Producto no disponible.': 'Product not available.',
    'Tienda oficial conectada a SQL': 'Official store connected to SQL',
    'Figuras de colección con una experiencia visual moderna.': 'Collectible figures with a modern visual experience.',
    'Explora productos, agrega al carrito, inicia sesión por roles, revisa compras, administra pedidos y gestiona productos conectados a una base de datos SQL en la nube.': 'Explore products, add items to the cart, sign in by roles, review purchases, manage orders and products connected to a cloud SQL database.',
    'Ver productos': 'View products',
    'Iniciar sesión': 'Sign in',
    'Compras': 'Orders',
    'Roles': 'Roles',
    'Destacados': 'Featured',
    'Productos recomendados': 'Recommended products',
    'Tarjetas interactivas con vista completa, detalles y selección de cantidad.': 'Interactive cards with full image view, details and quantity selection.',
    'Tu carrito de compras': 'Your shopping cart',
    'Modifica cantidades o finaliza la compra.': 'Change quantities or complete your purchase.',
    'Resumen': 'Summary',
    'Subtotal': 'Subtotal',
    'Envío': 'Shipping',
    'Total': 'Total',
    'Finalizar compra': 'Checkout',
    'Seguir comprando': 'Continue shopping',
    'Las compras se registran en la base de datos SQL configurada para OmegaFiguresWeb.': 'Purchases are stored in the SQL database configured for OmegaFiguresWeb.',
    'Tu carrito está vacío.': 'Your cart is empty.',
    'Usa una cuenta inicial o registra una cuenta nueva.': 'Use an initial account or register a new one.',
    'Correo': 'Email',
    'Contraseña': 'Password',
    'Cuentas iniciales': 'Initial accounts',
    'Registrarse': 'Register',
    'Formulario completo con intereses para recibir información.': 'Complete form with interests to receive information.',
    'Nombre completo': 'Full name',
    'Teléfono': 'Phone',
    'Fecha de nacimiento': 'Birth date',
    'Ciudad': 'City',
    'País': 'Country',
    'Dirección': 'Address',
    'Confirmar contraseña': 'Confirm password',
    '¿Qué información te gustaría recibir?': 'What information would you like to receive?',
    'Videojuegos': 'Video games',
    'Promociones': 'Promotions',
    'Ediciones limitadas': 'Limited editions',
    'Novedades': 'New releases',
    'Deseo recibir novedades y promociones.': 'I want to receive news and promotions.',
    'Crear cuenta cliente': 'Create customer account',
    'Cliente': 'Customer',
    'Consulta tus compras pendientes, aprobadas, rechazadas o enviadas.': 'Check your pending, approved, rejected or shipped purchases.',
    'Pendientes': 'Pending',
    'Aprobadas': 'Approved',
    'Rechazadas': 'Rejected',
    'Enviadas': 'Shipped',
    'No tienes compras en esta categoría.': 'You have no purchases in this category.',
    'Administrador': 'Administrator',
    'Panel estadístico': 'Statistics panel',
    'El administrador solo visualiza estadísticas y crea empleados.': 'The administrator only views statistics and creates employees.',
    'Gráfico estadístico': 'Statistics chart',
    'Filtra por compras, nuevos clientes o rendimiento.': 'Filter by purchases, new customers or performance.',
    'Nuevos clientes': 'New customers',
    'Rendimiento': 'Performance',
    'Semana': 'Week',
    'Mes': 'Month',
    'Año': 'Year',
    'Ventas': 'Sales',
    'Políticas para crear empleados': 'Employee creation policies',
    'Crear cuentas solo para personal autorizado.': 'Create accounts only for authorized staff.',
    'El empleado gestiona productos, inventario y pedidos.': 'Employees manage products, inventory and orders.',
    'El empleado no puede ver estadísticas estratégicas.': 'Employees cannot view strategic statistics.',
    'Verificar correo, nombres y responsabilidad asignada.': 'Verify email, names and assigned responsibility.',
    'Recordar al empleado proteger su contraseña.': 'Remind employees to protect their password.',
    'Crear empleado': 'Create employee',
    'Empleados creados': 'Created employees',
    'Gestión del sitio': 'Site management',
    'Gestiona productos, inventario y aprobación de compras.': 'Manage products, inventory and purchase approval.',
    'Producto': 'Product',
    'Nuevo': 'New',
    'Nombre': 'Name',
    'Precio': 'Price',
    'URL imagen': 'Image URL',
    'Descripción': 'Description',
    'Producto activo': 'Active product',
    'Guardar producto': 'Save product',
    'Productos registrados': 'Registered products',
    'Pedidos por aprobar': 'Orders to approve',
    'No hay pedidos pendientes.': 'There are no pending orders.',
    'Estado': 'Status',
    'Acciones': 'Actions',
    'Editar': 'Edit',
    'Desactivar': 'Disable',
    'Activar': 'Enable',
    'Contacto': 'Contact',
    'Redes sociales': 'Social media',
    'Sigue el proyecto y el perfil del desarrollador.': 'Follow the project and the developer profile.',
    'Página no encontrada': 'Page not found',
    'La sección solicitada no existe dentro del sitio.': 'The requested section does not exist within the site.',
    'Volver al inicio': 'Back to home',
    'Versión oficial para GitHub Pages con HTML, CSS, JavaScript y base de datos SQL en la nube.': 'Official version for GitHub Pages with HTML, CSS, JavaScript and a cloud SQL database.',
    'Pago seguro': 'Secure payment',
    'Finalización de compra': 'Checkout completion',
    'Completa los datos de entrega y valida la tarjeta antes de registrar tu pedido.': 'Complete delivery details and validate the card before registering your order.',
    'Datos de entrega': 'Delivery details',
    'Nombre de quien recibe': 'Receiver name',
    'Teléfono de contacto': 'Contact phone',
    'Dirección de envío': 'Shipping address',
    'Notas para la entrega': 'Delivery notes',
    'Método de pago': 'Payment method',
    'Tarjeta': 'Card',
    'Transferencia': 'Bank transfer',
    'Nombre en la tarjeta': 'Name on card',
    'Número de tarjeta': 'Card number',
    'Vencimiento': 'Expiration',
    'No se guarda el número completo de tarjeta ni el CVV. Solo se registra el método de pago y los últimos 4 dígitos.': 'The full card number and CVV are not stored. Only the payment method and last 4 digits are registered.',
    'Pago por transferencia.': 'Payment by bank transfer.',
    'El pedido quedará como': 'The order will remain as',
    'El empleado podrá aprobarlo cuando verifique el pago.': 'The employee can approve it after verifying payment.',
    'Resumen del pedido': 'Order summary',
    'Total a pagar': 'Total to pay',
    'Confirmo que los datos ingresados son correctos y acepto registrar la compra.': 'I confirm the entered data is correct and accept registering the purchase.',
    'Confirmar compra': 'Confirm purchase',
    'Volver al carrito': 'Back to cart',
    'Revisa los datos de entrega y pago antes de continuar.': 'Review delivery and payment details before continuing.',
    'Compra registrada correctamente.': 'Purchase registered successfully.',
    'Pago': 'Payment',
    'Procesando...': 'Processing...',
    'OmegaFiguresWeb conectado a base de datos SQL mediante Supabase.': 'OmegaFiguresWeb connected to a SQL database through Supabase.',
    'Contraseña temporal': 'Temporary password',
    'Guardar empleado': 'Save employee',
    'Agregar al carrito': 'Add to cart',
    'No se encontraron productos con esos filtros.': 'No products were found with those filters.',
    'No existen productos destacados.': 'There are no featured products.',
    'No hay información registrada.': 'No information registered.',
    'Base de datos no configurada.': 'Database not configured.',
    'Configura Supabase para activar la base de datos SQL.': 'Configure Supabase to activate the SQL database.',
    'Idioma guardado.': 'Language saved.',
    'Datos actualizados desde la base SQL.': 'Data updated from the SQL database.',
    'Sesión cerrada.': 'Session closed.',
    'Cuenta creada correctamente.': 'Account created successfully.',
    'Empleado creado correctamente.': 'Employee created successfully.',
    'Producto guardado en la base SQL.': 'Product saved in the SQL database.',
    'Estado actualizado.': 'Status updated.',
    'Correo o contraseña incorrectos.': 'Incorrect email or password.',
    'La contraseña debe tener al menos 6 caracteres.': 'The password must be at least 6 characters.',
    'Las contraseñas no coinciden.': 'Passwords do not match.',
    'El correo ya existe.': 'The email already exists.',
    'Compra registrada como PENDIENTE.': 'Purchase registered as PENDING.',
    'PENDIENTE': 'PENDING',
    'APROBADA': 'APPROVED',
    'RECHAZADA': 'REJECTED',
    'ENVIADA': 'SHIPPED',
    'Orden': 'Order',
    'Aprobar': 'Approve',
    'Rechazar': 'Reject',
    'Cambiar tema': 'Change theme',
    'Abrir menú': 'Open menu',
    'Ir al carrito': 'Go to cart',
    'Mostrar u ocultar contraseña': 'Show or hide password',
    'Buscar productos': 'Search products',
    'Filtrar por género': 'Filter by genre',
    'Filtrar por categoría': 'Filter by category',
    'Precio mínimo': 'Minimum price',
    'Precio máximo': 'Maximum price',
    'Experiencia 3D': '3D experience',
    'Visor 3D interactivo': 'Interactive 3D viewer',
    'Explora una figura en una tarjeta 3D, gira el modelo con el cursor y prueba el efecto Spring.': 'Explore a figure in a 3D card, rotate the model with the cursor and try the Spring effect.',
    'Activar Spring': 'Activate Spring',
    'Reiniciar vista': 'Reset view',
    'Modelo seleccionado': 'Selected model',
    'Este apartado usa CSS 3D y animación tipo Spring, compatible con GitHub Pages.': 'This section uses CSS 3D and Spring-style animation, compatible with GitHub Pages.',
    'Mascota Omega Shark': 'Omega Shark mascot',
    '¡Hola! Soy Omega Shark. Te acompaño mientras navegas.': 'Hi! I am Omega Shark. I follow you while you browse.',
    'Usa una tarjeta válida. Ejemplo de prueba: 4242 4242 4242 4242.': 'Use a valid card. Test example: 4242 4242 4242 4242.',
    'El número no supera la validación Luhn. Revisa los dígitos.': 'The number does not pass Luhn validation. Check the digits.',
    'Ordenar productos': 'Sort products'
  }));

  const enToEs = new Map([...esToEn.entries()].map(([es, en]) => [en, es]));
  const originalText = new WeakMap();
  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  let applying = false;
  let scheduled = false;

  const currentLang = () => localStorage.getItem(LANG_KEY) || 'es';
  const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();

  function translateExactFromSpanish(source, lang) {
    if (!source) return source;
    if (lang === 'es') return source;

    const trimmed = normalize(source);
    if (esToEn.has(trimmed)) {
      return source.replace(trimmed, esToEn.get(trimmed));
    }

    const productMatch = trimmed.match(/^(\d+) productos encontrados$/i);
    if (productMatch) {
      return source.replace(trimmed, `${productMatch[1]} products found`);
    }

    return source;
  }

  function toSpanishFromKnownEnglish(source) {
    if (!source) return source;
    const trimmed = normalize(source);
    if (enToEs.has(trimmed)) {
      return source.replace(trimmed, enToEs.get(trimmed));
    }

    const productMatch = trimmed.match(/^(\d+) products found$/i);
    if (productMatch) {
      return source.replace(trimmed, `${productMatch[1]} productos encontrados`);
    }

    return source;
  }

  function getNodeOriginal(node) {
    if (!originalText.has(node)) {
      const value = node.nodeValue;
      // Si el nodo fue creado cuando la interfaz estaba en inglés,
      // se intenta volverlo a su equivalente base en español.
      originalText.set(node, toSpanishFromKnownEnglish(value));
    }
    return originalText.get(node);
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName);
  }

  function walkTextNodes(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
      const base = getNodeOriginal(node);
      const next = lang === 'es' ? base : translateExactFromSpanish(base, 'en');
      if (node.nodeValue !== next) node.nodeValue = next;
    });
  }

  function getAttrOriginal(el, attr) {
    const key = `i18nOriginal${attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
    if (!el.dataset[key]) {
      const value = el.getAttribute(attr) || '';
      el.dataset[key] = toSpanishFromKnownEnglish(value);
    }
    return el.dataset[key];
  }

  function translateAttributes(lang) {
    ATTRS.forEach(attr => {
      document.querySelectorAll(`[${attr}]`).forEach(el => {
        const base = getAttrOriginal(el, attr);
        const next = lang === 'es' ? base : translateExactFromSpanish(base, 'en');
        if (el.getAttribute(attr) !== next) el.setAttribute(attr, next);
      });
    });
  }

  function applyLanguage() {
    if (applying || !document.body) return;
    applying = true;

    const lang = currentLang();
    document.documentElement.lang = lang;
    document.title = lang === 'en'
      ? 'OmegaFiguresWeb | Official Store'
      : 'OmegaFiguresWeb | Tienda oficial';

    const select = document.getElementById('languageSelect');
    if (select && select.value !== lang) select.value = lang;

    walkTextNodes(document.body, lang);
    translateAttributes(lang);

    applying = false;
  }

  function scheduleApply() {
    if (scheduled || applying) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      applyLanguage();
    }, 80);
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage();

    const select = document.getElementById('languageSelect');
    if (select) {
      select.value = currentLang();
      select.addEventListener('change', () => {
        localStorage.setItem(LANG_KEY, select.value);
        applyLanguage();
      });
    }

    const observer = new MutationObserver(() => {
      if (!applying) scheduleApply();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  window.OmegaI18n = { applyLanguage, scheduleApply };
})();
