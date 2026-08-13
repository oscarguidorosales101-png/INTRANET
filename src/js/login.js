// script.js - Autenticación completa usando localStorage

document.addEventListener('DOMContentLoaded', () => {
    // 1. Guardamos los usuarios registrados en localStorage si es la primera vez que se abre la app
    const usuariosPorDefecto = [
        { correo: 'alumno@colegio.edu', pass: 'alumno123', rol: 'estudiante' },
        { correo: 'profe@colegio.edu', pass: 'profe2026', rol: 'docente' },
        { correo: 'admin@colegio.edu', pass: 'admin1234', rol: 'administracion' }
    ];

    if (!localStorage.getItem('usuariosDB')) {
        localStorage.setItem('usuariosDB', JSON.stringify(usuariosPorDefecto));
    }

    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();

            // Obtenemos lo que escribió el usuario
            const usuarioIngresado = document.getElementById('usuario').value.trim();
            const passwordIngresado = document.getElementById('password').value.trim();

            // 2. Leemos la "Base de Datos" guardada en localStorage
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosDB')) || [];

            // 3. Buscamos si existe coincidencia exacta
            const usuarioValido = usuariosRegistrados.find(u => 
                u.correo === usuarioIngresado && 
                u.pass === passwordIngresado 
            );

            if (usuarioValido) {
                // 4. Guardamos la SESIÓN ACTIVA en localStorage
                sessionStorage.setItem('usuarioLogueado', usuarioValido.correo);
                sessionStorage.setItem('rolUsuario', usuarioValido.rol);
                localStorage.removeItem('usuarioLogueado');
                localStorage.removeItem('rolUsuario');

                if (usuarioValido.rol === 'estudiante' || usuarioValido.rol === 'docente') {
                    window.location.replace('academico.html');
                } else {
                    window.location.replace('administrador.html');
                }
            } else {
                alert("Error: Correo, contraseña o rol incorrectos.");
            }
        });
    }
});
