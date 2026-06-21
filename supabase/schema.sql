-- Habilitar extensión uuid-ossp si es necesario (opcional)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de regalos / productos
CREATE TABLE IF NOT EXISTS productos_regalo (
    id bigserial PRIMARY KEY,
    nombre text NOT NULL,
    descripcion text,
    cantidad_total integer NOT NULL,
    cantidad_disponible integer NOT NULL,
    activo boolean DEFAULT true,
    tipo_team text CHECK (tipo_team IN ('nino', 'nina', 'unisex')) DEFAULT 'unisex',
    created_at timestamp with time zone DEFAULT now()
);

-- 2. Tabla de invitados
CREATE TABLE IF NOT EXISTS invitados_revelacion (
    id bigserial PRIMARY KEY,
    nombre text NOT NULL,
    telefono text,
    team text CHECK (team IN ('nino', 'nina')),
    producto_id bigint REFERENCES productos_regalo(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- 3. Tabla de correos de administradores autorizados
CREATE TABLE IF NOT EXISTS admin_emails (
    email text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now()
);

-- ==========================================
-- Habilitar Row Level Security (RLS)
-- ==========================================
ALTER TABLE productos_regalo ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitados_revelacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- Políticas para productos_regalo
-- ==========================================

-- Lectura pública: permite a cualquiera ver los regalos activos con stock disponible
CREATE POLICY "Permitir lectura publica de regalos activos con stock" 
ON productos_regalo 
FOR SELECT 
USING (activo = true AND cantidad_disponible > 0);

-- Control total para administradores autenticados autorizados
CREATE POLICY "Permitir control total de regalos a administradores" 
ON productos_regalo 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM admin_emails WHERE email = auth.jwt() ->> 'email'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM admin_emails WHERE email = auth.jwt() ->> 'email'
    )
);

-- ==========================================
-- Políticas para invitados_revelacion
-- ==========================================

-- Lectura exclusiva de invitados para administradores
CREATE POLICY "Permitir lectura de invitados solo a admins" 
ON invitados_revelacion 
FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM admin_emails WHERE email = auth.jwt() ->> 'email'
    )
);

-- El público NO tiene políticas para insertar, actualizar o eliminar directamente.
-- Toda inserción se realiza exclusivamente por medio de la función RPC (SECURITY DEFINER).

-- ==========================================
-- Políticas para admin_emails
-- ==========================================

-- Permite a un usuario autenticado verificar si su propio email está en la lista de administradores
CREATE POLICY "Permitir lectura de su propio email admin" 
ON admin_emails 
FOR SELECT 
TO authenticated 
USING (
    email = auth.jwt() ->> 'email' 
    OR EXISTS (
        SELECT 1 FROM admin_emails WHERE email = auth.jwt() ->> 'email'
    )
);

-- ==========================================
-- Función RPC: confirmar_invitado (Transaccional, Segura y con Selección Obligatoria)
-- ==========================================

