// ─── VISTA DEL HOME ──────────────────────────────────────────────────────────
// Pantalla principal después de iniciar sesión.
// Lee el usuario del localStorage para personalizar el saludo
// y mostrar u ocultar el botón de Dashboard según el rol.
// La lógica del botón logout la maneja home.controller.js.

export default function homeView() {

    // Lee el usuario guardado en localStorage al momento del login
    // Contiene: id, name, username, password, role
    const user = JSON.parse(localStorage.getItem("user"));
    
    return `
        <!-- Contenedor principal con margen superior -->
        <div class="container mt-4">
        
            <!-- Saludo personalizado con el nombre del usuario logueado -->
            <h2>Bienvenido, ${user.name}</h2>
            
            <!-- Botón para ir al bloc de notas — visible para todos los usuarios -->
            <a href="/project" class="btn btn-success">📝 Mis Notas</a>
            
            <!-- Botón para editar el perfil — visible para todos los usuarios -->
            <a href="/profile" class="btn btn-secondary ms-2">Mi Perfil</a>
            
            <!-- 
                Botón para ir al dashboard — SOLO visible si el rol es "admin"
                Si el rol es "user", esta línea devuelve "" (nada)
            -->
            ${user.role === "admin" ? `<a href="/dashboard" class="btn btn-primary ms-2">Dashboard</a>` : ""}
            
            <!-- Botón troll — visible para todos -->
            <a href="/important" class="btn btn-warning ms-2">📢 Mensaje Importante</a>
            
            <!-- 
                Botón de cerrar sesión con id="logoutBtn"
                El controlador home.controller.js escucha el clic en este botón
                y llama a la función logout()
            -->
            <button id="logoutBtn" class="btn btn-danger ms-2">Cerrar sesión</button>
        </div>
    `;
}