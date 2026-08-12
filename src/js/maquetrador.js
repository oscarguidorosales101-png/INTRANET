// script.js - Lógica del Front-end con validación de contraseñas

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    // 1. Creamos nuestra "Base de Datos" simulada para los 3 roles
    const usuariosPermitidos = {
        'estudiante': {
            correo: 'alumno@colegio.edu',
            contrasena: 'alumno123'
        },
        'docente': {
            correo: 'profe@colegio.edu',
            contrasena: 'profe2026'
        },
        'administracion': {
            correo: 'admin@colegio.edu',
            contrasena: 'admin1234'
        }
    };

    if (formLogin) {
        formLogin.addEventListener('submit', function(evento) {
            // Evitamos que la página se recargue
            evento.preventDefault();

            // Obtenemos los valores que ingresó el usuario
            const rol = document.getElementById('rol').value;
            const usuario = document.getElementById('usuario').value;
            const password = document.getElementById('password').value;

            // Validación 1: Confirmar que eligió un rol
            if (rol === "") {
                alert("Por favor, selecciona un Tipo de Usuario.");
                return; 
            }

            // 2. Buscamos los datos correctos según el rol que eligió
            const datosCorrectos = usuariosPermitidos[rol];

            // 3. Comparamos lo que escribió con nuestra "Base de Datos"
            if (datosCorrectos.correo === usuario && datosCorrectos.contrasena === password) {
                
                // Si todo está bien, guardamos los datos en la memoria
                sessionStorage.setItem('usuarioLogueado', usuario);
                sessionStorage.setItem('rolUsuario', rol);
                
                // Y lo enviamos al panel principal
                window.location.href = 'maquetador.html';

            } else {
                // Si se equivocó en el correo o la contraseña, mostramos un error
                alert("Error: El correo o la contraseña son incorrectos para el rol seleccionado.");
            }
        });
    }
});