# Proyecto Supabase: Auth, Database & Storage

Aplicación web desarrollada con **React**, **TypeScript**, **Vite** y **Supabase**, que implementa autenticación de usuarios, rutas protegidas, gestión de tareas en base de datos PostgreSQL y almacenamiento de fotos de perfil mediante Supabase Storage.

---

## Credenciales de Acceso para el Docente

Para evaluar y probar el funcionamiento del sistema con una cuenta previamente creada y verificada, utilice las siguientes credenciales:

- **Correo electrónico:** `test11@gmail.com`
- **Contraseña:** `test123`

---

## Instrucciones para Ejecutar el Proyecto

### 1. Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Gestor de paquetes `npm`

### 2. Instalación y Puesta en Marcha
Abra una terminal en la raíz del repositorio y ejecute:

```bash
# 1. Navegar a la carpeta del proyecto
cd supabase

# 2. Instalar dependencias (si aún no se han instalado)
npm install

# 3. Iniciar el servidor de desarrollo local
npm run dev
```

Abra su navegador web en:
👉 **`http://localhost:5173/`**

> **Variables de entorno:** El archivo `.env` ya se encuentra configurado en la carpeta `supabase/` con las credenciales de conexión (`VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY`).

---

## Guía de Pruebas Paso a Paso

### 1. Rutas Protegidas
- Al abrir la página sin iniciar sesión, el sistema restringe el acceso al gestor de tareas.
- Si se intenta ingresar directamente a `http://localhost:5173/#tareas`, el guardia de ruta (`ProtectedRoute`) bloquea la vista y solicita autenticación.

### 2. Inicio de Sesión (Supabase Auth)
- En el header superior, haga clic en **Iniciar Sesión**.
- Ingrese `test11@gmail.com` y la contraseña `test123`.
- Haga clic en **Entrar**. El sistema validará la sesión y le dará acceso inmediato al panel de tareas.

### 3. Gestión de Tareas (Base de Datos Supabase)
- **Crear tarea:** Ingrese un título en el campo de texto y pulse **Agregar tarea**.
- **Completar / Desmarcar:** Haga clic en la casilla de verificación de cualquier tarea para alternar su estado.
- **Filtros:** Filtre por *Todas*, *Pendientes* o *Completadas*.
- **Eliminar tarea:** Haga clic en el ícono de papelera para suprimirla de la base de datos.
- **Recargar:** Haga clic en **Actualizar** para sincronizar con la base de datos.

### 4. Foto de Perfil (Supabase Storage)
- En la barra superior del panel, haga clic en **Subir foto de perfil**.
- Seleccione una imagen (JPG, PNG o WebP).
- El sistema subirá el archivo al bucket `avatars` en Supabase Storage y actualizará la foto en tiempo real.

### 5. Cierre de Sesión
- En la esquina superior derecha, haga clic en **Cerrar Sesión**.
- La sesión se destruirá en Supabase Auth y la interfaz volverá a quedar protegida.

---

## Estructura de la Base de Datos

Tabla `tareas` en PostgreSQL (Supabase):

```sql
create table tareas (
  id bigint generated always as identity primary key,
  titulo text not null,
  completada boolean default false,
  user_id uuid references auth.users default auth.uid(),
  created_at timestamptz default now()
);
```
