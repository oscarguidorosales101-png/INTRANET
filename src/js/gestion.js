/* Renderizado de las vistas administrativas secundarias. */
if (sessionStorage.getItem("rolUsuario") !== "administracion") window.location.replace("login.html");
const data = window.IntranetData;
const vista = document.body.dataset.vista;
const contenido = document.getElementById("contenido-dinamico");
const etiqueta = { pasando:"Aprobado", aplazado:"Aplazado", reprobado:"Reprobado" };
if (vista === "cursos") {
  contenido.innerHTML = `<section class="grid">${data.cursos.map(curso => `<article class="card course-card"><span class="badge info">${curso.area}</span><h2>${curso.nombre}</h2><p>${curso.codigo} · Grupo ${curso.grupo}</p><footer>Docente: <strong>${curso.docente}</strong><br>Cupo: ${curso.cupo} estudiantes</footer></article>`).join("")}</section>`;
} else if (vista === "calificaciones") {
  contenido.innerHTML = `<section class="card"><table class="data-table"><thead><tr><th>Estudiante</th><th>Código</th><th>Grupo</th><th>Promedio</th><th>Estado</th><th>Asistencia</th></tr></thead><tbody>${data.estudiantes.map(estudiante => `<tr><td>${estudiante.nombre}</td><td>${estudiante.id}</td><td>${estudiante.grupo}</td><td>${estudiante.promedio}%</td><td><span class="badge ${estudiante.estado}">${etiqueta[estudiante.estado]}</span></td><td>${estudiante.asistencia}%</td></tr>`).join("")}</tbody></table></section>`;
} else if (vista === "calendario") {
  contenido.innerHTML = `<section class="card calendar-list">${data.eventos.map(evento => `<article class="event"><div class="event-date">${evento.fecha.slice(8)}/08</div><div><h2>${evento.titulo}</h2><p>${evento.fecha} · <span class="badge info">${evento.tipo}</span></p></div></article>`).join("")}</section>`;
} else if (vista === "notificaciones") {
  contenido.innerHTML = `<section class="grid">${data.notificaciones.map(notificacion => `<article class="card notice ${notificacion.tipo}"><span class="badge ${notificacion.tipo}">${notificacion.tipo}</span><h2>${notificacion.titulo}</h2><p>${notificacion.mensaje}</p><footer>${notificacion.fecha}</footer></article>`).join("")}</section>`;
} else if (vista === "docentes") {
  const docentes = [...new Set(data.cursos.map(curso => curso.docente))];
  contenido.innerHTML = `<section class="grid">${docentes.map((docente, indice) => `<article class="card course-card"><span class="badge info">Docente</span><h2>${docente}</h2><p>${data.cursos.filter(curso => curso.docente === docente).map(curso => curso.nombre).join(", ")}</p><footer>Grupo asignado: ${data.cursos[indice].grupo}</footer></article>`).join("")}</section>`;
}
