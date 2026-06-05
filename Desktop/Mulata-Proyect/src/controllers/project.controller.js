// ─── CONTROLADOR DE NOTAS ────────────────────────────────────────────────────
// Bloc de notas personal. Cada usuario solo ve sus propias notas.
// La privacidad se logra guardando el userId en cada nota
// y filtrando por ese userId al cargar.
// Responsabilidades:
//   1. Crear notas nuevas
//   2. Mostrar solo las notas del usuario logueado
//   3. Editar notas existentes
//   4. Eliminar notas

// URL base del servidor para el recurso "notes"
const API = "http://localhost:3000/notes";

export async function project() {
    // Lee el usuario logueado — se necesita su ID para ligar las notas
    const user = JSON.parse(localStorage.getItem("user"));

    // Conecta el botón "Volver" para regresar al home
    document.getElementById("backBtn").addEventListener("click", () => {
        window.location = "/";
    });

    // Escucha el clic en "Guardar nota" para crear una nota nueva
    document.getElementById("saveNoteBtn").addEventListener("click", async () => {
    
        // Lee el título del campo con id="noteTitle"
        const title = document.getElementById("noteTitle").value.trim();
        
        // Lee el contenido del textarea con id="noteContent"
        const content = document.getElementById("noteContent").value.trim();

        // Valida que ambos campos tengan valor antes de guardar
        if (!title || !content) {
            alert("El título y el contenido son requeridos");
            return;
        }

        // POST a http://localhost:3000/notes — crea una nota nueva en db.json
        // json-server genera automáticamente un ID único para la nota
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,           // Título de la nota
                content,         // Contenido de la nota
                userId: user.id, // ID del usuario — liga la nota a su dueño
                date: new Date().toLocaleDateString() // Fecha actual formateada
            })
        });

        // Muestra el código de respuesta en consola para debug
        // 201 = Created (nota creada exitosamente)
        console.log("Respuesta:", res.status);

        // Limpia el formulario después de guardar exitosamente
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteContent").value = "";

        // Recarga la lista de notas para mostrar la nueva nota
        await loadNotes(user.id);
    });

    // Carga las notas del usuario al entrar a la página
    await loadNotes(user.id);
}

// ─── CARGAR NOTAS ────────────────────────────────────────────────────────────
// Trae TODAS las notas del servidor y filtra solo las del usuario logueado.
// Se filtra en el frontend porque json-server no soporta bien
// el filtro por query params con IDs como los que genera automáticamente.
async function loadNotes(userId) {
    // GET a http://localhost:3000/notes — trae todas las notas de todos los usuarios
    const res = await fetch(API);
    
    // Convierte la respuesta JSON a array de objetos JavaScript
    const allNotes = await res.json();
    
    // Filtra solo las notas donde el userId coincide con el del usuario logueado.
    // === compara estrictamente — "1" === "1" es true, "1" === 1 es false
    const notes = allNotes.filter(note => note.userId === userId);
    
    // Pasa las notas filtradas a renderNotes() para mostrarlas
    renderNotes(notes);
}

// ─── RENDERIZAR NOTAS ────────────────────────────────────────────────────────
// Convierte el array de notas en tarjetas HTML y las inyecta en el DOM.
function renderNotes(notes) {
    // Busca el div vacío con id="notesList" que dejó projectView.js
    const container = document.getElementById("notesList");

    // Si no hay notas, muestra un mensaje informativo y detiene la función
    if (!notes.length) {
        container.innerHTML = `<p class="text-muted">No tienes notas todavía.</p>`;
        return;
    }

    // Convierte cada nota en una tarjeta Bootstrap con .map()
    // y une todas las tarjetas en un string con .join("")
    container.innerHTML = notes.map(note => `
        <!-- Tarjeta con sombra suave por cada nota -->
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <!-- Contenido de la nota -->
                    <div>
                        <!-- Título de la nota -->
                        <h5 class="card-title">${note.title}</h5>
                        
                        <!-- Contenido/cuerpo de la nota -->
                        <p class="card-text">${note.content}</p>
                        
                        <!-- Fecha en que se creó la nota -->
                        <small class="text-muted">${note.date}</small>
                    </div>
                    
                    <!-- Botones de acción -->
                    <div class="d-flex gap-2">
                        <!-- 
                            Botón editar — llama a editNote() con el ID de la nota.
                            Está en window porque está dentro de un string HTML.
                        -->
                        <button class="btn btn-sm btn-warning" onclick="editNote('${note.id}')">Editar</button>
                        
                        <!-- 
                            Botón eliminar — llama a deleteNote() con el ID de la nota.
                            Está en window porque está dentro de un string HTML.
                        -->
                        <button class="btn btn-sm btn-danger" onclick="deleteNote('${note.id}')">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

// ─── ELIMINAR NOTA ───────────────────────────────────────────────────────────
// Elimina una nota del servidor por su ID y recarga la lista.
// Está en window porque se llama desde onclick en el HTML dinámico.
window.deleteNote = async function(id) {
    // Pide confirmación antes de eliminar para evitar borrados accidentales
    if (!confirm("¿Eliminar esta nota?")) return;
    
    // DELETE a http://localhost:3000/notes/{id} — elimina la nota del db.json
    await fetch(`${API}/${id}`, { method: "DELETE" });
    
    // Lee el usuario logueado para recargar solo sus notas
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Recarga la lista para reflejar la eliminación visualmente
    await loadNotes(user.id);
}

// ─── EDITAR NOTA ─────────────────────────────────────────────────────────────
// Rellena el formulario con los datos actuales de la nota
// y cambia el botón "Guardar" por "Actualizar" para hacer PATCH.
// Está en window porque se llama desde onclick en el HTML dinámico.
window.editNote = async function(id) {
    // Lee el usuario logueado para recargar sus notas después de editar
    const user = JSON.parse(localStorage.getItem("user"));
    
    // GET a http://localhost:3000/notes/{id} — trae los datos actuales de la nota
    const res = await fetch(`${API}/${id}`);
    
    // Convierte la respuesta a objeto JavaScript
    const note = await res.json();

    // Pre-rellena el formulario con los datos actuales de la nota
    // para que el usuario vea lo que tiene y pueda modificarlo
    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteContent").value = note.content;

    // Clona el botón "Guardar nota" para eliminar el evento anterior.
    // Sin esto, al guardar se dispararían dos eventos: el de crear y el de editar.
    const saveBtn = document.getElementById("saveNoteBtn");
    const newBtn = saveBtn.cloneNode(true); // Copia el botón sin sus eventos
    saveBtn.parentNode.replaceChild(newBtn, saveBtn); // Reemplaza el botón original
    
    // Cambia el texto del botón para indicar que ahora actualiza en vez de crear
    newBtn.textContent = "Actualizar nota";

    // Agrega el nuevo evento al botón clonado.
    // Este evento hace PATCH en vez de POST para actualizar la nota existente.
    newBtn.addEventListener("click", async () => {
        // Lee los valores actualizados del formulario
        const title = document.getElementById("noteTitle").value.trim();
        const content = document.getElementById("noteContent").value.trim();

        // Si algún campo está vacío, no hace nada
        if (!title || !content) return;

        // PATCH a http://localhost:3000/notes/{id} — actualiza solo title y content
        // No toca userId ni date — esos no cambian al editar
        await fetch(`${API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content })
        });

        // Limpia el formulario después de actualizar
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteContent").value = "";
        
        // Restaura el texto original del botón para poder crear notas nuevas
        newBtn.textContent = "Guardar nota";

        // Recarga la lista para mostrar la nota con los datos actualizados
        await loadNotes(user.id);
    });
}