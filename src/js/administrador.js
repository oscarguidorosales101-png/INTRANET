/* Panel administrativo: usa los datos simulados compartidos. */
const rolSesion = sessionStorage.getItem("rolUsuario");
const usuarioSesion = sessionStorage.getItem("usuarioLogueado");
if (!usuarioSesion || rolSesion !== "administracion") window.location.replace("login.html");

const estudiantes = window.IntranetData.estudiantes;
let filtroActual = "todos";
let estudianteSeleccionado = null;
const estadoEtiqueta = { pasando: "Aprobado", aplazado: "Aplazado", reprobado: "Reprobado" };

function porEstado(estado) { return estudiantes.filter(estudiante => estudiante.estado === estado).length; }
function actualizarEstadisticas() {
  document.getElementById("totalEstudiantes").textContent = estudiantes.length;
  document.getElementById("totalPasando").textContent = porEstado("pasando");
  document.getElementById("totalAplazados").textContent = porEstado("aplazado");
  document.getElementById("totalReprobados").textContent = porEstado("reprobado");
}
function mostrarEstudiantes() {
  const termino = document.getElementById("buscarEstudiante").value.toLowerCase().trim();
  const visibles = estudiantes.filter(estudiante => (filtroActual === "todos" || estudiante.estado === filtroActual) && `${estudiante.nombre} ${estudiante.correo} ${estudiante.id}`.toLowerCase().includes(termino));
  document.getElementById("listaEstudiantes").innerHTML = visibles.map(estudiante => `
    <button type="button" class="estudiante-item ${estudianteSeleccionado?.id === estudiante.id ? "seleccionado" : ""}" data-id="${estudiante.id}">
      <span class="avatar">${estudiante.nombre.split(" ").slice(0,2).map(parte => parte[0]).join("")}</span>
      <span><strong>${estudiante.nombre}</strong><small>${estudiante.id} · ${estudiante.grupo}</small></span>
      <span class="estado ${estudiante.estado}">${estudiante.promedio}%</span>
    </button>`).join("") || "<p class=\"mensaje-vacio\">No hay estudiantes que coincidan con la búsqueda.</p>";
  document.querySelectorAll(".estudiante-item").forEach(boton => boton.addEventListener("click", () => seleccionarEstudiante(boton.dataset.id)));
}
function seleccionarEstudiante(id) {
  estudianteSeleccionado = estudiantes.find(estudiante => estudiante.id === id);
  const estudiante = estudianteSeleccionado;
  document.getElementById("detalleEstudiante").innerHTML = `<div class="detalle-perfil"><div class="avatar grande">${estudiante.nombre.split(" ").slice(0,2).map(parte => parte[0]).join("")}</div><div><h2>${estudiante.nombre}</h2><p>${estudiante.id} · ${estudiante.correo}</p></div></div><div class="detalle-grid"><div><small>Grupo</small><strong>${estudiante.grupo}</strong></div><div><small>Promedio</small><strong>${estudiante.promedio}%</strong></div><div><small>Asistencia</small><strong>${estudiante.asistencia}%</strong></div><div><small>Estado</small><strong class="${estudiante.estado}">${estadoEtiqueta[estudiante.estado]}</strong></div></div><hr><h3>Seguimiento académico</h3><p>El expediente está disponible para revisión. Consulta <a href="calificaciones.html">Calificaciones</a> para ver la distribución por curso.</p>`;
  mostrarEstudiantes();
}
document.getElementById("buscarEstudiante").addEventListener("input", mostrarEstudiantes);
document.querySelectorAll(".filtro-admin").forEach(boton => boton.addEventListener("click", () => { document.querySelectorAll(".filtro-admin").forEach(item => item.classList.remove("activo")); boton.classList.add("activo"); filtroActual = boton.dataset.filtro; mostrarEstudiantes(); }));
document.getElementById("actualizarDatos").addEventListener("click", () => { actualizarEstadisticas(); mostrarEstudiantes(); });
document.getElementById("cerrarSesion").addEventListener("click", () => {
  const salir = () => { sessionStorage.clear(); window.location.replace("login.html"); };
  if (window.Swal) Swal.fire({ title:"¿Cerrar sesión?", icon:"warning", showCancelButton:true, confirmButtonText:"Sí, salir", cancelButtonText:"Cancelar" }).then(resultado => { if (resultado.isConfirmed) salir(); });
  else if (window.confirm("¿Cerrar sesión?")) salir();
});
actualizarEstadisticas();
mostrarEstudiantes();
