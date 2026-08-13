/**
 * academico.js - Lógica del Módulo 03: Calificaciones y Control de Asistencia
 * Intranet Escolar
 */

// ============================================================================
// 1. DATOS SIMULADOS (MOCK DATA)
// ============================================================================
const mockData = {
  // Grupos o secciones disponibles
  grupos: [
    { id: "10-1", nombre: "Sección 10-1" },
    { id: "10-2", nombre: "Sección 10-2" }
  ],

  // Asignaturas registradas
  asignaturas: [
    { id: "MAT", nombre: "Matemáticas" },
    { id: "ESP", nombre: "Español" },
    { id: "CIEN", nombre: "Ciencias" },
    { id: "HIS", nombre: "Historia" }
  ],

  // Estudiantes inscritos por grupo
  estudiantes: [
    { id: 101, nombre: "María Rodríguez Gómez", grupo: "10-1" },
    { id: 102, nombre: "Carlos Alberto Gómez", grupo: "10-1" },
    { id: 103, nombre: "Ana Patricia Martínez", grupo: "10-1" },
    { id: 104, nombre: "Juan Fernando Pérez", grupo: "10-2" },
    { id: 105, nombre: "Sofía Lucía Vargas", grupo: "10-2" }
  ],

  // Registro de Calificaciones [grupo][asignatura][estudianteId]
  calificaciones: {
    "10-1": {
      "MAT": {
        101: { tarea1: 90, examen1: 85, cotidiano: 95 },
        102: { tarea1: 65, examen1: 60, cotidiano: 70 },
        103: { tarea1: 100, examen1: 95, cotidiano: 90 }
      },
      "ESP": {
        101: { tarea1: 88, examen1: 92, cotidiano: 90 },
        102: { tarea1: 75, examen1: 80, cotidiano: 78 },
        103: { tarea1: 95, examen1: 90, cotidiano: 92 }
      },
      "CIEN": {
        101: { tarea1: 92, examen1: 88, cotidiano: 90 },
        102: { tarea1: 70, examen1: 65, cotidiano: 72 },
        103: { tarea1: 98, examen1: 94, cotidiano: 96 }
      },
      "HIS": {
        101: { tarea1: 85, examen1: 80, cotidiano: 85 },
        102: { tarea1: 60, examen1: 55, cotidiano: 65 },
        103: { tarea1: 90, examen1: 88, cotidiano: 92 }
      }
    },
    "10-2": {
      "MAT": {
        104: { tarea1: 80, examen1: 75, cotidiano: 85 },
        105: { tarea1: 95, examen1: 90, cotidiano: 92 }
      }
    }
  },

  // Registro de Asistencia [fecha][grupo][estudianteId]
  asistencias: {
    "2026-08-12": {
      "10-1": {
        101: "presente",
        102: "ausente",
        103: "justificado"
      },
      "10-2": {
        104: "presente",
        105: "presente"
      }
    }
  },

  // Datos precargados del boletín para la vista de Estudiante/Familia (ejemplo: María Rodríguez - ID 101)
  boletinEstudiante: {
    estudianteId: 101,
    nombre: "María Rodríguez Gómez",
    periodos: {
      "T1": {
        asignaturas: [
          { asignatura: "Matemáticas", tarea1: 90, examen1: 85, cotidiano: 95 },
          { asignatura: "Español", tarea1: 88, examen1: 92, cotidiano: 90 },
          { asignatura: "Ciencias", tarea1: 92, examen1: 88, cotidiano: 90 },
          { asignatura: "Historia", tarea1: 85, examen1: 80, cotidiano: 85 }
        ],
        asistencia: {
          totalDias: 45,
          ausencias: 2,
          injustificadas: 1
        }
      },
      "T2": {
        asignaturas: [
          { asignatura: "Matemáticas", tarea1: 95, examen1: 90, cotidiano: 95 },
          { asignatura: "Español", tarea1: 92, examen1: 95, cotidiano: 94 },
          { asignatura: "Ciencias", tarea1: 90, examen1: 92, cotidiano: 95 },
          { asignatura: "Historia", tarea1: 88, examen1: 85, cotidiano: 90 }
        ],
        asistencia: {
          totalDias: 45,
          ausencias: 1,
          injustificadas: 0
        }
      }
    }
  }
};

