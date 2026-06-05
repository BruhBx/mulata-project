// ─── CONTROLADOR DEL HOME ────────────────────────────────────────────────────
// Maneja los eventos de la pantalla principal (/).
// Se ejecuta justo después de que homeView.js inyecta el HTML en el DOM.
// Por ahora su única responsabilidad es activar el botón de cerrar sesión.

// Importa la función logout desde su controlador dedicado.
// Al hacer clic en el botón, se borra la sesión y se redirige al login.
import { logout } from "./logout.controller";

export function home() {
    // Busca el botón con id="logoutBtn" en el DOM.
    // Este botón existe porque homeView.js ya lo inyectó antes de llamar a home().
    const btn = document.getElementById("logoutBtn");
    
    // Escucha el evento clic en el botón de logout.
    // Cuando el usuario haga clic, se ejecuta la función logout()
    // que borra la sesión y redirige al login.
    btn.addEventListener("click", logout);
}