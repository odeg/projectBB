# Invitación de Revelación de Sexo - Baby Shower 👶🏻🎀💙

Aplicación web interactiva construida con **Vue 3**, **Vite**, **Vuetify**, **Supabase** y desplegada en **Netlify**.

---

## 🚀 Características

- Invitación digital elegante mobile-first (colores crema, beige y marrón)
- Contador regresivo hasta la fecha del evento
- Formulario de confirmación (RSVP) con selección de Team Niño / Team Niña
- Lista de regalos por equipo con stock en tiempo real (descuento atómico vía RPC)
- Panel `/admin` con Supabase Auth, estadísticas y sorteo animado

---

## 📋 PARTE 1 — Crear y Configurar Supabase

### Paso 1: Crear el proyecto en Supabase

1. Ir a [https://supabase.com](https://supabase.com) → **Sign In** con tu cuenta
2. Clic en **"New project"**
3. Completar los campos:
   - **Name**: `baby-reveal` (o cualquier nombre que quieras, no importa)
   - **Database Password**: elegí una contraseña segura y **guardala**, la vas a necesitar para DBeaver
   - **Region**: `South America (São Paulo)` (la más cercana a Paraguay)
4. Clic en **"Create new project"** y esperar ~1 minuto a que provisione

> **Nota importante**: El nombre del proyecto es solo una etiqueta. La base de datos siempre se llama `postgres` internamente — no podés ni necesitás cambiarlo.

---

### Paso 2: Ejecutar el Schema SQL

Una vez creado el proyecto:

1. En el panel lateral de Supabase → clic en **"SQL Editor"** (ícono de terminal)
2. Clic en el botón **"+"** o **"New query"**
3. Abrir el archivo `supabase/schema.sql` de este proyecto
4. Copiar **TODO** el contenido y pegarlo en el editor de Supabase
5. Clic en **"Run"** (o presioná `Ctrl+Enter`)

Esto va a crear:
- ✅ Tabla `productos_regalo` (con regalos de ejemplo ya insertados)
- ✅ Tabla `invitados_revelacion`
- ✅ Tabla `admin_emails`
- ✅ Políticas de seguridad RLS
- ✅ Función RPC `confirmar_invitado`

---

### Paso 3: Crear tu usuario administrador

1. En Supabase → panel lateral → **"Authentication"** → **"Users"**
2. Clic en **"Add user"** → **"Create new user"**
3. Completar:
   - **Email**: tu correo real (ej. `oscar@ejemplo.com`)
   - **Password**: la contraseña que vas a usar para entrar en `/admin`
4. Clic en **"Create user"**

---

### Paso 4: Agregar tu email como administrador autorizado

Ve a **SQL Editor** y ejecutá esto (reemplazando con tu email real):

```sql
INSERT INTO admin_emails (email)
VALUES ('oscar@ejemplo.com')
ON CONFLICT DO NOTHING;
```

---

### Paso 5: Obtener las credenciales de conexión

**Para el proyecto Vue (variables de entorno):**

1. En Supabase → **"Settings"** (engranaje) → **"API"**
2. Copiar:
   - **Project URL** → es tu `VITE_SUPABASE_URL`
   - **anon public** (en la sección "Project API keys") → es tu `VITE_SUPABASE_ANON_KEY`

**Para DBeaver:**

1. En Supabase → **"Settings"** → **"Database"**
2. Bajar hasta **"Connection parameters"** — ahí encontrás:

| Campo DBeaver | Valor en Supabase |
|---|---|
| Host | `db.XXXXXXXXXXXX.supabase.co` |
| Port | `5432` |
| Database | `postgres` |
| Username | `postgres` |
| Password | La contraseña que pusiste al crear el proyecto |

3. En DBeaver → **Nueva conexión** → **PostgreSQL** → completar los campos
4. Pestaña **"SSL"** → activar **"Use SSL"**
5. **"Test Connection"** → si conecta, guardar

---

## 📋 PARTE 2 — Conectar el Proyecto Local a Supabase

### Paso 6: Configurar el archivo .env

En la raíz del proyecto (`projectB/`) abrí el archivo `.env` y reemplazá los valores:

```env
VITE_SUPABASE_URL=https://XXXXXXXXXXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Paso 7: Instalar dependencias y correr local

```bash
npm install
npm run dev
```

La app estará en: **http://localhost:5173**

- **Invitados**: `http://localhost:5173/`
- **Admin login**: `http://localhost:5173/admin/login`
- **Panel admin**: `http://localhost:5173/admin` (redirige al login si no estás autenticado)

---

## 📋 PARTE 3 — Desplegar en Netlify (manteniendo Supabase)

> Supabase es un servicio en la nube — sigue funcionando independientemente de dónde esté desplegado el frontend. Solo necesitás pasarle las mismas variables de entorno a Netlify.

### Paso 8: Subir el proyecto a GitHub

1. Crear un repositorio en [https://github.com](https://github.com) (puede ser privado)
2. En la carpeta del proyecto, iniciar git y subir:

```bash
git init
git add .
git commit -m "Initial commit: Baby Shower Invitation"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/baby-reveal.git
git push -u origin main
```

> **Importante**: El `.env` está en `.gitignore`, así que las credenciales **no se suben** a GitHub. ✅

---

### Paso 9: Crear el sitio en Netlify

1. Ir a [https://netlify.com](https://netlify.com) → **"Add new site"** → **"Import an existing project"**
2. Conectar con **GitHub** y seleccionar el repositorio `baby-reveal`
3. Configurar el build:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Clic en **"Deploy site"** ← pero antes de que funcione necesitamos el paso 10

---

### Paso 10: Agregar las variables de entorno en Netlify

En Netlify → tu sitio → **"Site configuration"** → **"Environment variables"** → **"Add a variable"**:

| Variable | Valor |
|---|---|
| `VITE_SUPABASE_URL` | `https://XXXXXXXXXXXX.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |

Luego de agregar las variables → **"Deploys"** → **"Trigger deploy"** para que se apliquen.

---

### Paso 11: Verificar el deploy

Una vez deployado, Netlify te da una URL del tipo `https://random-name.netlify.app`.

- Entrar a la URL pública y probar:
  - ✅ Que carga la invitación
  - ✅ Que el formulario de RSVP funciona y los regalos se cargan
  - ✅ Que `/admin/login` funciona con tu email y contraseña de Supabase Auth

---

## 📂 Estructura del Código

```
projectB/
├── src/
│   ├── config/evento.js          ← Fecha, hora, dirección del evento (editar aquí)
│   ├── services/
│   │   ├── supabase.js           ← Cliente de Supabase
│   │   ├── regalosService.js     ← Consulta regalos disponibles por equipo
│   │   ├── invitadosService.js   ← Llama a la RPC para confirmar asistencia
│   │   └── adminService.js       ← Consultas del panel admin
│   ├── composables/
│   │   ├── useCountdown.js       ← Lógica del contador regresivo
│   │   ├── useRegalos.js         ← Estado de carga de regalos
│   │   ├── useConfirmacion.js    ← Lógica del formulario RSVP
│   │   └── useAdminAuth.js       ← Login/logout con Supabase Auth
│   ├── components/               ← Componentes visuales reutilizables
│   └── views/                    ← Páginas: HomeView, AdminView, AdminLoginView
├── supabase/schema.sql           ← Definición de la BD (ejecutar en Supabase)
├── .env                          ← Variables de entorno locales (NO subir a Git)
├── .env.example                  ← Ejemplo de variables (sí subir a Git)
└── netlify.toml                  ← Config de rutas SPA para Netlify
```

---

## 🔧 Variables de Entorno

| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase (Settings → API → Project URL) |
| `VITE_SUPABASE_ANON_KEY` | Clave pública anónima (Settings → API → anon public) |

> ⚠️ Nunca uses la `service_role` key en el frontend. La `anon` key es segura porque la seguridad depende de las políticas RLS en Supabase.