const gruposDocentes = ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3", "10-1", "10-2", "10-3", "11-1", "11-2"];
const nombresDocentes = ["Sofía Mora", "Mateo Rojas", "Valentina Castro", "Daniel Vargas", "Camila Herrera", "Sebastián Jiménez", "Lucía Ramírez", "Andrés Gómez", "Mariana Solano", "Gabriel Ruiz", "Elena Sánchez", "Nicolás Torres", "Paula Chaves", "Diego Méndez", "Andrea Cordero"];
mockData.grupos = gruposDocentes.map(id => ({ id, nombre: `Sección ${id}` }));
mockData.estudiantes = gruposDocentes.flatMap((grupo, indiceGrupo) => Array.from({ length: 13 }, (_, indice) => ({ id: 700 + indiceGrupo * 20 + indice, nombre: `${nombresDocentes[(indiceGrupo * 3 + indice) % nombresDocentes.length]} ${["Rodríguez", "Vargas", "Castro", "Mora", "Rojas", "Herrera"][indice % 6]}`, grupo })));
mockData.estudiantes.forEach((estudiante, indice) => {
  mockData.calificaciones[estudiante.grupo] ||= {};
  mockData.asignaturas.forEach((asignatura, indiceAsignatura) => {
    mockData.calificaciones[estudiante.grupo][asignatura.id] ||= {};
    const base = 68 + (indice * 7 + indiceAsignatura * 5) % 30;
    mockData.calificaciones[estudiante.grupo][asignatura.id][estudiante.id] = { tarea1: base, examen1: Math.max(0, base - 3), cotidiano: Math.min(100, base + 2) };
  });
});

// ============================================================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ============================================================================
const rolSesion = sessionStorage.getItem("rolUsuario");
const usuarioSesion = sessionStorage.getItem("usuarioLogueado");

if (!usuarioSesion || !["docente", "estudiante"].includes(rolSesion)) {
  window.location.replace(rolSesion === "administracion" ? "administrador.html" : "login.html");
}

const appState = {
  currentRole: rolSesion,        // 'docente' | 'estudiante'
  currentTabDocente: "calificaciones", // 'calificaciones' | 'asistencia'
  selectedGrupo: "10-1",
  selectedAsignatura: "MAT",
  selectedFechaAsistencia: new Date().toISOString().split("T")[0],
  selectedPeriodoEstudiante: "T1"
};

// ============================================================================
// 3. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================================================
let dom = {};

function cacheDomElements() {
  dom = {
    // Selector de Rol
    selectorRol: document.getElementById("selector-rol"),

    // Secciones principales
    vistaDocente: document.getElementById("vista-docente"),
    vistaEstudiante: document.getElementById("vista-estudiante"),

    // Filtros Docente
    selectGrupo: document.getElementById("select-grupo"),
    selectAsignatura: document.getElementById("select-asignatura"),

    // Pestañas Docente
    btnTabCalificaciones: document.getElementById("btn-tab-calificaciones"),
    btnTabAsistencia: document.getElementById("btn-tab-asistencia"),
    secCalificaciones: document.getElementById("sec-calificaciones"),
    secAsistencia: document.getElementById("sec-asistencia"),

    // Tabla Calificaciones
    tbodyCalificaciones: document.getElementById("tbody-calificaciones"),
    btnGuardarCalificaciones: document.getElementById("btn-guardar-calificaciones"),
    msgCalificaciones: document.getElementById("msg-calificaciones"),

    // Control Asistencia
    inputFechaAsistencia: document.getElementById("input-fecha-asistencia"),
    tbodyAsistencia: document.getElementById("tbody-asistencia"),
    btnGuardarAsistencia: document.getElementById("btn-guardar-asistencia"),
    msgAsistencia: document.getElementById("msg-asistencia"),

    // Vista Estudiante
    selectPeriodoEstudiante: document.getElementById("select-periodo-estudiante"),
    estudianteNombreDisplay: document.getElementById("estudiante-nombre-display"),
    promedioGeneralVal: document.getElementById("promedio-general-val"),
    diasLectivosVal: document.getElementById("dias-lectivos-val"),
    totalAusenciasVal: document.getElementById("total-ausencias-val"),
    ausenciasInjustificadasVal: document.getElementById("ausencias-injustificadas-val"),
    tbodyBoletin: document.getElementById("tbody-boletin"),
    asistenciaDetalleResumen: document.getElementById("asistencia-detalle-resumen"),
    btnCerrarSesion: document.getElementById("btn-cerrar-sesion"),
    linkClases: document.getElementById("link-clases"),
    dialogoCerrarSesion: document.getElementById("dialogo-cerrar-sesion")
  };
}

