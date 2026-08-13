/* Datos simulados compartidos por las vistas administrativas. */
(function () {
  const nombres = ["Sofía", "Mateo", "Valentina", "Daniel", "Camila", "Sebastián", "Lucía", "Andrés", "Mariana", "Gabriel", "Elena", "Nicolás", "Paula", "Diego", "Isabela", "Samuel", "Andrea", "Carlos", "Natalia", "Javier"];
  const apellidos = ["Rodríguez", "Gómez", "Vargas", "Martínez", "Fernández", "Castro", "Ramírez", "Morales", "Herrera", "Jiménez", "Sánchez", "Rojas"];
  const grupos = ["10-1", "10-2", "11-1", "11-2", "12-1", "12-2"];
  const cursos = [
    ["MAT", "Matemáticas", "Ciencias exactas"], ["ESP", "Comunicación y Español", "Humanidades"],
    ["CIEN", "Ciencias", "Ciencias naturales"], ["HIS", "Historia", "Ciencias sociales"],
    ["ING", "Inglés", "Idiomas"], ["PROG", "Programación", "Tecnología"],
    ["WEB", "Desarrollo web", "Tecnología"], ["BD", "Bases de datos", "Tecnología"],
    ["RED", "Redes de computadoras", "Tecnología"], ["SO", "Sistemas operativos", "Tecnología"],
    ["SEG", "Seguridad informática", "Tecnología"], ["IA", "Inteligencia artificial", "Tecnología"],
    ["ADM", "Administración", "Gestión"], ["DIS", "Diseño digital", "Arte y diseño"],
    ["COM", "Comunicación oral", "Humanidades"], ["FIS", "Educación física", "Bienestar"],
    ["FIL", "Filosofía", "Humanidades"], ["ECO", "Economía", "Ciencias sociales"]
  ].map(([codigo, nombre, area], indice) => ({ codigo, nombre, area, docente: ["Ana Vargas", "Luis Rojas", "María Castro", "Daniel Solano", "Elena Mora", "Carlos Jiménez"][indice % 6], grupo: grupos[indice % grupos.length], cupo: 25 + (indice % 4) * 5 }));

  const estudiantes = Array.from({ length: 120 }, (_, indice) => {
    const numero = indice + 1;
    const promedio = numero <= 72 ? 70 + (numero * 7) % 31 : numero <= 96 ? 60 + (numero * 3) % 10 : 42 + (numero * 5) % 18;
    const estado = promedio >= 70 ? "pasando" : promedio >= 60 ? "aplazado" : "reprobado";
    const nombre = `${nombres[indice % nombres.length]} ${apellidos[(indice * 3) % apellidos.length]} ${apellidos[(indice * 5 + 2) % apellidos.length]}`;
    return { id: `EST-${String(numero).padStart(3, "0")}`, nombre, correo: `estudiante${numero}@colegio.edu`, grupo: grupos[indice % grupos.length], promedio, estado, asistencia: 82 + (indice * 3) % 19 };
  });

  const eventos = [
    ["2026-08-18", "Inicio de evaluaciones del II periodo", "Académico"], ["2026-08-20", "Reunión de docentes", "Institucional"],
    ["2026-08-22", "Feria de ciencia y tecnología", "Evento"], ["2026-08-26", "Entrega de informes de avance", "Académico"],
    ["2026-08-29", "Taller de orientación vocacional", "Bienestar"], ["2026-09-03", "Consejo estudiantil", "Institucional"]
  ].map(([fecha, titulo, tipo]) => ({ fecha, titulo, tipo }));
  const notificaciones = [
    { tipo: "urgente", titulo: "Evaluaciones pendientes", mensaje: "24 estudiantes requieren seguimiento académico.", fecha: "Hoy, 8:30" },
    { tipo: "info", titulo: "Informes disponibles", mensaje: "Los reportes del II periodo ya pueden revisarse.", fecha: "Ayer, 15:10" },
    { tipo: "exito", titulo: "Asistencia actualizada", mensaje: "Se sincronizaron los registros de los seis grupos.", fecha: "12 ago., 11:45" },
    { tipo: "info", titulo: "Actividad institucional", mensaje: "La feria de ciencia se realizará el 22 de agosto.", fecha: "10 ago., 9:00" }
  ];
  window.IntranetData = { estudiantes, cursos, eventos, notificaciones };
}());
