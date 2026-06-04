# Proyecto Spring Boot - Controllers y Rest Controllers

Aplicacion Spring Boot creada para demostrar:

- Creacion de proyecto con Spring Initializr.
- Uso de `@Controller` con Thymeleaf.
- Uso de `@RestController` con respuestas JSON.
- Uso de `Model` para enviar datos a vistas.

## Dependencias

El proyecto usa Maven con:

- Spring Web
- Thymeleaf
- Spring Boot Starter Test
- Spring Boot Starter WebMVC Test

## Ejecutar

Desde la carpeta `springboot`:

```powershell
.\run-springboot.bat
```

La aplicacion levanta en:

```text
http://localhost:8080
```

La seccion Spring de la pagina principal usa este servidor para abrir las vistas MVC y probar los endpoints REST desde botones interactivos.

## Endpoints MVC

```text
GET /
GET /gestionUsuarios
GET /informacion
```

## Endpoints REST

```text
GET /api/v1/usuarios
GET /api/saludo
```

Respuesta esperada de `/api/v1/usuarios`:

```json
{
  "Usuario": {
    "id": 1,
    "perfil": "civil",
    "nombre": "Luis Teran",
    "cedula": "1714032587",
    "correo": "lteran@gmail.com",
    "clave": "lteran"
  }
}
```

Respuesta esperada de `/api/saludo`:

```json
{
  "mensaje": "Hola desde Spring Boot!"
}
```

## Pruebas

```bash
mvn test
```