// ============================================================================
// 4. INICIALIZACIÓN Y CONFIGURACIÓN DE LISTENERS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  cacheDomElements();
  dom.selectorRol.value = appState.currentRole;
  dom.selectorRol.disabled = true;
  dom.selectorRol.setAttribute("aria-label", "Rol de la sesion activa");
  inicializarOpcionesFiltros();
  configurarEventListeners();
  dom.linkClases.hidden = appState.currentRole !== "docente";
  
  // Establecer fecha por defecto en el control de asistencia
  dom.inputFechaAsistencia.value = appState.selectedFechaAsistencia;

  // Renderizado inicial
  actualizarVistaPorRol();
});

/**
 * Carga las opciones de los selectores de grupo y asignatura desde mockData
 */
function inicializarOpcionesFiltros() {
  // Cargar Grupos
  dom.selectGrupo.innerHTML = mockData.grupos
    .map(g => `<option value="${g.id}">${g.nombre}</option>`)
    .join("");

  // Cargar Asignaturas
  dom.selectAsignatura.innerHTML = mockData.asignaturas
    .map(a => `<option value="${a.id}">${a.nombre}</option>`)
    .join("");

  appState.selectedGrupo = dom.selectGrupo.value;
  appState.selectedAsignatura = dom.selectAsignatura.value;
  const grupoSolicitado = new URLSearchParams(window.location.search).get("grupo");
  if (grupoSolicitado && mockData.grupos.some(grupo => grupo.id === grupoSolicitado)) {
    appState.selectedGrupo = grupoSolicitado;
    dom.selectGrupo.value = grupoSolicitado;
  }
}

/**
 * Registrar escuchadores de eventos
 */
function configurarEventListeners() {
  // 1. Cambio de Rol / Modo de prueba
  dom.selectorRol.addEventListener("change", (e) => {
    appState.currentRole = e.target.value;
    actualizarVistaPorRol();
  });

  // 2. Cambio de Pestañas en Vista Docente
  dom.btnTabCalificaciones.addEventListener("click", () => cambiarTabDocente("calificaciones"));
  dom.btnTabAsistencia.addEventListener("click", () => cambiarTabDocente("asistencia"));

  // 3. Cambio de Filtros en Vista Docente (Grupo y Asignatura)
  dom.selectGrupo.addEventListener("change", (e) => {
    appState.selectedGrupo = e.target.value;
    renderizarContenidoDocente();
  });

  dom.selectAsignatura.addEventListener("change", (e) => {
    appState.selectedAsignatura = e.target.value;
    renderizarContenidoDocente();
  });

  // 4. Cambio de Fecha en Control de Asistencia
  dom.inputFechaAsistencia.addEventListener("change", (e) => {
    appState.selectedFechaAsistencia = e.target.value;
    renderizarTablaAsistencia();
  });

  // 5. Botones de Guardar
  dom.btnGuardarCalificaciones.addEventListener("click", guardarCalificaciones);
  dom.btnGuardarAsistencia.addEventListener("click", guardarAsistencia);

  // 6. Listener dinámico para recálculo automático de notas al escribir (Input event)
  dom.tbodyCalificaciones.addEventListener("input", (e) => {
    if (e.target.classList.contains("input-nota")) {
      calcularNotaFila(e.target.closest("tr"));
    }
  });

  // 7. Cambio de Periodo Lectivo en Vista Estudiante
  dom.selectPeriodoEstudiante.addEventListener("change", (e) => {
    appState.selectedPeriodoEstudiante = e.target.value;
    renderizarVistaEstudiante();
  });

  dom.btnCerrarSesion.addEventListener("click", () => dom.dialogoCerrarSesion.showModal());
  dom.dialogoCerrarSesion.addEventListener("close", () => {
    if (dom.dialogoCerrarSesion.returnValue === "confirmar") {
      sessionStorage.clear();
      window.location.replace("login.html");
    }
  });
}

