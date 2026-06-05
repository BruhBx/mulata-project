// ─── VISTA 404 ───────────────────────────────────────────────────────────────
// Se muestra cuando el usuario entra a una URL que no existe en el router.
// Por ejemplo: localhost:5173/pagina-que-no-existe
// El router la llama en routes.js cuando no encuentra la ruta en el objeto routes.

export default function notFound() {
    return `
        <div class="container mt-5">
            <!-- Alerta roja centrada con el mensaje de error -->
            <div class="alert alert-danger text-center" role="alert">
                <h1>Error 404</h1>
                <p>Page not found</p>
            </div>
        </div>
    `;
}