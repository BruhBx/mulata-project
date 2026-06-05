// ─── VISTA DEL BLOC DE NOTAS ─────────────────────────────────────────────────
// Pantalla de notas personales del usuario.
// Tiene dos secciones:
//   1. Formulario para crear/editar notas
//   2. Lista de notas — vacía al inicio, project.controller.js la llena dinámicamente
// Esta vista NO tiene lógica — solo estructura HTML.

export default function projectView() {
    return `
        <div class="container mt-4">
        
            <!-- Encabezado con título y botón volver -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>📝 Mis Notas</h2>
                
                <!-- 
                    Botón volver con id="backBtn"
                    project.controller.js escucha el clic y redirige a "/"
                -->
                <button class="btn btn-secondary" id="backBtn">Volver</button>
            </div>

            <!-- ── FORMULARIO DE CREACIÓN/EDICIÓN ── -->
            <div class="card p-3 mb-4 shadow-sm">
            
                <!-- 
                    Campo título con id="noteTitle"
                    project.controller.js lee su valor al guardar
                    Al editar una nota, el controlador lo rellena con el título existente
                -->
                <input 
                    type="text" 
                    id="noteTitle" 
                    class="form-control mb-2" 
                    placeholder="Título de la nota"
                >
                
                <!-- 
                    Campo contenido con id="noteContent"
                    Área de texto para el cuerpo de la nota
                    Al editar, el controlador lo rellena con el contenido existente
                -->
                <textarea 
                    id="noteContent" 
                    class="form-control mb-2" 
                    rows="4" 
                    placeholder="Escribe tu nota aquí..."
                ></textarea>
                
                <!-- 
                    Botón guardar con id="saveNoteBtn"
                    project.controller.js escucha el clic y crea la nota con POST
                    Al editar, el controlador cambia su texto a "Actualizar nota"
                    y reemplaza el evento para hacer PATCH en vez de POST
                -->
                <button class="btn btn-success" id="saveNoteBtn">Guardar nota</button>
            </div>

            <!-- 
                ── LISTA DE NOTAS ──
                Este div está vacío al cargar la página.
                project.controller.js lo llena con tarjetas por cada nota del usuario.
                Si no hay notas, muestra "No tienes notas todavía."
            -->
            <div id="notesList"></div>
        </div>
    `;
}