// ============================================================================
// 5. LÓGICA DE CONTROL DE VISTAS Y PESTAÑAS
// ============================================================================

/**
 * Muestra/Oculta la vista correspondiente según el rol seleccionado
 */
function actualizarVistaPorRol() {
  if (appState.currentRole === "docente") {
    dom.vistaDocente.style.display = "block";
    dom.vistaEstudiante.style.display = "none";
    renderizarContenidoDocente();
    dom.linkClases.hidden = false;
  } else {
    dom.vistaDocente.style.display = "none";
    dom.vistaEstudiante.style.display = "block";
    renderizarVistaEstudiante();
    dom.linkClases.hidden = true;
  }
}

/**
 * Alterna la visibilidad entre la pestaña de Calificaciones y la de Asistencia
 */
function cambiarTabDocente(tab) {
  appState.currentTabDocente = tab;
  
  if (tab === "calificaciones") {
    dom.secCalificaciones.style.display = "block";
    dom.secAsistencia.style.display = "none";
  } else {
    dom.secCalificaciones.style.display = "none";
    dom.secAsistencia.style.display = "block";
  }
  renderizarContenidoDocente();
}

/**
 * Renderiza el contenido activo de la vista docente (Calificaciones o Asistencia)
 */
function renderizarContenidoDocente() {
  if (appState.currentTabDocente === "calificaciones") {
    renderizarTablaCalificaciones();
  } else {
    renderizarTablaAsistencia();
  }
}

// ============================================================================
// 6. LÓGICA: VISTA DOCENTE - CALIFICACIONES
// ============================================================================

/**
 * Calcula el promedio simple (o ponderado) de las notas
 * Fórmula usada: Promedio = (Tarea 1 + Examen 1 + Cotidiano) / 3
 */
function calcularPromedio(tarea1, examen1, cotidiano) {
  const t = parseFloat(tarea1) || 0;
  const e = parseFloat(examen1) || 0;
  const c = parseFloat(cotidiano) || 0;
  
  const promedio = (t + e + c) / 3;
  return Math.round(promedio * 100) / 100; // Redondeo a 2 decimales
}

/**
 * Recalcula la nota final y el estado de aprobación para una fila de la tabla de calificaciones
 */
function calcularNotaFila(row) {
  const inputTarea1 = row.querySelector(".input-tarea1");
  const inputExamen1 = row.querySelector(".input-examen1");
  const inputCotidiano = row.querySelector(".input-cotidiano");
  const cellNotaFinal = row.querySelector(".cell-nota-final");
  const cellEstado = row.querySelector(".cell-estado");

  const promedio = calcularPromedio(inputTarea1.value, inputExamen1.value, inputCotidiano.value);
  
  cellNotaFinal.textContent = promedio.toFixed(2);
  
  if (promedio >= 70) {
    cellEstado.textContent = "Aprobado";
    cellEstado.style.color = "green";
  } else {
    cellEstado.textContent = "Reprobado";
    cellEstado.style.color = "red";
  }
}

/**
 * Genera dinámicamente la tabla de calificaciones para el grupo y asignatura seleccionados
 */
