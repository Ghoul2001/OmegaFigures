# OmegaFiguresWeb - Versión oficial con SQL

OmegaFiguresWeb es una tienda online de figuras de colección publicada con GitHub Pages y conectada a una base de datos SQL en la nube usando Supabase/PostgreSQL.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Chart.js
- GitHub Pages
- Supabase PostgreSQL

## Estructura

```text
OmegaFiguresWeb_OFICIAL_SQL/
├── README.md
├── .gitignore
├── database/
│   ├── omegafiguresweb_supabase.sql
│   └── omegafiguresdb_unico_final.sql
└── docs/
    ├── index.html
    ├── .nojekyll
    ├── assets/
    │   ├── css/styles.css
    │   ├── js/app.js
    │   ├── js/supabase-config.js
    │   └── img/
    └── guia/
        ├── CONFIGURACION_JETBRAINS_GITHUB_PAGES.md
        └── CONFIGURACION_SUPABASE_SQL.md
```

## Cuentas iniciales

| Rol | Correo | Contraseña |
|---|---|---|
| ADMIN | admin@omegafigures.com | admin123 |
| EMPLEADO | empleado@omegafigures.com | empleado123 |
| CLIENTE | cliente@omegafigures.com | cliente123 |

## Configuración de base de datos

1. Crea un proyecto en Supabase.
2. Abre SQL Editor.
3. Ejecuta `database/omegafiguresweb_supabase.sql`.
4. Copia tu Project URL y anon public key.
5. Pega esos valores en `docs/assets/js/supabase-config.js`.

```javascript
window.OMEGA_SUPABASE = {
  url: 'https://TU-PROYECTO.supabase.co',
  anonKey: 'TU_ANON_PUBLIC_KEY'
};
```

## Probar localmente en JetBrains

1. Abre el proyecto con `File > Open`.
2. Abre `docs/index.html`.
3. Clic derecho > `Open in Browser`.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. Entra a `Settings > Pages`.
3. Selecciona:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /docs
4. Guarda los cambios.

La página quedará disponible en:

```text
https://TU_USUARIO.github.io/OmegaFiguresWeb/
```

## Nota de seguridad

Esta versión está preparada para un proyecto académico/portafolio. No uses datos reales de tarjetas, pagos o contraseñas personales. Para una tienda comercial real se debe implementar autenticación con Supabase Auth, políticas RLS estrictas y pasarela de pagos segura.
