// ─── CONTROLADOR DEL DASHBOARD ───────────────────────────────────────────────
// Solo accesible para administradores (el router verifica el rol).
// Se ejecuta justo después de que dashboardView.js inyecta el HTML.
// Responsabilidades:
//   1. Activar los botones de logout, volver y crear usuario
//   2. Cargar y mostrar todos los usuarios en la tabla
//   3. Manejar editar, eliminar y crear usuarios (CRUD completo)

// Importa logout para usarlo en el botón "Cerrar sesión"
import { logout } from "./logout.controller";

// URL base del servidor para el recurso "users".
// Se usa en todos los fetch de este archivo.
const API = "http://localhost:3000/users";

export async function dashboard() {
    // Conecta el botón "Cerrar sesión" con la función logout().
    // Al hacer clic, borra la sesión y redirige al login.
    document.getElementById("logoutBtn").addEventListener("click", logout);
    
    // Conecta el botón "Volver" para regresar al home.
    document.getElementById("backBtn").addEventListener("click", () => {
        window.location = "/"; // Redirige al home
    });
    
    // Conecta el botón "+ Nuevo usuario" con el formulario de creación.
    // showCreateForm() abre prompts para ingresar los datos del nuevo usuario.
    document.getElementById("createBtn").addEventListener("click", showCreateForm);

    // Carga y muestra los usuarios al entrar al dashboard.
    // Es lo último porque es async y necesita esperar la respuesta del servidor.
    await loadUsers();
}

// ─── CARGAR USUARIOS ─────────────────────────────────────────────────────────
// Hace GET al servidor para traer todos los usuarios
// y los pasa a renderTable() para mostrarlos en la tabla.
async function loadUsers() {
    // GET a http://localhost:3000/users — trae el array completo de usuarios
    const res = await fetch(API);
    
    // Convierte la respuesta JSON a un array de objetos JavaScript
    const users = await res.json();
    
    // Pasa el array a renderTable() para generar las filas HTML
    renderTable(users);
}

// ─── RENDERIZAR TABLA ────────────────────────────────────────────────────────
// Recibe el array de usuarios y genera una fila <tr> por cada uno.
// Inyecta el HTML resultante en el <tbody id="usersTable"> de la vista.
function renderTable(users) {
    // Busca el tbody vacío que dejó dashboardView.js
    const tbody = document.getElementById("usersTable");
    
    // Convierte cada usuario en una fila HTML con .map()
    // y une todas las filas en un string con .join("")
    tbody.innerHTML = users.map(user => `
        <tr>
            <!-- Celda con el ID del usuario -->
            <td>${user.id}</td>
            
            <!-- Celda con el nombre del usuario -->
            <td>${user.name}</td>
            
            <!-- Celda con el email/username -->
            <td>${user.username}</td>
            
            <!-- 
                Celda con el rol como badge de color:
                - admin → badge azul (bg-primary)
                - user → badge gris (bg-secondary)
            -->
            <td>
                <span class="badge ${user.role === 'admin' ? 'bg-primary' : 'bg-secondary'}">
                    ${user.role}
                </span>
            </td>
            
            <!-- 
                Celda de acciones con dos botones:
                - Editar: llama a editUser() con el ID del usuario
                - Eliminar: llama a deleteUser() con el ID del usuario
                Usan onclick porque están dentro de un string HTML,
                por eso las funciones deben estar en window (globales)
            -->
            <td class="text-center">
                <button class="btn btn-sm btn-warning me-1" onclick="editUser('${user.id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

// ─── ELIMINAR USUARIO ────────────────────────────────────────────────────────
// Elimina un usuario del servidor por su ID y recarga la tabla.
// Está en window porque se llama desde onclick en el HTML dinámico.
window.deleteUser = async function(id) {
    // Pide confirmación antes de eliminar para evitar borrados accidentales
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    
    // DELETE a http://localhost:3000/users/{id} — elimina el usuario del db.json
    await fetch(`${API}/${id}`, { method: "DELETE" });
    
    // Recarga la tabla para reflejar el cambio visualmente
    await loadUsers();
}

// ─── EDITAR USUARIO ──────────────────────────────────────────────────────────
// Trae los datos actuales del usuario, los muestra en prompts para editarlos
// y guarda los cambios en el servidor.
// Está en window porque se llama desde onclick en el HTML dinámico.
window.editUser = async function(id) {
    // GET a http://localhost:3000/users/{id} — trae los datos actuales del usuario
    const res = await fetch(`${API}/${id}`);
    
    // Convierte la respuesta a objeto JavaScript
    const user = await res.json();

    // Muestra prompts pre-rellenados con los valores actuales
    // para que el admin pueda editarlos fácilmente
    const name = prompt("Nombre:", user.name);
    const username = prompt("Username:", user.username);
    const role = prompt("Rol (admin/user):", user.role);

    // Si el admin canceló algún prompt, no hace nada
    if (!name || !username || !role) return;

    // PATCH a http://localhost:3000/users/{id} — actualiza solo los campos enviados
    // A diferencia de PUT que reemplaza todo, PATCH solo modifica lo que se manda
    await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }, // Indica que el body es JSON
        body: JSON.stringify({ name, username, role })    // Convierte el objeto a string JSON
    });

    // Recarga la tabla para mostrar los datos actualizados
    await loadUsers();
}

// ─── CREAR USUARIO ───────────────────────────────────────────────────────────
// Muestra prompts para ingresar los datos del nuevo usuario
// y lo crea en el servidor.
// Es privada — solo la llama el botón "createBtn" dentro de dashboard()
async function showCreateForm() {
    // Prompts vacíos para ingresar los datos del nuevo usuario
    const name = prompt("Nombre:");
    const username = prompt("Username (email):");
    const password = prompt("Contraseña:");
    const role = prompt("Rol (admin/user):");

    // Si el admin canceló algún prompt, no hace nada
    if (!name || !username || !password || !role) return;

    // POST a http://localhost:3000/users — crea un nuevo usuario en db.json
    // json-server genera automáticamente un ID único para el nuevo usuario
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, role })
    });

    // Recarga la tabla para mostrar el nuevo usuario
    await loadUsers();
}