// ─── CONTROLADOR DEL PERFIL ──────────────────────────────────────────────────
// Permite al usuario editar ÚNICAMENTE sus propios datos.
// La seguridad viene de usar siempre el ID del usuario en localStorage —
// nunca recibe un ID externo, así es imposible editar a otro usuario.

// URL base del servidor para el recurso "users"
const API = "http://localhost:3000/users";

export function profile() {
    // Lee el usuario logueado del localStorage.
    // Contiene su ID que se usará para el fetch PATCH.
    const user = JSON.parse(localStorage.getItem("user"));

    // Conecta el botón "Volver" para regresar al home sin guardar cambios.
    document.getElementById("backBtn").addEventListener("click", () => {
        window.location = "/";
    });

    // Escucha el clic en el botón "Guardar cambios"
    document.getElementById("saveBtn").addEventListener("click", async () => {
    
        // Lee los valores actuales de los campos del formulario
        const name = document.getElementById("profileName").value.trim();
        const username = document.getElementById("profileUsername").value.trim();
        
        // La contraseña es opcional — si está vacía, no se cambia
        const password = document.getElementById("profilePassword").value.trim();

        // Valida que nombre y username tengan valor
        // La contraseña puede estar vacía (no es obligatorio cambiarla)
        if (!name || !username) {
            alert("Nombre y username son requeridos");
            return;
        }

        // Crea el objeto con los datos a actualizar.
        // Siempre incluye name y username.
        const updatedData = { name, username };
        
        // Solo agrega password al objeto si el usuario escribió algo.
        // Si está vacío, no se incluye y el servidor mantiene la contraseña actual.
        if (password) updatedData.password = password;

        // PATCH a http://localhost:3000/users/{user.id}
        // Usa el ID del usuario logueado — NUNCA un ID externo.
        // Esto garantiza que solo puede editar su propio perfil.
        const res = await fetch(`${API}/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        // Convierte la respuesta del servidor al objeto usuario actualizado
        const updatedUser = await res.json();

        // Actualiza el localStorage con los nuevos datos.
        // Sin esto, el homeView seguiría mostrando el nombre/datos viejos.
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Perfil actualizado correctamente");
        
        // Redirige al home donde ya se verán los datos actualizados
        window.location = "/";
    });
}