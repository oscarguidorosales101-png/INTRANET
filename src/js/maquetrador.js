// script.js - Lógica de Seguridad y Login Estricto

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    // 🔒 LA BÓVEDA: Solo estas combinaciones exactas abrirán la puerta
    const credencialesEstrictas = {
        'estudiante': {
            correo: 'alumno@colegio.edu',
            clave: 'alumno123'
        },
        'docente': {
            correo: 'profe@colegio.edu',
            clave: 'profe2026'
        },
        'administracion': {
            correo: 'admin@colegio.edu',
            clave: 'admin1234'
        }
    };

    if (formLogin) {
        formLogin.addEventListener('submit', function(evento) {
            // 🛑 GUARDIA DE SEGURIDAD: Detiene la entrada automática
            evento.preventDefault();

            // Obtenemos lo que escribió el usuario (.trim() quita espacios accidentales)
            const rolSeleccionado = document.getElementById('rol').value;
            const inputCorreo = document.getElementById('usuario').value.trim();
            const inputClave = document.getElementById('password').value.trim();

            // Verificamos que no intente saltarse el rol
            if (rolSeleccionado === "") {
                alert("⚠️ ALERTA: Debes seleccionar un Tipo de Usuario primero.");
                return; // Corta el proceso aquí
            }

            // Extraemos la contraseña correcta de nuestra bóveda para el rol que eligió
            const datosCorrectos = credencialesEstrictas[rolSeleccionado];

            // 🕵️‍♂️ VERIFICACIÓN ESTRICTA: Comparamos si es EXACTAMENTE igual (===)
            if (inputCorreo === datosCorrectos.correo && inputClave === datosCorrectos.clave) {
                
                // ✅ ACCESO CONCEDIDO
                // Guardamos los datos de forma segura en la sesión actual
                sessionStorage.setItem('usuarioLogueado', inputCorreo);
                sessionStorage.setItem('rolUsuario', rolSeleccionado);
                
                // Abrimos la puerta hacia el panel principal
                window.location.href = 'index.html';

            } else {
                
                // ❌ ACCESO DENEGADO
                alert("❌ ACCESO DENEGADO: Credenciales incorrectas para el perfil de " + rolSeleccionado.toUpperCase());
                
                // Borramos lo que escribió en la contraseña para que intente de nuevo
                document.getElementById('password').value = '';
                
                // Opcional: Hacemos que la cajita de la contraseña se ponga roja por un segundo
                document.getElementById('password').style.borderColor = "red";
                setTimeout(() => {
                    document.getElementById('password').style.borderColor = "#cccccc";
                }, 2000);
            }
        });
    }
});