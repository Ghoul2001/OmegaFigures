-- =========================================================
-- BASE DE DATOS COMPLETA PARA OMEGAFIGURESWEB
-- PostgreSQL
-- =========================================================
-- Instrucciones:
-- 1. Crear la base de datos: omegafiguresdb
-- 2. Abrir Query Tool sobre la base omegafiguresdb
-- 3. Ejecutar TODO este script
--
-- Este script contiene TODOS los cambios del proyecto:
-- - Roles: ADMIN, EMPLEADO, CLIENTE
-- - Registro completo con teléfono, dirección, ciudad, país, fecha de nacimiento,
--   intereses y newsletter
-- - Productos con categoría/tipo y género/temática
-- - Órdenes, historial y estados de compra
-- - Datos iniciales para pruebas
-- =========================================================

BEGIN;

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CLIENTE'
        CHECK (role IN ('ADMIN', 'EMPLEADO', 'CLIENTE')),
    phone VARCHAR(30),
    address TEXT,
    city VARCHAR(80),
    country VARCHAR(80),
    birth_date DATE,
    interests TEXT,
    receive_newsletter BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email_lower ON users (LOWER(email));
CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_users_created_at ON users (created_at DESC);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category VARCHAR(80) NOT NULL,
    genre VARCHAR(80) NOT NULL DEFAULT 'General',
    image_url TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_active ON products (active);
CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_genre ON products (genre);
CREATE INDEX idx_products_price ON products (price);
CREATE INDEX idx_products_name_lower ON products (LOWER(name));

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    status VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE'
        CHECK (status IN ('PENDIENTE', 'APROBADA', 'RECHAZADA', 'ENVIADA')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders (user_id);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0)
);

CREATE INDEX idx_order_items_order_id ON order_items (order_id);
CREATE INDEX idx_order_items_product_id ON order_items (product_id);

-- =========================================================
-- USUARIOS INICIALES
-- =========================================================
-- Administrador:
-- Correo: admin@omegafigures.com
-- Contraseña: admin123
INSERT INTO users
(name, email, password_hash, role, phone, address, city, country, birth_date, interests, receive_newsletter, created_at)
VALUES
('Administrador Omega',
 'admin@omegafigures.com',
 'T21lZ2FBZG1pblNhbHQxIQ==:bzO78jKNmIVyXYPiBZUpYuHMPaxHrgFAVuQ9Bj2l4Uo=',
 'ADMIN',
 '0000000000',
 'Oficina principal OmegaFiguresWeb',
 'Quito',
 'Ecuador',
 NULL,
 'Estadísticas, administración, creación de empleados',
 FALSE,
 CURRENT_TIMESTAMP - INTERVAL '45 days');

-- Empleado:
-- Correo: empleado@omegafigures.com
-- Contraseña: empleado123
INSERT INTO users
(name, email, password_hash, role, phone, address, city, country, birth_date, interests, receive_newsletter, created_at)
VALUES
('Empleado Omega',
 'empleado@omegafigures.com',
 'RW1wbGVhZG9TYWx0MTIzNA==:gKDXrMRMvwCgGt6fEymEq8x1HfSyk8Z6ORAlozCA7RI=',
 'EMPLEADO',
 '0999999999',
 'Área de gestión de productos',
 'Quito',
 'Ecuador',
 NULL,
 'Gestión de productos, aprobación de compras, atención al cliente',
 FALSE,
 CURRENT_TIMESTAMP - INTERVAL '40 days');

-- Cliente:
-- Correo: cliente@omegafigures.com
-- Contraseña: cliente123
INSERT INTO users
(name, email, password_hash, role, phone, address, city, country, birth_date, interests, receive_newsletter, created_at)
VALUES
('Cliente Demo',
 'cliente@omegafigures.com',
 'Q2xpZW50ZVNhbHQxMjM0NQ==:pOfKm9uBw7DJJ+rMaRtiOHU3aZVDw/IzGADCF3/dHzY=',
 'CLIENTE',
 '0988888888',
 'Dirección de prueba',
 'Quito',
 'Ecuador',
 '2000-01-01',
 'Anime, Marvel, figuras gamer, promociones, novedades',
 TRUE,
 CURRENT_TIMESTAMP - INTERVAL '18 days');

-- Clientes adicionales para estadísticas
INSERT INTO users
(name, email, password_hash, role, phone, city, country, interests, receive_newsletter, created_at)
VALUES
('Cliente Anime', 'anime@omegafigures.com', 'Q2xpZW50ZVNhbHQxMjM0NQ==:pOfKm9uBw7DJJ+rMaRtiOHU3aZVDw/IzGADCF3/dHzY=', 'CLIENTE', '0981111111', 'Quito', 'Ecuador', 'Anime, novedades', TRUE, CURRENT_TIMESTAMP - INTERVAL '12 days'),
('Cliente Gamer', 'gamer@omegafigures.com', 'Q2xpZW50ZVNhbHQxMjM0NQ==:pOfKm9uBw7DJJ+rMaRtiOHU3aZVDw/IzGADCF3/dHzY=', 'CLIENTE', '0982222222', 'Guayaquil', 'Ecuador', 'Gaming, ofertas', TRUE, CURRENT_TIMESTAMP - INTERVAL '5 days');

