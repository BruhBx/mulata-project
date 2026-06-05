// ─── VISTA DEL PERFIL ────────────────────────────────────────────────────────
// Formulario para que el usuario edite sus propios datos.
// Lee el usuario del localStorage para pre-rellenar los campos
// con los valores actuales — así el usuario ve lo que tiene y puede cambiarlo.
// La lógica de guardar la maneja profile.controller.js.

export default function profileView() {

    // Lee el usuario actual del localStorage para mostrar sus datos en el formulario
    const user = JSON.parse(localStorage.getItem("user"));
    
    return `
        <div class="container mt-5">
        
            <!-- Tarjeta centrada con ancho máximo de 500px -->
            <div class="card p-4 shadow mx-auto" style="max-width: 500px;">
                <h3 class="mb-4">Mi Perfil</h3>

                <!-- 
                    Campo nombre con id="profileName"
                    value="${user.name}" pre-rellena el campo con el nombre actual
                    profile.controller.js lee este valor al guardar
                -->
                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" id="profileName" class="form-control" value="${user.name}">
                </div>

                <!-- 
                    Campo username con id="profileUsername"
                    value="${user.username}" pre-rellena con el email actual
                -->
                <div class="mb-3">
                    <label class="form-label">Username (email)</label>
                    <input type="text" id="profileUsername" class="form-control" value="${user.username}">
                </div>

                <!-- 
                    Campo contraseña con id="profilePassword"
                    No tiene value — si se deja vacío, el controlador NO cambia la contraseña
                -->
                <div class="mb-3">
                    <label class="form-label">Contraseña nueva</label>
                    <input type="password" id="profilePassword" class="form-control" placeholder="Dejar vacío para no cambiar">
                </div>

                <!-- 
                    Botón guardar con id="saveBtn"
                    profile.controller.js escucha el clic y manda PATCH al servidor
                -->
                <button class="btn btn-primary w-100" id="saveBtn">Guardar cambios</button>
                
                <!-- 
                    Botón volver con id="backBtn"
                    profile.controller.js escucha el clic y redirige a "/"
                -->
                <button class="btn btn-secondary w-100 mt-2" id="backBtn">Volver</button>
            </div>
        </div>
    `;
}