(() => {
  const STORAGE_KEY = 'omega_official_lang_v1';
  const LANGUAGES = ['es', 'en'];

  const EN = {
    'OmegaFiguresWeb | Tienda oficial': 'OmegaFiguresWeb | Official store',
    'Tienda oficial de figuras de coleccion con catalogo, carrito, roles y conexion a base de datos SQL en la nube.': 'Official collectible figure store with catalog, cart, roles, and cloud SQL database connection.',
    'Abrir menu': 'Open menu',
    'Inicio': 'Home',
    'Productos': 'Products',
    'Mis compras': 'My orders',
    'Admin': 'Admin',
    'Empleado': 'Employee',
    'Redes': 'Social',
    'Idioma': 'Language',
    'Espanol': 'Spanish',
    'Cambiar tema': 'Change theme',
    'Ir al carrito': 'Go to cart',
    'Carrito': 'Cart',
    'Ingresar': 'Sign in',
    'Mascota tiburon de OmegaFiguresWeb': 'OmegaFiguresWeb shark mascot',
    'Tienda de figuras de coleccion OmegaFiguresWeb con tiburon mascota': 'OmegaFiguresWeb collectible figure store with shark mascot',
    'Tiburon Omega': 'Omega Shark',
    'Listo para guiarte.': 'Ready to guide you.',
    'Mostrando el inicio.': 'Showing the home page.',
    'Explorando productos.': 'Exploring products.',
    'Cuidando tu carrito.': 'Watching your cart.',
    'Visualizando la figura 3D.': 'Viewing the 3D figure.',
    'Documentando Spring Boot.': 'Documenting Spring Boot.',
    'Probando Spring Boot.': 'Testing Spring Boot.',
    'Protegiendo tu acceso.': 'Protecting your access.',
    'Revisando tus compras.': 'Reviewing your orders.',
    'Analizando estadisticas.': 'Analyzing statistics.',
    'Gestionando la tienda.': 'Managing the store.',
    'Abriendo redes sociales.': 'Opening social networks.',
    'Buscando la seccion correcta.': 'Looking for the right section.',
    'Producto agregado. Te acompano al carrito cuando quieras.': 'Product added. I can take you to the cart whenever you want.',
    'Preparando tu compra.': 'Preparing your purchase.',
    'Necesito la base de datos configurada.': 'I need the database to be configured.',
    'Inicia sesion como cliente para comprar.': 'Sign in as a customer to shop.',
    'Tu carrito esta vacio.': 'Your cart is empty.',
    'Necesito revisar el stock.': 'I need to check the stock.',
    'No pude completar la compra.': 'I could not complete the purchase.',
    'Compra registrada. Revisemos tus pedidos.': 'Purchase registered. Let us review your orders.',
    'Validando tu acceso.': 'Validating your access.',
    'No pude validar esas credenciales.': 'I could not validate those credentials.',
    'Acceso confirmado. Vamos a tu panel.': 'Access confirmed. Let us go to your panel.',
    'Creando tu cuenta cliente.': 'Creating your customer account.',
    'La contrasena necesita mas seguridad.': 'The password needs more security.',
    'Las contrasenas no coinciden.': 'The passwords do not match.',
    'Ese correo ya esta registrado.': 'That email is already registered.',
    'No pude crear la cuenta.': 'I could not create the account.',
    'Cuenta creada. Ya puedes comprar.': 'Account created. You can shop now.',
    'Creando empleado.': 'Creating employee.',
    'No pude crear el empleado.': 'I could not create the employee.',
    'Empleado creado y registrado.': 'Employee created and registered.',
    'Guardando producto.': 'Saving product.',
    'No pude guardar el producto.': 'I could not save the product.',
    'Producto guardado en la tienda.': 'Product saved in the store.',
    'Actualizando estado del producto.': 'Updating product status.',
    'No pude actualizar el producto.': 'I could not update the product.',
    'Estado del producto actualizado.': 'Product status updated.',
    'Actualizando pedido.': 'Updating order.',
    'No pude actualizar el pedido.': 'I could not update the order.',
    'Pedido actualizado correctamente.': 'Order updated successfully.',
    'Actualizando datos.': 'Refreshing data.',
    'Datos actualizados.': 'Data refreshed.',
    'Tienda oficial conectada a SQL': 'Official store connected to SQL',
    'Figuras de coleccion con una experiencia visual moderna.': 'Collectible figures with a modern visual experience.',
    'Explora productos, agrega al carrito, inicia sesion por roles, revisa compras, administra pedidos y gestiona productos conectados a una base de datos SQL en la nube.': 'Browse products, add them to your cart, sign in by role, review orders, manage purchases, and update products connected to a cloud SQL database.',
    'Ver productos': 'View products',
    'Iniciar sesion': 'Sign in',
    'Probar Spring': 'Try Spring',
    'Compras': 'Orders',
    'Roles': 'Roles',
    'Roles seguros': 'Secure roles',
    'Destacados': 'Featured',
    'Productos recomendados': 'Recommended products',
    'Tarjetas interactivas con vista completa, detalles y seleccion de cantidad.': 'Interactive cards with full view, details, and quantity selection.',
    'Catalogo': 'Catalog',
    'Busca por nombre, categoria, genero y rango de precio.': 'Search by name, category, genre, and price range.',
    'Buscar': 'Search',
    'Nombre, categoria o descripcion': 'Name, category, or description',
    'Buscar productos': 'Search products',
    'Genero': 'Genre',
    'Filtrar por genero': 'Filter by genre',
    'Categoria': 'Category',
    'Filtrar por categoria': 'Filter by category',
    'Min': 'Min',
    'Precio minimo': 'Minimum price',
    'Max': 'Max',
    'Precio maximo': 'Maximum price',
    'Orden': 'Sort',
    'Ordenar productos': 'Sort products',
    'Recomendado': 'Recommended',
    'Precio ↑': 'Price ↑',
    'Precio ↓': 'Price ↓',
    'Nombre A-Z': 'Name A-Z',
    'Limpiar filtros': 'Clear filters',
    'productos encontrados': 'products found',
    'Actualizar catalogo': 'Refresh catalog',
    'Tu carrito de compras': 'Your shopping cart',
    'Modifica cantidades o finaliza la compra.': 'Change quantities or complete your purchase.',
    'Visor 3D': '3D Viewer',
    'Figura Omega 3D': 'Omega 3D Figure',
    'Visor 3D de figura de coleccion': '3D collectible figure viewer',
    'Controles 3D': '3D controls',
    'Girar izquierda': 'Rotate left',
    'Girar derecha': 'Rotate right',
    'Rotacion automatica': 'Auto rotation',
    'Restablecer vista': 'Reset view',
    'Zoom 3D': '3D zoom',
    'Variantes de color': 'Color variants',
    'Color Omega': 'Omega color',
    'Color sombra': 'Shadow color',
    'Color solar': 'Solar color',
    'Cargando visor 3D': 'Loading 3D viewer',
    'Visor 3D listo.': '3D viewer ready.',
    'Controllers y Rest Controllers': 'Controllers and Rest Controllers',
    'Implementacion practica de un proyecto Spring Boot creado con Spring Initializr, Controllers MVC, Rest Controllers y endpoints probados.': 'Practical implementation of a Spring Boot project created with Spring Initializr, MVC Controllers, Rest Controllers, and tested endpoints.',
    'Proyecto desarrollado': 'Developed project',
    'Se creo una aplicacion Spring Boot real en la carpeta': 'A real Spring Boot application was created in the',
    ', con Maven, Spring Web, Thymeleaf, Controllers MVC, Rest Controllers y pruebas de endpoints.': 'folder, with Maven, Spring Web, Thymeleaf, MVC Controllers, Rest Controllers, and endpoint tests.',
    'Controller MVC': 'MVC Controller',
    'atiende': 'handles',
    ', carga un objeto': ', loads a',
    'en el': 'object into the',
    'y renderiza la plantilla Thymeleaf.': 'and renders the Thymeleaf template.',
    'Rest Controller': 'Rest Controller',
    'expone': 'exposes',
    'y devuelve JSON serializado automaticamente por Spring Boot.': 'and returns JSON automatically serialized by Spring Boot.',
    'Endpoints implementados': 'Implemented endpoints',
    'Laboratorio Spring': 'Spring Lab',
    'Ejecuta y prueba los endpoints': 'Run and test the endpoints',
    'Primero inicia el proyecto Spring Boot en IntelliJ o con Maven. Luego usa estos botones para abrir las vistas MVC o consultar los Rest Controllers.': 'First start the Spring Boot project in IntelliJ or with Maven. Then use these buttons to open MVC views or query the Rest Controllers.',
    'Servidor Spring': 'Spring Server',
    'Servidor Spring Boot': 'Spring Boot server',
    'Abrir vista usuarios': 'Open users view',
    'Abrir datos servidor': 'Open server data',
    'Probar JSON usuarios': 'Test users JSON',
    'Probar saludo JSON': 'Test greeting JSON',
    'Comando para iniciar': 'Command to start',
    'Ejecutalo desde la carpeta': 'Run it from the',
    '.': '.',
    'Copiar comando': 'Copy command',
    'Resultado REST': 'REST Result',
    'Esperando una accion.': 'Waiting for an action.',
    'Abriendo vista MVC en Spring Boot.': 'Opening MVC view in Spring Boot.',
    'Abriendo Spring Boot.': 'Opening Spring Boot.',
    'Vista MVC abierta en una nueva pestana.': 'MVC view opened in a new tab.',
    'Consultando endpoint REST.': 'Querying REST endpoint.',
    'Probando endpoint REST.': 'Testing REST endpoint.',
    'Consultando Spring Boot...': 'Querying Spring Boot...',
    'Endpoint REST probado correctamente.': 'REST endpoint tested successfully.',
    'Spring Boot respondio correctamente.': 'Spring Boot responded successfully.',
    'No se pudo conectar con Spring Boot.': 'Could not connect to Spring Boot.',
    'Ejecuta el proyecto springboot en IntelliJ o usa mvn spring-boot:run y vuelve a presionar el boton.': 'Run the springboot project in IntelliJ or use mvn spring-boot:run and press the button again.',
    'Spring Boot no esta respondiendo.': 'Spring Boot is not responding.',
    'Necesito que Spring Boot este ejecutandose.': 'I need Spring Boot to be running.',
    'Comando copiado.': 'Command copied.',
    'No pude copiar el comando; lo deje en el resultado.': 'I could not copy the command, so I left it in the result.',
    'Comando mostrado en el resultado.': 'Command shown in the result.',
    '5.1 Creacion del Proyecto con Spring Initializr': '5.1 Project Creation with Spring Initializr',
    '5.1 Creacion del Proyecto con': '5.1 Project Creation with',
    'El proyecto se genera desde Spring Initializr seleccionando Maven, Java, Spring Boot y las dependencias Spring Web y Thymeleaf. Esta configuracion crea la estructura base del proyecto, la clase principal de arranque y los archivos necesarios para ejecutar la aplicacion en IntelliJ IDEA.': 'The project is generated from Spring Initializr by selecting Maven, Java, Spring Boot, and the Spring Web and Thymeleaf dependencies. This setup creates the base project structure, the main startup class, and the files required to run the application in IntelliJ IDEA.',
    'Figura 1. Proyecto Spring Boot ejecutandose correctamente en IntelliJ IDEA.': 'Figure 1. Spring Boot project running correctly in IntelliJ IDEA.',
    '5.2 Uso de Controller MVC – Vista /gestionUsuarios': '5.2 MVC Controller Usage – /gestionUsuarios View',
    '5.2 Uso de Controller MVC –': '5.2 MVC Controller Usage –',
    'Vista /gestionUsuarios': '/gestionUsuarios View',
    'El Controller MVC recibe la solicitud del navegador, agrega datos al objeto Model y retorna el nombre de la plantilla gestionUsuarios.html. Thymeleaf procesa los atributos enviados desde Java y los muestra en una vista HTML para el usuario final.': 'The MVC Controller receives the browser request, adds data to the Model object, and returns the name of the gestionUsuarios.html template. Thymeleaf processes the attributes sent from Java and displays them in an HTML view for the final user.',
    'Informacion de Usuarios': 'User Information',
    'Nombre: Luis Teran': 'Name: Luis Teran',
    'Cedula: 1714032587': 'ID: 1714032587',
    'Correo: lteran@gmail.com': 'Email: lteran@gmail.com',
    'Figura 2. Vista Thymeleaf renderizada desde un Controller MVC.': 'Figure 2. Thymeleaf view rendered from an MVC Controller.',
    '5.3 Uso de Rest Controller – Endpoint /api/v1/usuarios': '5.3 Rest Controller Usage – /api/v1/usuarios Endpoint',
    '5.3 Uso de Rest Controller –': '5.3 Rest Controller Usage –',
    'Endpoint /api/v1/usuarios': '/api/v1/usuarios Endpoint',
    'El Rest Controller expone informacion mediante un endpoint que responde en formato JSON. Spring Boot serializa automaticamente el objeto Usuario con Jackson, permitiendo que el navegador o un cliente externo consuma los datos de la aplicacion.': 'The Rest Controller exposes information through an endpoint that responds in JSON format. Spring Boot automatically serializes the Usuario object with Jackson, allowing the browser or an external client to consume the application data.',
    'Figura 3. Respuesta JSON del endpoint REST de usuarios.': 'Figure 3. JSON response from the users REST endpoint.',
    '5.4 Controller MVC – Vista /informacion con Model': '5.4 MVC Controller – /informacion View with Model',
    '5.4 Controller MVC –': '5.4 MVC Controller –',
    'Vista /informacion con Model': '/informacion View with Model',
    'El endpoint /informacion demuestra el uso del objeto Model para enviar atributos dinamicos a una plantilla. El controlador agrega valores como titulo, aplicacion e IP, y Thymeleaf los recupera con expresiones para construir el contenido de la pagina.': 'The /informacion endpoint demonstrates the use of the Model object to send dynamic attributes to a template. The controller adds values such as title, application, and IP, and Thymeleaf retrieves them with expressions to build the page content.',
    'Datos del Servidor': 'Server Data',
    'Figura 4. Vista Thymeleaf mostrando atributos enviados desde el Model.': 'Figure 4. Thymeleaf view showing attributes sent from the Model.',
    '5.5 Rest Controller – Endpoint /api/saludo': '5.5 Rest Controller – /api/saludo Endpoint',
    '5.5 Rest Controller –': '5.5 Rest Controller –',
    'Endpoint /api/saludo': '/api/saludo Endpoint',
    'El endpoint /api/saludo implementado con @RestController retorna una respuesta JSON sencilla con el mensaje "Hola desde Spring Boot!". Este ejemplo valida el uso de @RequestMapping a nivel de clase y @GetMapping a nivel de metodo.': 'The /api/saludo endpoint implemented with @RestController returns a simple JSON response with the message "Hola desde Spring Boot!". This example validates the use of @RequestMapping at class level and @GetMapping at method level.',
    'Figura 5. Endpoint REST basico devolviendo un mensaje en JSON.': 'Figure 5. Basic REST endpoint returning a JSON message.',
    'Resumen': 'Summary',
    'Subtotal': 'Subtotal',
    'Envio': 'Shipping',
    'Total': 'Total',
    'Finalizar compra': 'Checkout',
    'Seguir comprando': 'Keep shopping',
    'Las compras se registran en la base de datos SQL configurada para OmegaFiguresWeb.': 'Purchases are registered in the SQL database configured for OmegaFiguresWeb.',
    'Usa una cuenta inicial o registra una cuenta nueva.': 'Use a starter account or register a new one.',
    'Correo': 'Email',
    'Correo de inicio de sesion': 'Login email',
    'Contrasena': 'Password',
    'Contrasena de inicio de sesion': 'Login password',
    'Mostrar u ocultar contrasena': 'Show or hide password',
    'Cuentas iniciales': 'Starter accounts',
    'Registrarse': 'Register',
    'Formulario completo con intereses para recibir informacion.': 'Full form with interests for receiving information.',
    'Nombre completo': 'Full name',
    'Telefono': 'Phone',
    'Fecha de nacimiento': 'Birth date',
    'Ciudad': 'City',
    'Pais': 'Country',
    'Direccion': 'Address',
    'Confirmar contrasena': 'Confirm password',
    'Que informacion te gustaria recibir?': 'What information would you like to receive?',
    'Videojuegos': 'Video games',
    'Promociones': 'Promotions',
    'Ediciones limitadas': 'Limited editions',
    'Novedades': 'News',
    'Recibir novedades': 'Receive updates',
    'Deseo recibir novedades y promociones.': 'I want to receive updates and promotions.',
    'Crear cuenta cliente': 'Create customer account',
    'Cliente': 'Customer',
    'Consulta tus compras pendientes, aprobadas, rechazadas o enviadas.': 'Check your pending, approved, rejected, or shipped orders.',
    'Todas': 'All',
    'Pendientes': 'Pending',
    'Aprobadas': 'Approved',
    'Rechazadas': 'Rejected',
    'Enviadas': 'Shipped',
    'Administrador': 'Administrator',
    'Panel estadistico': 'Statistics panel',
    'El administrador solo visualiza estadisticas y crea empleados.': 'The administrator only views statistics and creates employees.',
    'Grafico estadistico': 'Statistics chart',
    'Filtra por compras, nuevos clientes o rendimiento.': 'Filter by orders, new customers, or performance.',
    'Metrica': 'Metric',
    'Metrica estadistica': 'Statistics metric',
    'Nuevos clientes': 'New customers',
    'Rendimiento': 'Performance',
    'Periodo': 'Period',
    'Periodo estadistico': 'Statistics period',
    'Semana': 'Week',
    'Mes': 'Month',
    'Ano': 'Year',
    'Politicas para crear empleados': 'Policies for creating employees',
    'Crear cuentas solo para personal autorizado.': 'Create accounts only for authorized staff.',
    'El empleado gestiona productos, inventario y pedidos.': 'The employee manages products, inventory, and orders.',
    'El empleado no puede ver estadisticas estrategicas.': 'The employee cannot view strategic statistics.',
    'Verificar correo, nombres y responsabilidad asignada.': 'Verify email, names, and assigned responsibility.',
    'Recordar al empleado proteger su contrasena.': 'Remind the employee to protect their password.',
    'Crear empleado': 'Create employee',
    'Empleados creados': 'Created employees',
    'Gestion del sitio': 'Site management',
    'Gestiona productos, inventario y aprobacion de compras.': 'Manage products, inventory, and purchase approval.',
    'Producto': 'Product',
    'Nuevo': 'New',
    'Nombre': 'Name',
    'Nombre del producto': 'Product name',
    'Categoria del producto': 'Product category',
    'Genero del producto': 'Product genre',
    'Precio': 'Price',
    'Precio del producto': 'Product price',
    'Stock': 'Stock',
    'Stock del producto': 'Product stock',
    'URL imagen': 'Image URL',
    'URL de imagen del producto': 'Product image URL',
    'Descripcion': 'Description',
    'Descripcion del producto': 'Product description',
    'Producto activo': 'Active product',
    'Guardar producto': 'Save product',
    'Productos registrados': 'Registered products',
    'Pedidos por aprobar': 'Orders to approve',
    'Contacto': 'Contact',
    'Redes sociales': 'Social networks',
    'Sigue el proyecto y el perfil del desarrollador.': 'Follow the project and the developer profile.',
    'Pagina no encontrada': 'Page not found',
    'La seccion solicitada no existe dentro del sitio.': 'The requested section does not exist on this site.',
    'Volver al inicio': 'Back to home',
    'Version oficial para GitHub Pages con HTML, CSS, JavaScript y base de datos SQL en la nube.': 'Official version for GitHub Pages with HTML, CSS, JavaScript, and a cloud SQL database.',
    'OmegaFiguresWeb conectado a base de datos SQL mediante Supabase.': 'OmegaFiguresWeb connected to a SQL database through Supabase.',
    'Cerrar': 'Close',
    'Nombre del empleado': 'Employee name',
    'Correo del empleado': 'Employee email',
    'Contrasena temporal': 'Temporary password',
    'Contrasena temporal del empleado': 'Temporary employee password',
    'Telefono del empleado': 'Employee phone',
    'Guardar empleado': 'Save employee',
    'Base de datos no configurada.': 'Database not configured.',
    'Abre': 'Open',
    ', coloca tu': ', add your',
    'coloca tu': 'add your',
    'y tu': 'and your',
    '. Despues ejecuta el SQL incluido en': '. Then run the SQL included in',
    'Despues ejecuta el SQL incluido en': 'Then run the SQL included in',
    'Supabase no esta configurado.': 'Supabase is not configured.',
    'Datos actualizados desde la base SQL.': 'Data refreshed from the SQL database.',
    'Configura Supabase para activar la base de datos SQL.': 'Configure Supabase to activate the SQL database.',
    'Idioma guardado.': 'Language saved.',
    'Acceso permitido solo para administrador.': 'Access allowed only for administrators.',
    'Acceso permitido solo para empleados.': 'Access allowed only for employees.',
    'Debes iniciar sesion como cliente.': 'You must sign in as a customer.',
    'Sesion cerrada.': 'Session closed.',
    'Ver detalles': 'View details',
    'No existen productos destacados.': 'There are no featured products.',
    'Todos': 'All',
    'No se encontraron productos con esos filtros.': 'No products were found with those filters.',
    'Producto no disponible.': 'Product unavailable.',
    'Producto agregado al carrito.': 'Product added to cart.',
    'Tu carrito esta vacio.': 'Your cart is empty.',
    'Configura la base de datos antes de finalizar compras.': 'Configure the database before completing purchases.',
    'Debes iniciar sesion como cliente para finalizar la compra.': 'You must sign in as a customer to complete the purchase.',
    'El carrito esta vacio.': 'The cart is empty.',
    'Compra registrada como PENDIENTE.': 'Purchase registered as PENDING.',
    'No tienes compras en esta categoria.': 'You have no orders in this category.',
    'Aprobar': 'Approve',
    'Rechazar': 'Reject',
    'Enviada': 'Shipped',
    'Ventas': 'Sales',
    'Lun': 'Mon',
    'Mar': 'Tue',
    'Mie': 'Wed',
    'Jue': 'Thu',
    'Vie': 'Fri',
    'Sab': 'Sat',
    'Dom': 'Sun',
    'Ene': 'Jan',
    'Abr': 'Apr',
    'Ago': 'Aug',
    'Dic': 'Dec',
    'Creado': 'Created',
    'Estado': 'Status',
    'Acciones': 'Actions',
    'Activo': 'Active',
    'Inactivo': 'Inactive',
    'Editar': 'Edit',
    'Desactivar': 'Deactivate',
    'Activar': 'Activate',
    'No hay pedidos pendientes.': 'There are no pending orders.',
    'No hay informacion registrada.': 'No information has been registered.',
    'Correo o contrasena incorrectos.': 'Incorrect email or password.',
    'La contrasena debe tener al menos 6 caracteres.': 'The password must have at least 6 characters.',
    'Las contrasenas no coinciden.': 'Passwords do not match.',
    'El correo ya existe.': 'The email already exists.',
    'Cuenta creada correctamente.': 'Account created successfully.',
    'Gestion de tienda': 'Store management',
    'Empleado creado correctamente.': 'Employee created successfully.',
    'Producto guardado en la base SQL.': 'Product saved in the SQL database.',
    'Estado actualizado.': 'Status updated.',
    'Agregar al carrito': 'Add to cart',
    'Figura': 'Figure',
    'Coleccionable': 'Collectible',
    'Estatua': 'Statue',
    'Fantasia': 'Fantasy',
    'Ciencia ficcion': 'Science fiction',
    'Heroes': 'Heroes',
    'Figura futurista con casco neon, acabado tecnologico y base decorativa.': 'Futuristic figure with a neon helmet, technological finish, and decorative base.',
    'Figura ninja de coleccion con traje oscuro, armas decorativas y estilo moderno.': 'Collectible ninja figure with a dark suit, decorative weapons, and modern style.',
    'Figura inspirada en videojuegos clasicos, perfecta para amantes del estilo vintage.': 'Figure inspired by classic video games, perfect for fans of vintage style.',
    'Estatua de dragon con acabado de fantasia, textura detallada y base de exhibicion.': 'Dragon statue with a fantasy finish, detailed texture, and display base.',
    'Figura espacial con armadura brillante y detalles galacticos.': 'Space figure with bright armor and galactic details.',
    'Samurai edicion especial con colores intensos y accesorios intercambiables.': 'Special edition samurai with intense colors and interchangeable accessories.',
    'Mini estatua de estilo oscuro para exhibicion en escritorio o repisa.': 'Dark-style mini statue for display on a desk or shelf.',
    'Robot de coleccion con estetica arcade y acabado brillante.': 'Collectible robot with arcade styling and a glossy finish.',
    'PENDIENTE': 'Pending',
    'APROBADA': 'Approved',
    'RECHAZADA': 'Rejected',
    'ENVIADA': 'Shipped',
    'ADMIN': 'Admin',
    'EMPLEADO': 'Employee',
    'CLIENTE': 'Customer',
    'compras': 'orders',
    'clientes': 'customers',
    'rendimiento': 'performance',
    'semana': 'week',
    'mes': 'month',
    'anio': 'year'
  };

  const ES = {
    'Premium figures': 'Figuras premium',
    'English': 'Ingl\u00e9s'
  };

  const LISTS = {
    es: {
      chartWeek: ['Lun', 'Mar', 'Mi\u00e9', 'Jue', 'Vie', 'S\u00e1b', 'Dom'],
      chartMonth: ['S1', 'S2', 'S3', 'S4'],
      chartYear: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    },
    en: {
      chartWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      chartMonth: ['W1', 'W2', 'W3', 'W4'],
      chartYear: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const PARAM_KEYS = {
    'confirm.logout': {
      es: 'Sesi\u00f3n activa: {name}. \u00bfDeseas cerrar sesi\u00f3n?',
      en: 'Active session: {name}. Do you want to log out?'
    },
    'toast.welcome': {
      es: 'Bienvenido/a {name}.',
      en: 'Welcome, {name}.'
    }
  };

  const ATTRS = ['aria-label', 'title', 'placeholder', 'content', 'alt'];
  const SKIP_SELECTOR = 'script, style, noscript, textarea, code, pre';
  const textSources = new WeakMap();
  let observer = null;
  let applying = false;
  let queued = false;

  const stripMarks = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿¡]/g, '')
    .trim();

  const preserveSpacing = (source, translated) => {
    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    return `${leading}${translated}${trailing}`;
  };

  const currentLanguage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : 'es';
  };

  const interpolate = (template, params = {}) =>
    template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '');

  const mapStatus = (status, lang = currentLanguage()) => translate(status, lang);

  function translate(source, lang = currentLanguage()) {
    if (source === null || source === undefined) return '';
    const raw = String(source);
    const key = stripMarks(raw);
    if (!key) return raw;

    const dictionary = lang === 'en' ? EN : ES;
    if (dictionary[key]) return preserveSpacing(raw, dictionary[key]);
    if (dictionary[raw.trim()]) return preserveSpacing(raw, dictionary[raw.trim()]);

    if (lang === 'en') {
      const patterns = [
        [/^Sesion activa: (.+)\. Deseas cerrar sesion\?$/, (_, name) => `Active session: ${name}. Do you want to log out?`],
        [/^Error de base de datos: (.+)$/, (_, error) => `Database error: ${translate(error, 'en')}`],
        [/^No hay stock suficiente para (.+)\.$/, (_, product) => `There is not enough stock for ${product}.`],
        [/^No se pudo registrar la compra: (.+)$/, (_, error) => `The purchase could not be registered: ${error}`],
        [/^No se pudo crear la cuenta: (.+)$/, (_, error) => `The account could not be created: ${error}`],
        [/^No se pudo crear empleado: (.+)$/, (_, error) => `The employee could not be created: ${error}`],
        [/^No se pudo guardar producto: (.+)$/, (_, error) => `The product could not be saved: ${error}`],
        [/^No se pudo actualizar producto: (.+)$/, (_, error) => `The product could not be updated: ${error}`],
        [/^No se pudo actualizar pedido: (.+)$/, (_, error) => `The order could not be updated: ${error}`],
        [/^Bienvenido\/a (.+)\.$/, (_, name) => `Welcome, ${name}.`],
        [/^Pedido marcado como (.+)\.$/, (_, status) => `Order marked as ${mapStatus(status, 'en')}.`],
        [/^Orden (.+)$/, (_, id) => `Order ${id}`],
        [/^Stock: (.+)$/, (_, count) => `Stock: ${count}`],
        [/^Total: (.+)$/, (_, total) => `Total: ${total}`],
        [/^(.+) \(ADMIN\)$/, (_, name) => `${name} (Admin)`],
        [/^(.+) \(EMPLEADO\)$/, (_, name) => `${name} (Employee)`],
        [/^(.+) \(CLIENTE\)$/, (_, name) => `${name} (Customer)`]
      ];

      for (const [regex, replacer] of patterns) {
        const match = key.match(regex);
        if (match) return preserveSpacing(raw, replacer(...match));
      }
    }

    return raw;
  }

  function t(key, params = {}, lang = currentLanguage()) {
    const entry = PARAM_KEYS[key];
    if (!entry) return key;
    return interpolate(entry[lang] || entry.es, params);
  }

  function list(key, lang = currentLanguage()) {
    return [...(LISTS[lang]?.[key] || LISTS.es[key] || [])];
  }

  function translateTextNode(node, lang) {
    const source = textSources.get(node) || node.nodeValue;
    if (!textSources.has(node)) textSources.set(node, source);
    const translated = translate(source, lang);
    if (node.nodeValue !== translated) node.nodeValue = translated;
  }

  function sourceAttr(attr) {
    return `data-i18n-source-${attr.replace(/[^a-z0-9]/gi, '-')}`;
  }

  function translateAttribute(el, attr, lang) {
    if (!el.hasAttribute(attr)) return;
    const sourceName = sourceAttr(attr);
    const source = el.getAttribute(sourceName) || el.getAttribute(attr);
    if (!el.hasAttribute(sourceName)) el.setAttribute(sourceName, source);
    const translated = translate(source, lang);
    if (el.getAttribute(attr) !== translated) el.setAttribute(attr, translated);
  }

  function translateElement(el, lang) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
    if (el.matches(SKIP_SELECTOR)) return;
    ATTRS.forEach(attr => translateAttribute(el, attr, lang));
  }

  function walk(root, lang) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (!root.parentElement?.closest(SKIP_SELECTOR)) translateTextNode(root, lang);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    translateElement(root, lang);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches(SKIP_SELECTOR)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.nodeType === Node.TEXT_NODE && node.parentElement?.closest(SKIP_SELECTOR)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, lang);
      else translateElement(node, lang);
      node = walker.nextNode();
    }
  }

  function apply(lang = currentLanguage()) {
    applying = true;
    const normalized = LANGUAGES.includes(lang) ? lang : 'es';
    document.documentElement.lang = normalized;
    document.title = translate('OmegaFiguresWeb | Tienda oficial', normalized);
    const select = document.getElementById('languageSelect');
    if (select && select.value !== normalized) select.value = normalized;
    walk(document, normalized);
    applying = false;
  }

  function scheduleApply() {
    if (applying || queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  }

  function setLanguage(lang) {
    const normalized = LANGUAGES.includes(lang) ? lang : 'es';
    localStorage.setItem(STORAGE_KEY, normalized);
    apply(normalized);
    window.dispatchEvent(new CustomEvent('omega:languagechange', { detail: { lang: normalized } }));
  }

  function init() {
    const select = document.getElementById('languageSelect');
    if (select) {
      select.value = currentLanguage();
      select.addEventListener('change', e => setLanguage(e.target.value));
    }

    observer = new MutationObserver(() => scheduleApply());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });

    apply();
  }

  window.OmegaI18n = {
    apply,
    list,
    setLanguage,
    t,
    translate,
    currentLanguage
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
