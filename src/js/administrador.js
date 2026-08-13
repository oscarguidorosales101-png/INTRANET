/* =========================================================
   CERRAR SESIÓN CON SWEETALERT2
   ========================================================= */

const cerrarSesion = document.getElementById("cerrarSesion");

if (cerrarSesion) {
    cerrarSesion.addEventListener("click", (e) => {
        e.preventDefault(); // Evita comportamiento por defecto si es un enlace

        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tendrás que volver a ingresar tus credenciales para acceder.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Limpia la sesión si utilizas localStorage/sessionStorage
                // localStorage.removeItem("usuario"); 

                Swal.fire({
                    title: "¡Hasta pronto!",
                    text: "Cerrando sesión...",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "index.html";
                });
            }
        });
    });
}