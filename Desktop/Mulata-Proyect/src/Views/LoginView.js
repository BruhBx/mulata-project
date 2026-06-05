// ─── VISTA DEL LOGIN ─────────────────────────────────────────────────────────
// Este archivo SOLO genera el HTML del formulario de login.
// No tiene lógica — eso lo maneja login.controller.js.
// Se muestra cuando el usuario entra a la URL "/login".

export default function LoginView(){
    // Retorna el HTML como string — el router lo inyecta en el div #app
    return `
        <!-- Centra el formulario vertical y horizontalmente en la pantalla -->
        <div class="container vh-100 d-flex justify-content-center align-items-center">
        
            <!-- Tarjeta blanca con sombra que contiene el formulario -->
            <div class="card p-4 shadow" style="width: 400px;">
            
                <!-- Título del formulario -->
                <h2 class="text-center mb-4">Login</h2>

                <!-- 
                    Formulario con id="loginForm"
                    El controlador lo busca con document.getElementById("loginForm")
                    y escucha el evento "submit"
                -->
                <form id="loginForm">
                
                    <!-- Campo de usuario -->
                    <!-- El controlador lee su valor con document.getElementById("username").value -->
                    <div class="mb-3">
                        <input
                            type="text"
                            id="username"
                            class="form-control"
                            placeholder="Username"
                            required
                        >
                    </div>

                    <!-- Campo de contraseña -->
                    <!-- El controlador lee su valor con document.getElementById("password").value -->
                    <div class="mb-3">
                        <input
                            type="password"
                            id="password"
                            class="form-control"
                            placeholder="Password"
                            required
                        >
                    </div>

                    <!-- Botón que dispara el evento "submit" del formulario -->
                    <button type="submit" class="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    `;
}