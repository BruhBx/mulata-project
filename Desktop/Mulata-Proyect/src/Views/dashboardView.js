// ─── VISTA DEL DASHBOARD ─────────────────────────────────────────────────────
// Solo accesible para administradores.
// Muestra una tabla vacía que dashboard.controller.js llena dinámicamente
// con los usuarios traídos del servidor.
// Esta vista NO tiene lógica — solo estructura HTML.

export default function dashboardView() {
    return `
        <!-- Contenedor principal -->
        <div class="container mt-4">
        
            <!-- Encabezado con título y botones alineados -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="mb-0">Dashboard - Usuarios</h2>
                
                <!-- Grupo de botones en la esquina derecha -->
                <div class="d-flex gap-2">
                    <!-- 
                        Botón volver con id="backBtn"
                        dashboard.controller.js escucha el clic y redirige a "/"
                    -->
                    <button class="btn btn-secondary" id="backBtn">Volver</button>
                    
                    <!-- 
                        Botón logout con id="logoutBtn"
                        dashboard.controller.js escucha el clic y llama a logout()
                    -->
                    <button class="btn btn-danger" id="logoutBtn">Cerrar sesión</button>
                </div>
            </div>

            <!-- 
                Botón para crear usuario con id="createBtn"
                dashboard.controller.js escucha el clic y abre los prompts de creación
            -->
            <div class="mb-3">
                <button class="btn btn-success" id="createBtn">+ Nuevo usuario</button>
            </div>

            <!-- 
                Tabla de usuarios
                El <thead> tiene las columnas fijas
                El <tbody id="usersTable"> está vacío — 
                dashboard.controller.js lo llena con filas dinámicas
            -->
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Username</th>
                        <th>Rol</th>
                        <th class="text-center">Acciones</th>
                    </tr>
                </thead>
                <!-- Este tbody se llena dinámicamente con renderTable() -->
                <tbody id="usersTable"></tbody>
            </table>
        </div>
    `;
}