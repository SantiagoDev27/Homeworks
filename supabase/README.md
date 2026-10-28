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
Abra una terminal en la raíz del proyecto y ejecute los siguientes comandos:

```bash
# 1. Navegar a la carpeta del proyecto
cd supabase

# 2. Instalar las dependencias (si aún no se han instalado)
npm install

# 3. Iniciar el servidor de desarrollo local
npm run dev
```

El servidor iniciará localmente. Abra su navegador web en:
👉 **`http://localhost:5173/`**

> **Nota sobre variables de entorno:** El archivo `.env` ya se encuentra configurado en la carpeta `supabase/` con las claves de conexión (`VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY`) apuntando al proyecto en Supabase.

---

## Guía de Pruebas Paso a Paso

### 1. Verificación de Rutas Protegidas
- Al ingresar por primera vez a `http://localhost:5173/`, el sistema detecta que no hay una sesión activa.
- Si intenta forzar la navegación a `http://localhost:5173/#tareas`, el guardia de ruta (`ProtectedRoute`) bloqueará el acceso, mostrando el mensaje de acceso restringido y solicitando iniciar sesión.

### 2. Inicio de Sesión (Supabase Auth)
- En la barra de navegación superior, pulse el botón **Iniciar Sesión**.
- Ingrese las credenciales indicadas (`test11@gmail.com` / `test123`) y haga clic en **Entrar**.
- El sistema validará las credenciales contra Supabase Auth y redirigirá automáticamente a la interfaz protegida de tareas.

### 3. Gestión de Tareas (Supabase Database)
La interfaz interactúa directamente con la tabla `tareas` en la base de datos de Supabase:
- **Agregar tarea:** Escriba un título en el campo de texto y pulse **Agregar tarea**.
- **Completar / Desmarcar:** Haga clic en la casilla de verificación de cualquier tarea para alternar su estado entre pendiente y completada.
- **Filtrar tareas:** Utilice los botones de filtro (*Todas*, *Pendientes*, *Completadas*) para organizar la vista.
- **Eliminar tarea:** Haga clic en el ícono de papelera para suprimir una tarea de la base de datos.
- **Actualizar en tiempo real:** Pulse **Actualizar** para recargar los datos desde el servidor.

### 4. Subida de Foto de Perfil (Supabase Storage)
- En el panel superior verá la sección de perfil del usuario autenticado.
- Haga clic en el botón **Subir foto de perfil** y seleccione cualquier archivo de imagen (PNG, JPG o WebP).
- El sistema subirá el archivo al bucket `avatars` en Supabase Storage, generará su URL pública y actualizará el avatar en pantalla en tiempo real.

### 5. Cierre de Sesión
- En la esquina superior derecha del encabezado, pulse **Cerrar Sesión**.
- La sesión se destruirá en Supabase Auth y el usuario será devuelto a la pantalla de acceso restringido.

---

## Estructura de la Base de Datos

El módulo de tareas opera sobre la siguiente tabla en PostgreSQL (Supabase):

```sql
create table tareas (
  id bigint generated always as identity primary key,
  titulo text not null,
  completada boolean default false,
  user_id uuid references auth.users default auth.uid(),
  created_at timestamptz default now()
);
```

---

## Tecnologías Utilizadas

- **Frontend:** React 19, TypeScript, Vite
- **Estilos:** CSS Vanilla (diseño sobrio, responsivo y modo oscuro)
- **Backend / BaaS:** Supabase
  - **Auth:** Gestión y persistencia de sesiones seguras
  - **Database:** PostgreSQL con políticas y operaciones CRUD
  - **Storage:** Almacenamiento y distribución pública de avatares (bucket `avatars`)
