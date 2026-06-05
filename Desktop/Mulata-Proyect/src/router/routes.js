// ─── ROUTER PRINCIPAL ────────────────────────────────────────────────────────
// Este es el cerebro de la navegación de la app.
// Funciona como un Single Page Application (SPA):
// en vez de cargar páginas nuevas, inyecta HTML dinámicamente en el div #app.
// Se ejecuta en main.js cuando el DOM está listo (DOMContentLoaded).

// ── IMPORTACIÓN DE VISTAS ────────────────────────────────────────────────────
// Cada vista es una función que retorna HTML como string
import homeView from "../Views/homeView";         // Vista del home
import loginView from "../Views/LoginView";        // Vista del formulario de login
import notFound from "../Views/notFound";          // Vista del error 404
import importantView from "../Views/importantView"; // Vista troll con rickroll

// ── IMPORTACIÓN DE CONTROLADORES ────────────────────────────────────────────
// Cada controlador es una función que agrega eventos al HTML inyectado
import { login } from "../controllers/login.controller";       // Maneja el submit del login
import { home } from "../controllers/home.controller";         // Maneja el logout del home
import { dashboard } from "../controllers/dashboard.controller"; // CRUD de usuarios
import { profile } from "../controllers/profile.controller";   // Editar perfil propio
import { project } from "../controllers/project.controller";   // CRUD de notas

// ── IMPORTACIÓN DE VISTAS ADICIONALES ───────────────────────────────────────
import dashboardView from "../Views/dashboardView"; // Vista de la tabla de usuarios
import profileView from "../Views/profileView";     // Vista del formulario de perfil
import projectView from "../Views/projectView";     // Vista del bloc de notas

// ── MAPA DE RUTAS ────────────────────────────────────────────────────────────
// Objeto que mapea cada URL a su vista, controlador y si requiere sesión.
// El router busca aquí la ruta actual para saber qué renderizar.
const routes = {

  // Ruta principal — requiere sesión activa
  "/": {
    view: homeView,       // Función que genera el HTML del home
    controller: home,     // Función que activa el botón logout
    protected: true,      // Si no hay sesión, redirige al login
  },
  
  // Ruta de login — accesible sin sesión
  "/login": {
    view: loginView,      // Función que genera el formulario de login
    controller: login,    // Función que maneja el submit del formulario
    // Sin protected: solo usuarios NO logueados deben verla
  },
  
  // Ruta del dashboard — solo para administradores
  "/dashboard": {
    view: dashboardView,     // Función que genera la tabla de usuarios
    controller: dashboard,   // Función con el CRUD de usuarios
    protected: true,         // Requiere sesión activa
    // El router además verifica que el rol sea "admin"
  },
  
  // Ruta del perfil — para todos los usuarios logueados
  "/profile": {
    view: profileView,    // Función que genera el formulario de perfil
    controller: profile,  // Función que guarda los cambios del perfil
    protected: true,      // Requiere sesión activa
  },
  
  // Ruta de notas — para todos los usuarios logueados
  "/project": {
    view: projectView,    // Función que genera el bloc de notas
    controller: project,  // Función con el CRUD de notas
    protected: true,      // Requiere sesión activa
  },
  
  // Ruta troll — para todos los usuarios logueados
  "/important": {
    view: importantView,  // Función que genera el rickroll
    // Sin controller: el botón "Déjame salir" usa onclick directo
    protected: true,      // Requiere sesión activa
  },
};

// ── FUNCIÓN PRINCIPAL DEL ROUTER ─────────────────────────────────────────────
// Se ejecuta cada vez que se carga la página (DOMContentLoaded en main.js).
// Lee la URL actual y decide qué vista y controlador renderizar.
export default function renderRoute() {

  // Obtiene el div principal del HTML donde se inyecta todo el contenido.
  // Este div existe en index.html como <div id="app"></div>
  const container = document.getElementById("app");
  
  // Lee el usuario logueado del localStorage.
  // Si no hay sesión, user será null.
  // JSON.parse convierte el string guardado de vuelta a objeto JavaScript.
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Lee la URL actual del navegador.
  // Ejemplos: "/", "/login", "/dashboard", "/profile"
  const path = window.location.pathname;

  // Busca la ruta en el mapa de rutas.
  // Si no existe (ej: "/pagina-inexistente"), devuelve "" (falsy)
  const route = routes[path] || "";

  // ── GUARD 1: Ruta no encontrada ──────────────────────────────────────────
  // Si la URL no existe en el mapa de rutas, muestra el 404 y termina.
  if (!route) {
    container.innerHTML = notFound();
    return; // Detiene la función — no continúa con los guards siguientes
  }

  // ── GUARD 2: Ruta protegida sin sesión ───────────────────────────────────
  // Si la ruta requiere sesión (protected: true) y no hay usuario logueado,
  // redirige al login para que el usuario inicie sesión.
  if (route.protected && !user) {
    window.location = "/login";
    return;
  }

  // ── GUARD 3: Dashboard solo para admins ──────────────────────────────────
  // Aunque el usuario esté logueado, si no es admin no puede ver el dashboard.
  // user?.role usa optional chaining por si user es null (aunque guard 2 lo evita)
  if (path === "/dashboard" && user?.role !== "admin") {
    window.location = "/"; // Manda al home si no es admin
    return;
  }

  // ── GUARD 4: Login con sesión activa ─────────────────────────────────────
  // Si el usuario ya está logueado e intenta ir al login,
  // lo redirige al home para evitar que vea el formulario innecesariamente.
  if (path === "/login" && user) {
    window.location = "/";
    return;
  }

  // ── RENDERIZADO ──────────────────────────────────────────────────────────
  // Si pasó todos los guards, renderiza la vista:
  
  // 1. Inyecta el HTML de la vista en el div #app
  //    route.view() llama a la función (ej: homeView()) y obtiene el HTML
  container.innerHTML = route.view();
  
  // 2. Ejecuta el controlador si existe.
  //    route?.controller?.() usa optional chaining:
  //    - route?.controller verifica que controller exista
  //    - ?.() lo ejecuta solo si es una función
  //    Si no hay controller (como en /important), no hace nada
  route?.controller?.();
}