CREATE OR REPLACE FUNCTION confirmar_invitado(
    p_nombre text,
    p_telefono text,
    p_team text,
    p_producto_id bigint
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER -- Se ejecuta con privilegios del creador (omitiendo RLS para la inserción interna y actualización de stock)
AS $$
DECLARE
    v_disponible integer;
    v_nombre_regalo text;
    v_tipo_team text;
BEGIN
    -- Validar nombre no vacío
    IF p_nombre IS NULL OR trim(p_nombre) = '' THEN
        RETURN jsonb_build_object('success', false, 'message', 'El nombre no puede estar vacío.');
    END IF;

    -- Validar team
    IF p_team IS NULL OR p_team NOT IN ('nino', 'nina') THEN
        RETURN jsonb_build_object('success', false, 'message', 'Debes elegir un equipo válido (nino o nina).');
    END IF;

    -- Validar que el regalo sea OBLIGATORIO
    IF p_producto_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Debes seleccionar un regalo de la lista para confirmar tu asistencia.');
    END IF;

    -- Bloquear el registro del regalo para evitar condiciones de carrera concurrentes (SELECT FOR UPDATE)
    SELECT cantidad_disponible, nombre, tipo_team INTO v_disponible, v_nombre_regalo, v_tipo_team
    FROM productos_regalo
    WHERE id = p_producto_id AND activo = true
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'El regalo seleccionado no está disponible o no existe.');
    END IF;

    IF v_disponible <= 0 THEN
        RETURN jsonb_build_object('success', false, 'message', '¡Ups! El regalo "' || v_nombre_regalo || '" acaba de ser seleccionado por otro invitado.');
    END IF;

    -- Validar que el regalo sea compatible con el equipo seleccionado (o unisex)
    IF v_tipo_team <> 'unisex' AND v_tipo_team <> p_team THEN
        RETURN jsonb_build_object('success', false, 'message', 'El regalo seleccionado no corresponde al equipo de tu palpito.');
    END IF;

    -- Descontar el stock en 1 unidad
    UPDATE productos_regalo
    SET cantidad_disponible = cantidad_disponible - 1
    WHERE id = p_producto_id;

    -- Registrar el invitado
    INSERT INTO invitados_revelacion (nombre, telefono, team, producto_id)
    VALUES (trim(p_nombre), trim(p_telefono), p_team, p_producto_id);

    RETURN jsonb_build_object('success', true, 'message', '¡Confirmación registrada con éxito!');
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'message', 'Error interno al procesar la confirmación: ' || SQLERRM);
END;
$$;

-- ==========================================
-- Inserts de ejemplo con clasificación de equipo
-- ==========================================

-- Limpiar si hay datos previos para evitar conflictos de claves primarias
TRUNCATE TABLE invitados_revelacion CASCADE;
TRUNCATE TABLE productos_regalo CASCADE;

-- Lista de regalos clasificados por equipo
INSERT INTO productos_regalo (nombre, descripcion, cantidad_total, cantidad_disponible, tipo_team) VALUES
-- Regalos Unisex (Aptos para ambos)
('Termómetro para Bebé', 'Termómetro digital clínico.', 1, 1, 'unisex'),
('Toallitas Húmedas', 'Paquetes de toallitas húmedas hipoalergénicas.', 8, 8, 'unisex'),
('Óleo Calcáreo / Crema Antipañalitis', 'Para el cuidado de la colita del bebé.', 4, 4, 'unisex'),
('Biberón Chicco / Avent', 'Biberón de flujo lento / anticólico.', 2, 2, 'unisex'),

-- Regalos específicos para Team Niño
('Pañales Talle P (Celeste)', 'Pañales para recién nacido - Diseño Varón.', 5, 5, 'nino'),
('Pañales Talle M (Celeste)', 'Pañales talle Mediano - Diseño Varón.', 10, 10, 'nino'),
('Toalla con Capucha (Celeste)', 'Toalla suave de baño con capucha celeste.', 3, 3, 'nino'),
('Set Baberos Varón', 'Set de 3 baberos con diseños celestes / azul.', 4, 4, 'nino'),
('Corta Uñas y Cepillo (Azul)', 'Set de higiene personal infantil.', 2, 2, 'nino'),

-- Regalos específicos para Team Niña
('Pañales Talle P (Rosa)', 'Pañales para recién nacido - Diseño Nena.', 5, 5, 'nina'),
('Pañales Talle M (Rosa)', 'Pañales talle Mediano - Diseño Nena.', 10, 10, 'nina'),
('Toalla con Capucha (Rosa)', 'Toalla suave de baño con capucha rosa.', 3, 3, 'nina'),
('Set Baberos Nena', 'Set de 3 baberos con diseños rosas / pastel.', 4, 4, 'nina'),
('Corta Uñas y Cepillo (Rosa)', 'Set de higiene personal infantil.', 2, 2, 'nina');

-- Ejemplo de emails de administrador
INSERT INTO admin_emails (email) VALUES
('admin@dekalpar.com.py'),
('invitado@admin.com')
ON CONFLICT (email) DO NOTHING;
