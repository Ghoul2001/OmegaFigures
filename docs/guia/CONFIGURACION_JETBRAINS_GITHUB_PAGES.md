# Guía de configuración: JetBrains + GitHub + GitHub Pages

## 1. Crear el proyecto en JetBrains

1. Abre IntelliJ IDEA o WebStorm.
2. Selecciona `File > Open`.
3. Selecciona la carpeta `OmegaFiguresWeb`.
4. Espera a que JetBrains indexe el proyecto.
5. Abre `docs/index.html`.
6. Haz clic derecho y selecciona `Open in Browser`.

## 2. Probar el sitio localmente

Puedes abrir directamente:

```text
docs/index.html
```

También puedes usar el servidor local integrado de JetBrains con `Open in Browser`.

## 3. Subir a GitHub desde la terminal

Desde la carpeta raíz del proyecto:

```bash
git init
git add .
git commit -m "Proyecto OmegaFiguresWeb para GitHub Pages"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/OmegaFiguresWeb.git
git push -u origin main
```

Cambia `TU_USUARIO` por tu usuario de GitHub.

## 4. Activar GitHub Pages

En GitHub:

```text
Settings > Pages
```

Configura:

```text
Source: Deploy from a branch
Branch: main
Folder: /docs
```

Guarda y espera unos minutos.

La URL será similar a:

```text
https://TU_USUARIO.github.io/OmegaFiguresWeb/
```

## 5. Actualizar cambios después

Cada vez que modifiques el proyecto:

```bash
git status
git add .
git commit -m "Actualizar sitio"
git push
```

GitHub Pages se actualizará automáticamente.

## 6. Archivos importantes

- `docs/index.html`: estructura principal del sitio.
- `docs/assets/css/styles.css`: estilos visuales.
- `docs/assets/js/app.js`: funcionalidad completa.
- `docs/assets/img/`: imágenes SVG de productos.
- `database/omegafiguresdb_unico_final.sql`: base SQL de referencia.

## 7. Recomendación

No cambies el nombre de la carpeta `docs`, porque GitHub Pages publicará desde ahí.
