# Configuración de Supabase SQL para OmegaFiguresWeb

Esta guía permite conectar OmegaFiguresWeb publicado en GitHub Pages con una base SQL real en la nube usando Supabase/PostgreSQL.

## 1. Crear cuenta y proyecto

1. Entra a https://supabase.com
2. Crea una cuenta o inicia sesión.
3. Crea un nuevo proyecto.
4. Guarda la contraseña de la base de datos.
5. Espera a que el proyecto termine de crearse.

## 2. Ejecutar el SQL

1. En Supabase entra a `SQL Editor`.
2. Abre el archivo del proyecto:

```text
database/omegafiguresweb_supabase.sql
```

3. Copia todo el contenido.
4. Pégalo en el SQL Editor.
5. Presiona `Run`.

Esto creará:

- `users`
- `products`
- `orders`
- `order_items`
- roles iniciales
- productos iniciales
- pedidos iniciales

## 3. Copiar URL y anon key

En Supabase entra a:

```text
Project Settings > API
```

Copia:

- Project URL
- anon public key

## 4. Pegar la configuración en el proyecto

Abre:

```text
docs/assets/js/supabase-config.js
```

Y reemplaza:

```javascript
window.OMEGA_SUPABASE = {
  url: 'PEGA_AQUI_TU_SUPABASE_URL',
  anonKey: 'PEGA_AQUI_TU_SUPABASE_ANON_KEY'
};
```

por algo parecido a:

```javascript
window.OMEGA_SUPABASE = {
  url: 'https://xxxxxxxxxxxx.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

No uses la `service_role key` en el navegador.

## 5. Probar que funciona

Abre:

```text
docs/index.html
```

Luego intenta:

1. Iniciar sesión como cliente.
2. Agregar un producto al carrito.
3. Finalizar compra.
4. Revisar en Supabase la tabla `orders`.

Si aparece una nueva orden, la conexión SQL está funcionando.

## 6. Verificación directa en Supabase

Ejecuta:

```text
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;
```

## 7. Publicar en GitHub Pages

Cuando funcione localmente, sube el proyecto a GitHub y activa Pages desde:

```text
Settings > Pages > Deploy from a branch > main > /docs
```
