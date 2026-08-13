// dashboard.js - Lógica y Seguridad del Panel Principal

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Verificamos si hay un usuario logueado en la memoria temporal (sessionStorage)
    const correoUsuario = sessionStorage.getItem('usuarioLogueado');
    const rolUsuario = sessionStorage.getItem('rolUsuario');

    // 2. SEGURIDAD: Si intentan entrar a index.html sin iniciar sesión, los expulsamos al login
    if (!correoUsuario || !rolUsuario) {
        window.location.href = 'login.html';
        return; // Detenemos la ejecución del código
    }

    // 3. PERSONALIZACIÓN: Cambiamos el mensaje de bienvenida
    const mensajeBienvenida = document.getElementById('mensaje-bienvenida');
    
    // Extraemos la parte antes del "@" para usarlo como nombre (ej: "admin" de "admin@colegio.edu")
    const nombreCorto = correoUsuario.split('@')[0]; 
    
    // Ponemos la primera letra en mayúscula para que se vea más bonito
    const nombreFormateado = nombreCorto.charAt(0).toUpperCase() + nombreCorto.slice(1);
    
    // Insertamos el mensaje en el HTML
    mensajeBienvenida.textContent = `Bienvenido/a, ${nombreFormateado}`;

    // 4. CONTROL DE ACCESOS (Roles)
    // Buscamos los elementos de "Gestión" que están ocultos por defecto en tu HTML
    const menuGestion = document.getElementById('menu-gestion');
    const tarjetaGestion = document.getElementById('tarjeta-gestion');
    
    // Si el usuario es de administración, hacemos visibles las opciones
    if (rolUsuario === 'administracion') {
        menuGestion.style.display = 'block';
        tarjetaGestion.style.display = 'block';
    }

    // 5. CERRAR SESIÓN
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    btnCerrarSesion.addEventListener('click', (evento) => {
        evento.preventDefault(); // Evitamos que el enlace intente ir a un "#"
        
        // Confirmación opcional
        if(confirm("¿Estás seguro que deseas cerrar sesión?")) {
            // Borramos los datos de la sesión
            sessionStorage.clear();
            // Redirigimos a la pantalla de login
            window.location.href = 'login.html';
        }
    });
});