# 🌺 Mulata Project

Aplicación web tipo **Single Page Application (SPA)** construida con **Vite + JavaScript vanilla + Bootstrap**. Incluye sistema de autenticación, gestión de usuarios (admin), bloc de notas personal y más.

---

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| Vite | Bundler y servidor de desarrollo |
| JavaScript ES Modules | Lógica de la app |
| Bootstrap 5 | Estilos y componentes UI |
| json-server | API REST simulada (backend) |
| localStorage | Gestión de sesión |

---

## 📁 Estructura del proyecto

```
src/
├── controllers/
│   ├── dashboard.controller.js   # CRUD de usuarios (solo admin)
│   ├── home.controller.js        # Eventos del home
│   ├── login.controller.js       # Autenticación
│   ├── logout.controller.js      # Cerrar sesión
│   ├── profile.controller.js     # Editar perfil propio
│   └── project.controller.js     # CRUD de notas personales
├── router/
│   └── routes.js                 # Router SPA con guards
├── Views/
│   ├── dashboardView.js          # Tabla de usuarios
│   ├── homeView.js               # Pantalla principal
│   ├── importantView.js          # Vista especial 🎵
│   ├── LoginView.js              # Formulario de login
│   ├── notFound.js               # Página 404
│   ├── profileView.js            # Formulario de perfil
│   └── projectView.js            # Bloc de notas
├── main.js                       # Punto de entrada
└── style.css                     # Estilos globales
database/
└── db.json                       # Base de datos de json-server
```

---

## ⚙️ Instalación y uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el backend (json-server)
```bash
npx json-server --watch database/db.json --port 3000
```

### 3. Iniciar el frontend (Vite)
```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## 🔐 Sistema de autenticación

El login valida las credenciales contra `json-server`. Al autenticarse correctamente, el objeto `user` se guarda en `localStorage` y el router lo usa para proteger las rutas.

```js
// Estructura del usuario en localStorage
{
  id: "1",
  name: "Juan",
  username: "juan@mail.com",
  password: "1234",
  role: "admin" // o "user"
}
```

---

## 🗺️ Rutas disponibles

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Home con saludo personalizado | Usuarios logueados |
| `/login` | Formulario de inicio de sesión | Públic (redirige si hay sesión) |
| `/dashboard` | Gestión de usuarios (CRUD) | Solo `admin` |
| `/profile` | Editar nombre, username y contraseña | Usuarios logueados |
| `/project` | Bloc de notas personal | Usuarios logueados |
| `/important` | 🎵 Mensaje muy importante | Usuarios logueados |

### Guards del router

- **Ruta protegida sin sesión** → redirige a `/login`
- **Dashboard sin rol admin** → redirige a `/`
- **Ir a `/login` con sesión activa** → redirige a `/`
- **URL inexistente** → muestra página 404

---

## 📋 Funcionalidades por rol

### Usuario (`role: "user"`)
- Ver saludo personalizado en el home
- Editar su propio perfil
- Crear, editar y eliminar sus notas personales
- Ver el mensaje importante 🎵

### Administrador (`role: "admin"`)
- Todo lo anterior
- Acceso al **Dashboard** con tabla completa de usuarios
- Crear nuevos usuarios
- Editar nombre, username y rol de cualquier usuario
- Eliminar usuarios

---

## 📝 Bloc de notas

Cada nota pertenece al usuario que la creó (`userId`). Al cargar la vista, se traen todas las notas y se filtran por el `userId` del usuario en sesión, garantizando privacidad entre usuarios.

```js
// Estructura de una nota en db.json
{
  "id": "1",
  "title": "Mi primera nota",
  "content": "Contenido de la nota",
  "userId": "1",
  "date": "5/6/2026"
}
```

---

## 🎵 Vista `/important`

Al entrar a esta ruta se muestra una pantalla de advertencia a pantalla completa que reproduce automáticamente un video sorpresa de YouTube. El botón **"Déjame salir"** redirige de vuelta al home.

---

## 🏗️ Arquitectura SPA

El router (`routes.js`) es el núcleo de la navegación:

1. Lee la URL actual con `window.location.pathname`
2. Aplica los guards de seguridad
3. Inyecta el HTML de la vista en `<div id="app">`
4. Ejecuta el controlador correspondiente para activar los eventos

Los controladores nunca se ejecutan antes que su vista — el HTML siempre existe en el DOM cuando el controlador busca elementos con `getElementById`.

---

## 🗄️ API (json-server)

Base URL: `http://localhost:3000`

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/users` | Listar todos los usuarios |
| GET | `/users/:id` | Obtener un usuario |
| POST | `/users` | Crear usuario |
| PATCH | `/users/:id` | Actualizar usuario parcialmente |
| DELETE | `/users/:id` | Eliminar usuario |
| GET | `/notes` | Listar todas las notas |
| POST | `/notes` | Crear nota |
| PATCH | `/notes/:id` | Actualizar nota |
| DELETE | `/notes/:id` | Eliminar nota |
