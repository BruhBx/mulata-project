// ─── CONTROLADOR DE LOGOUT ───────────────────────────────────────────────────
// Este archivo se encarga ÚNICAMENTE de cerrar la sesión del usuario.
// Es llamado por home.controller.js y dashboard.controller.js
// cuando el usuario hace clic en "Cerrar sesión".

export function logout() {
    // Elimina el objeto "user" guardado en localStorage durante el login.
    // Sin esto, el router seguiría creyendo que hay sesión activa
    // y no dejaría entrar al login.
    localStorage.removeItem("user");
    
    // Redirige al usuario a la página de login.
    // El router detecta que no hay usuario en localStorage
    // y permite mostrar el formulario de login.
    window.location = "/login";
}