function renderizarTablaCalificaciones() {
  const grupo = appState.selectedGrupo;
  const asignatura = appState.selectedAsignatura;

  // Obtener estudiantes del grupo
  const estudiantesGrupo = mockData.estudiantes.filter(est => est.grupo === grupo);

  // Obtener calificaciones existentes o crear vacías
  const registroAsignatura = (mockData.calificaciones[grupo] && mockData.calificaciones[grupo][asignatura]) 
    ? mockData.calificaciones[grupo][asignatura] 
    : {};

  if (estudiantesGrupo.length === 0) {
    dom.tbodyCalificaciones.innerHTML = `<tr><td colspan="7">No hay estudiantes registrados en este grupo.</td></tr>`;
    return;
  }

  dom.tbodyCalificaciones.innerHTML = estudiantesGrupo.map((est, index) => {
    const notas = registroAsignatura[est.id] || { tarea1: 0, examen1: 0, cotidiano: 0 };
    const promedio = calcularPromedio(notas.tarea1, notas.examen1, notas.cotidiano);
    const estadoText = promedio >= 70 ? "Aprobado" : "Reprobado";
    const estadoColor = promedio >= 70 ? "green" : "red";

    return `
      <tr data-estudiante-id="${est.id}">
        <td>${index + 1}</td>
        <td><strong>${est.nombre}</strong></td>
        <td>
          <input type="number" class="input-nota input-tarea1" min="0" max="100" value="${notas.tarea1}" style="width: 70px;">
        </td>
        <td>
          <input type="number" class="input-nota input-examen1" min="0" max="100" value="${notas.examen1}" style="width: 70px;">
        </td>
        <td>
          <input type="number" class="input-nota input-cotidiano" min="0" max="100" value="${notas.cotidiano}" style="width: 70px;">
        </td>
        <td>
          <strong class="cell-nota-final">${promedio.toFixed(2)}</strong>
        </td>
        <td>
          <strong class="cell-estado" style="color: ${estadoColor};">${estadoText}</strong>
        </td>
      </tr>
    `;
  }).join("");
}

/**
 * Guarda las calificaciones ingresadas en la estructura de datos simulada
 */
function guardarCalificaciones() {
  const grupo = appState.selectedGrupo;
  const asignatura = appState.selectedAsignatura;

  if (!mockData.calificaciones[grupo]) {
    mockData.calificaciones[grupo] = {};
  }
  if (!mockData.calificaciones[grupo][asignatura]) {
    mockData.calificaciones[grupo][asignatura] = {};
  }

  const filas = dom.tbodyCalificaciones.querySelectorAll("tr");
  
  filas.forEach(row => {
    const estudianteId = row.getAttribute("data-estudiante-id");
    if (!estudianteId) return;

    const t1 = parseFloat(row.querySelector(".input-tarea1").value) || 0;
    const e1 = parseFloat(row.querySelector(".input-examen1").value) || 0;
    const cot = parseFloat(row.querySelector(".input-cotidiano").value) || 0;

    mockData.calificaciones[grupo][asignatura][estudianteId] = {
      tarea1: t1,
      examen1: e1,
      cotidiano: cot
    };
  });

  // Mostrar mensaje de confirmación
  dom.msgCalificaciones.textContent = "✅ Calificaciones guardadas exitosamente.";
  dom.msgCalificaciones.style.color = "green";
  setTimeout(() => {
    dom.msgCalificaciones.textContent = "";
  }, 3000);
}

// ============================================================================
// 7. LÓGICA: VISTA DOCENTE - CONTROL DE ASISTENCIA
// ============================================================================

/**
 * Genera la tabla para tomar asistencia en la fecha y grupo seleccionados
 */
function renderizarTablaAsistencia() {
  const grupo = appState.selectedGrupo;
  const fecha = appState.selectedFechaAsistencia;

  const estudiantesGrupo = mockData.estudiantes.filter(est => est.grupo === grupo);
  
  const asistenciaFechaGrupo = (mockData.asistencias[fecha] && mockData.asistencias[fecha][grupo])
    ? mockData.asistencias[fecha][grupo]
    : {};

  if (estudiantesGrupo.length === 0) {
    dom.tbodyAsistencia.innerHTML = `<tr><td colspan="3">No hay estudiantes registrados en este grupo.</td></tr>`;
    return;
  }

  dom.tbodyAsistencia.innerHTML = estudiantesGrupo.map((est, index) => {
    const estadoActual = asistenciaFechaGrupo[est.id] || "presente";

    return `
      <tr data-estudiante-id="${est.id}">
        <td>${index + 1}</td>
        <td><strong>${est.nombre}</strong></td>
        <td>
          <label>
            <input type="radio" name="asistencia_${est.id}" value="presente" ${estadoActual === "presente" ? "checked" : ""}>
            Presente
          </label>
          &nbsp;&nbsp;
          <label>
            <input type="radio" name="asistencia_${est.id}" value="ausente" ${estadoActual === "ausente" ? "checked" : ""}>
            Ausente
          </label>
          &nbsp;&nbsp;
          <label>
            <input type="radio" name="asistencia_${est.id}" value="justificado" ${estadoActual === "justificado" ? "checked" : ""}>
            Justificado
          </label>
        </td>
      </tr>
    `;
  }).join("");
}

