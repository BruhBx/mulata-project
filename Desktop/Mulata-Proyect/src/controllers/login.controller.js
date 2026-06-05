// ─── CONTROLADOR DE LOGIN ────────────────────────────────────────────────────
// Maneja el formulario de inicio de sesión.
// Se ejecuta justo después de que loginView.js inyecta el HTML en el DOM.
// Su responsabilidad es:
//   1. Escuchar el submit del formulario
//   2. Validar que los campos no estén vacíos
//   3. Buscar el usuario en el servidor
//   4. Guardar la sesión en localStorage si las credenciales son correctas

export function login() {
    // Busca el formulario con id="loginForm" en el DOM.
    // Este formulario existe porque loginView.js ya lo inyectó.
    const form = document.getElementById("loginForm");

    // Escucha el evento "submit" del formulario.
    // Se dispara cuando el usuario hace clic en el botón "Login"
    // o presiona Enter dentro del formulario.
    form.addEventListener("submit", async (event) => {
    
        // Evita que el formulario recargue la página al hacer submit.
        // Sin esto, la página se refrescaría y perdería el estado.
        event.preventDefault();

        // Lee el valor del campo username y elimina espacios al inicio y al final.
        // trim() evita que " admin " sea diferente a "admin".
        const username = document.getElementById("username").value.trim();
        
        // Lee el valor del campo password y elimina espacios.
        const password = document.getElementById("password").value.trim();

        // Valida que ambos campos tengan valor.
        // Si alguno está vacío, muestra alerta y detiene la ejecución.
        if (!username || !password) {
            alert("Username and password are required");
            return; // Detiene la función aquí, no continúa
        }

        // Llama a validateLogin() para buscar el usuario en el servidor.
        // Es async porque hace una petición fetch que tarda un tiempo.
        const user = await validateLogin(username, password);
        
        // Muestra en consola el resultado para debug.
        // Si encontró el usuario, muestra el objeto. Si no, muestra [].
        console.log(user);

        // Si el array está vacío, significa que no encontró ningún usuario
        // con esas credenciales. Muestra alerta y detiene la ejecución.
        if (!user.length) {
            alert("Incorrect username or password");
            return; // Detiene la función aquí, no continúa
        }

        // Guarda el primer usuario encontrado en localStorage como string JSON.
        // Esto es lo que el router lee para saber si hay sesión activa.
        // user[0] porque filter() devuelve un array, tomamos el primer elemento.
        localStorage.setItem("user", JSON.stringify(user[0]));
        
        // Redirige al home. El router detecta la sesión en localStorage
        // y muestra la vista del home.
        window.location = "/";
    });
}

// ─── FUNCIÓN DE VALIDACIÓN ───────────────────────────────────────────────────
// Trae TODOS los usuarios del servidor y filtra el que coincida
// con el username Y password ingresados.
// Retorna un array: con el usuario si lo encontró, vacío si no.
// Es privada — solo la usa login() arriba, por eso no tiene export.
async function validateLogin(username, password) {
    // Hace GET a http://localhost:3000/users para traer todos los usuarios.
    // json-server responde con el array completo de users del db.json.
    const request = await fetch(`http://localhost:3000/users`);
    
    // Convierte la respuesta de texto JSON a un array de objetos JavaScript.
    const users = await request.json();
    
    // Filtra el array buscando el usuario que tenga exactamente
    // el mismo username Y la misma password que se ingresaron.
    // === significa comparación estricta (mismo valor Y mismo tipo).
    const user = users.filter(
        u => u.username === username && u.password === password
    );
    
    // Retorna el array resultado:
    // Si encontró el usuario → [{id, username, password, name, role}]
    // Si no encontró nada → []
    return user;
}