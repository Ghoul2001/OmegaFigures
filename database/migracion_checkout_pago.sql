-- =========================================================
-- OmegaFiguresWeb - Migración para checkout y datos de pago
-- Usa este archivo SOLO si ya tienes la base creada y no quieres borrar tablas.
-- Si vas a empezar desde cero, ejecuta database/omegafiguresweb_supabase.sql.
-- =========================================================

ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS customer_name VARCHAR(160),
ADD COLUMN IF NOT EXISTS shipping_phone VARCHAR(40),
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS shipping_city VARCHAR(100),
ADD COLUMN IF NOT EXISTS shipping_country VARCHAR(100),
ADD COLUMN IF NOT EXISTS shipping_notes TEXT,
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(30) DEFAULT 'CARD',
ADD COLUMN IF NOT EXISTS payment_brand VARCHAR(40),
ADD COLUMN IF NOT EXISTS payment_last4 VARCHAR(4);

UPDATE public.orders
SET
  customer_name = COALESCE(customer_name, 'Cliente Omega'),
  shipping_phone = COALESCE(shipping_phone, '+593000000002'),
  shipping_address = COALESCE(shipping_address, 'Dirección registrada'),
  shipping_city = COALESCE(shipping_city, 'Quito'),
  shipping_country = COALESCE(shipping_country, 'Ecuador'),
  payment_method = COALESCE(payment_method, 'CARD'),
  payment_brand = COALESCE(payment_brand, 'CARD')
WHERE customer_name IS NULL
   OR shipping_address IS NULL
   OR payment_method IS NULL;

SELECT 'orders_actualizada' AS resultado, COUNT(*) AS total FROM public.orders;
