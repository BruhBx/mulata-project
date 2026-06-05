// ─── VISTA TROLL ─────────────────────────────────────────────────────────────
// Vista de broma que se muestra al entrar a "/important".
// Ocupa toda la pantalla con fondo negro y reproduce automáticamente
// un video de rickroll en YouTube.
// El botón "Déjame salir" redirige de vuelta al home.
// No tiene controlador — el botón usa onclick directo.

export default function importantView() {
    return `
        <!-- 
            Overlay que cubre toda la pantalla (position:fixed, 100% width y height)
            z-index:9999 para que quede encima de todo
        -->
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:#000; z-index:9999; display:flex; flex-direction:column; justify-content:center; align-items:center;">
        
            <!-- Título de advertencia falsa para engañar al usuario -->
            <h2 style="color:red; font-size:2rem; margin-bottom:20px;">⚠️ MENSAJE IMPORTANTE ⚠️</h2>
            
            <!-- 
                iframe de YouTube con autoplay=1 para que empiece solo
                El video es el rickroll clásico
            -->
            <iframe 
                width="900" 
                height="500" 
                src="https://www.youtube.com/embed/f_WuRfuMXQw?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            
            <!-- Botón de escape que redirige al home -->
            <button onclick="window.location='/'" class="btn btn-danger mt-4" style="font-size:1.2rem;">
                😭 Déjame salir
            </button>
        </div>
    `;
}