/**
 * Guarda el registro de asistencia en la estructura de datos simulada
 */
function guardarAsistencia() {
  const grupo = appState.selectedGrupo;
  const fecha = appState.selectedFechaAsistencia;

  if (!fecha) {
    alert("Por favor seleccione una fecha válida.");
    return;
  }

  if (!mockData.asistencias[fecha]) {
    mockData.asistencias[fecha] = {};
  }
  if (!mockData.asistencias[fecha][grupo]) {
    mockData.asistencias[fecha][grupo] = {};
  }

  const filas = dom.tbodyAsistencia.querySelectorAll("tr");

  filas.forEach(row => {
    const estudianteId = row.getAttribute("data-estudiante-id");
    if (!estudianteId) return;

    const seleccionado = row.querySelector(`input[name="asistencia_${estudianteId}"]:checked`);
    const estado = seleccionado ? seleccionado.value : "presente";

    mockData.asistencias[fecha][grupo][estudianteId] = estado;
  });

  // Mostrar mensaje de confirmación
  dom.msgAsistencia.textContent = "✅ Asistencia registrada exitosamente para la fecha " + fecha + ".";
  dom.msgAsistencia.style.color = "green";
  setTimeout(() => {
    dom.msgAsistencia.textContent = "";
  }, 3000);
}

// ============================================================================
// 8. LÓGICA: VISTA ESTUDIANTE / FAMILIA (SOLO LECTURA)
// ============================================================================

/**
 * Carga y renderiza los datos del boletín de notas y resumen de asistencia para el estudiante
 */
function renderizarVistaEstudiante() {
  const periodo = appState.selectedPeriodoEstudiante;
  const datosBoletin = mockData.boletinEstudiante;
  const datosPeriodo = datosBoletin.periodos[periodo];

  if (!datosPeriodo) {
    dom.tbodyBoletin.innerHTML = `<tr><td colspan="6">No hay información disponible para el periodo seleccionado.</td></tr>`;
    return;
  }

  dom.estudianteNombreDisplay.textContent = datosBoletin.nombre;

  // Renderizar filas de asignaturas
  let sumaPromedios = 0;
  const asignaturasHtml = datosPeriodo.asignaturas.map(item => {
    const prom = calcularPromedio(item.tarea1, item.examen1, item.cotidiano);
    sumaPromedios += prom;
    const aprobado = prom >= 70;
    const estadoText = aprobado ? "Aprobado" : "Reprobado";
    const estadoColor = aprobado ? "green" : "red";

    return `
      <tr>
        <td><strong>${item.asignatura}</strong></td>
        <td>${item.tarea1}</td>
        <td>${item.examen1}</td>
        <td>${item.cotidiano}</td>
        <td><strong>${prom.toFixed(2)}</strong></td>
        <td><strong style="color: ${estadoColor};">${estadoText}</strong></td>
      </tr>
    `;
  }).join("");

  dom.tbodyBoletin.innerHTML = asignaturasHtml;

  // Calcular promedio general del periodo
  const totalAsignaturas = datosPeriodo.asignaturas.length;
  const promedioGeneral = totalAsignaturas > 0 ? (sumaPromedios / totalAsignaturas) : 0;
  dom.promedioGeneralVal.textContent = promedioGeneral.toFixed(2);

  // Renderizar Resumen de Asistencia
  const asistencia = datosPeriodo.asistencia;
  dom.diasLectivosVal.textContent = asistencia.totalDias;
  dom.totalAusenciasVal.textContent = asistencia.ausencias;
  dom.ausenciasInjustificadasVal.textContent = asistencia.injustificadas;

  dom.asistenciaDetalleResumen.innerHTML = `
    Durante el <strong>${periodo === "T1" ? "1° Trimestre" : "2° Trimestre"}</strong>, el estudiante asistió a 
    <strong>${asistencia.totalDias - asistencia.ausencias}</strong> de <strong>${asistencia.totalDias}</strong> días lectivos. 
    Registra <strong>${asistencia.ausencias}</strong> ausencia(s) en total (<strong>${asistencia.injustificadas}</strong> injustificada(s)).
  `;
}