-- =========================================================
-- PRODUCTOS INICIALES
-- category = tipo de producto
-- genre    = género/temática para filtros
-- =========================================================
INSERT INTO products
(name, description, price, stock, category, genre, image_url, active, created_at)
VALUES
('Goku Super Saiyan Figure',
 'Figura coleccionable de Goku con acabado premium y base de exhibición. Ideal para fanáticos del anime y coleccionistas.',
 34.99, 15, 'Figura', 'Anime',
 'https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '20 days'),

('Darth Vader Deluxe',
 'Figura edición deluxe inspirada en ciencia ficción, perfecta para vitrinas, escritorios o colecciones temáticas.',
 49.99, 10, 'Figura', 'Sci-Fi',
 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '17 days'),

('Robot Mecha Omega',
 'Mecha articulado con detalles metálicos, accesorios intercambiables y diseño futurista de colección.',
 59.99, 8, 'Coleccionable', 'Mecha',
 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '15 days'),

('Marvel Hero Collector',
 'Figura de superhéroe para fanáticos de cómics y películas. Diseño dinámico y acabado brillante.',
 42.50, 20, 'Figura', 'Superhéroes',
 'https://images.unsplash.com/photo-1624213111452-35e8d3d5cc1f?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '12 days'),

('Samurai Limited Edition',
 'Figura samurái de edición limitada con pintura detallada, pose dinámica y base decorativa.',
 64.99, 5, 'Edición limitada', 'Histórico',
 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '10 days'),

('Funko Style Gamer',
 'Figura estilo chibi para escritorio gamer o colección personal. Diseño divertido y compacto.',
 19.99, 30, 'Coleccionable', 'Gaming',
 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '8 days'),

('Dragon Guardian Statue',
 'Estatua de dragón con acabado de fantasía, textura detallada y base decorativa para exhibición.',
 74.99, 7, 'Estatua', 'Fantasía',
 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '6 days'),

('Retro Pixel Warrior',
 'Figura retro inspirada en videojuegos clásicos de aventura. Perfecta para amantes de lo vintage.',
 24.99, 18, 'Figura', 'Retro',
 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '4 days'),

('Omega Ninja Shadow',
 'Figura ninja de colección con traje oscuro, armas decorativas y estilo moderno.',
 39.99, 12, 'Figura', 'Anime',
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '2 days'),

('Cyberpunk Collector Bot',
 'Figura futurista con estética cyberpunk, colores llamativos y acabado tecnológico.',
 54.99, 9, 'Coleccionable', 'Cyberpunk',
 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80',
 TRUE, CURRENT_TIMESTAMP - INTERVAL '1 day');

-- =========================================================
-- COMPRAS DE PRUEBA PARA ESTADÍSTICAS E HISTORIAL
-- =========================================================
INSERT INTO orders (user_id, total, status, created_at)
VALUES
((SELECT id FROM users WHERE email = 'cliente@omegafigures.com'), 54.98, 'PENDIENTE', CURRENT_TIMESTAMP - INTERVAL '12 days'),
((SELECT id FROM users WHERE email = 'cliente@omegafigures.com'), 84.98, 'APROBADA', CURRENT_TIMESTAMP - INTERVAL '8 days'),
((SELECT id FROM users WHERE email = 'anime@omegafigures.com'), 39.99, 'ENVIADA', CURRENT_TIMESTAMP - INTERVAL '5 days'),
((SELECT id FROM users WHERE email = 'gamer@omegafigures.com'), 24.99, 'RECHAZADA', CURRENT_TIMESTAMP - INTERVAL '3 days'),
((SELECT id FROM users WHERE email = 'gamer@omegafigures.com'), 74.99, 'APROBADA', CURRENT_TIMESTAMP - INTERVAL '1 day');

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES
((SELECT id FROM orders WHERE total = 54.98 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Goku Super Saiyan Figure'), 1, 34.99),
((SELECT id FROM orders WHERE total = 54.98 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Funko Style Gamer'), 1, 19.99),
((SELECT id FROM orders WHERE total = 84.98 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Darth Vader Deluxe'), 1, 49.99),
((SELECT id FROM orders WHERE total = 84.98 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Goku Super Saiyan Figure'), 1, 34.99),
((SELECT id FROM orders WHERE total = 39.99 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Omega Ninja Shadow'), 1, 39.99),
((SELECT id FROM orders WHERE total = 24.99 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Retro Pixel Warrior'), 1, 24.99),
((SELECT id FROM orders WHERE total = 74.99 ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name = 'Dragon Guardian Statue'), 1, 74.99);

COMMIT;

-- Consultas de verificación opcionales:
-- SELECT id, name, email, role, phone, city, country FROM users ORDER BY id;
-- SELECT id, name, category, genre, price, stock, active FROM products ORDER BY id;
-- SELECT id, user_id, total, status, created_at FROM orders ORDER BY id;
-- SELECT * FROM order_items ORDER BY id;
