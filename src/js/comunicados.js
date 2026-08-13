/**
 * comunicados.js - Lógica del Módulo 04: Tablón de Comunicados, Avisos y Alertas
 * Intranet Escolar
 */

// ============================================================================
// 1. DATOS SIMULADOS (MOCK DATA)
// ============================================================================
const mockComunicados = [
  {
    id: 1,
    titulo: "🚨 ALERTA: Suspensión de Lecciones por Tormenta Tropical",
    categoria: "Alerta Urgente",
    destinatario: "Todos",
    mensaje: "Se informa a toda la comunidad educativa que, siguiendo las directrices de la Comisión Nacional de Emergencias, las lecciones presenciales quedan suspendidas para el día de mañana debido a las fuertes lluvias.",
    adjunto: "Comunicado_Oficial_Emergencia.pdf",
    esUrgente: true,
    autor: "Dirección General",
    fecha: "2026-08-12 08:30"
  },
  {
    id: 2,
    titulo: "Invitación a la Feria Institucional de Ciencias 2026",
    categoria: "Evento",
    destinatario: "Todos",
    mensaje: "Nos complace invitar a estudiantes y familias a la Feria Institucional de Ciencias y Tecnología. Habrá exposición de proyectos, talleres interactivos y premiación a los mejores experimentos.",
    adjunto: "Guia_Participacion_Feria.pdf",
    esUrgente: false,
    autor: "Comité de Ciencias",
    fecha: "2026-08-10 14:15"
  },
  {
    id: 3,
    titulo: "Reunión Informativa de Padres de Familia - Sección 10-1",
    categoria: "Académico",
    destinatario: "Sección 10-1",
    mensaje: "Se convoca a los padres y madres de la Sección 10-1 a la reunión del cierre del segundo periodo para entrega de notas y revisión de rendimiento académico.",
    adjunto: null,
    esUrgente: false,
    autor: "Prof. Carlos Gómez (Guía)",
    fecha: "2026-08-08 10:00"
  },
  {
    id: 4,
    titulo: "Recordatorio: Horario de Atención en Secretaría",
    categoria: "General",
    destinatario: "Todos",
    mensaje: "Les recordamos que el horario de atención para solicitudes de certificaciones y trámites administrativos es de Lunes a Viernes de 7:30 AM a 3:00 PM.",
    adjunto: null,
    esUrgente: false,
    autor: "Administración Central",
    fecha: "2026-08-05 11:20"
  }
];

// ============================================================================
// 2. ESTADO GLOBAL
// ============================================================================
const appState = {
  currentRole: "publicador", // 'publicador' | 'lector'
  searchKeyword: "",
  selectedCategory: "Todas"
};

// ============================================================================
// 3. REFERENCIAS DOM
// ============================================================================
let dom = {};

function cacheDomElements() {
  dom = {
    selectorRol: document.getElementById("selector-rol"),
    secCreacion: document.getElementById("sec-creacion"),
    formComunicado: document.getElementById("form-comunicado"),
    inputTitulo: document.getElementById("input-titulo"),
    selectCategoriaForm: document.getElementById("select-categoria-form"),
    selectDestinatario: document.getElementById("select-destinatario"),
    textareaMensaje: document.getElementById("textarea-mensaje"),
    inputAdjunto: document.getElementById("input-adjunto"),
    checkUrgente: document.getElementById("check-urgente"),
    msgPublicacion: document.getElementById("msg-publicacion"),
    
    // Filtros
    inputBusqueda: document.getElementById("input-busqueda"),
    selectFiltroCategoria: document.getElementById("select-filtro-categoria"),

    // Vistas de avisos
    containerAlertas: document.getElementById("container-alertas"),
    containerFeed: document.getElementById("container-feed")
  };
}

// ============================================================================
// 4. INICIALIZACIÓN
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  cacheDomElements();
  configurarEventListeners();
  actualizarVisibilidadCreacion();
  renderizarVistas();
});

/**
 * Configuración de escuchadores de eventos
 */
function configurarEventListeners() {
  // 1. Conmutador de Rol
  dom.selectorRol.addEventListener("change", (e) => {
    appState.currentRole = e.target.value;
    actualizarVisibilidadCreacion();
  });

  // 2. Formulario de Publicación de Comunicados
  dom.formComunicado.addEventListener("submit", procesarNuevoComunicado);

  // 3. Filtro por Palabra Clave
  dom.inputBusqueda.addEventListener("input", (e) => {
    appState.searchKeyword = e.target.value.toLowerCase().trim();
    renderizarVistas();
  });

  // 4. Filtro por Categoría
  dom.selectFiltroCategoria.addEventListener("change", (e) => {
    appState.selectedCategory = e.target.value;
    renderizarVistas();
  });
}

// ============================================================================
// 5. CONTROL DE VISTAS Y ROLES
// ============================================================================

/**
 * Muestra u oculta el formulario de redacción según el rol activo
 */
function actualizarVisibilidadCreacion() {
  if (appState.currentRole === "publicador") {
    dom.secCreacion.style.display = "block";
  } else {
    dom.secCreacion.style.display = "none";
  }
}

// ============================================================================
// 6. PUBLICACIÓN DE COMUNICADOS
// ============================================================================

/**
 * Procesa el envío del formulario y agrega el comunicado al feed
 */
function procesarNuevoComunicado(e) {
  e.preventDefault();

  const titulo = dom.inputTitulo.value.trim();
  const categoria = dom.selectCategoriaForm.value;
  const destinatario = dom.selectDestinatario.value;
  const mensaje = dom.textareaMensaje.value.trim();
  const esUrgente = dom.checkUrgente.checked;

  // Obtener nombre del archivo adjunto si fue seleccionado
  let adjuntoNombre = null;
  if (dom.inputAdjunto.files && dom.inputAdjunto.files.length > 0) {
    adjuntoNombre = dom.inputAdjunto.files[0].name;
  }

  // Generar fecha y hora actual en formato YYYY-MM-DD HH:mm
  const ahora = new Date();
  const fechaStr = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')} ${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;

  // Crear objeto del nuevo comunicado
  const nuevoComunicado = {
    id: Date.now(),
    titulo: esUrgente ? `🚨 ${titulo}` : titulo,
    categoria: categoria,
    destinatario: destinatario,
    mensaje: mensaje,
    adjunto: adjuntoNombre,
    esUrgente: esUrgente,
    autor: "Usuario Actual (Docente/Admin)",
    fecha: fechaStr
  };

  // Insertar al inicio de la lista (más reciente primero)
  mockComunicados.unshift(nuevoComunicado);

  // Limpiar el formulario
  dom.formComunicado.reset();

  // Notificar al usuario
  dom.msgPublicacion.textContent = "✅ Comunicado publicado exitosamente en el tablón.";
  dom.msgPublicacion.style.color = "green";
  setTimeout(() => {
    dom.msgPublicacion.textContent = "";
  }, 3500);

  // Volver a renderizar el feed y alertas
  renderizarVistas();
}

// ============================================================================
// 7. RENDERIZADO Y FILTRADO DE COMUNICADOS
// ============================================================================

/**
 * Filtra los comunicados según las opciones seleccionadas en la barra de búsqueda
 */
function obtenerComunicadosFiltrados() {
  return mockComunicados.filter(item => {
    // Filtro de Categoría
    const coincideCategoria = (appState.selectedCategory === "Todas") || (item.categoria === appState.selectedCategory);

    // Filtro de Palabra Clave (Busca en título, mensaje, autor o destinatario)
    const kw = appState.searchKeyword;
    const coincideBusqueda = !kw || 
      item.titulo.toLowerCase().includes(kw) ||
      item.mensaje.toLowerCase().includes(kw) ||
      item.autor.toLowerCase().includes(kw) ||
      item.destinatario.toLowerCase().includes(kw);

    return coincideCategoria && coincideBusqueda;
  });
}

/**
 * Renderiza la sección de alertas urgentes y el feed general de avisos
 */
function renderizarVistas() {
  const listaFiltrada = obtenerComunicadosFiltrados();

  // 1. Renderizar Alertas Urgentes Destacadas
  const alertasUrgentes = mockComunicados.filter(c => c.esUrgente);
  renderizarAlertasUrgentes(alertasUrgentes);

  // 2. Renderizar Feed General
  renderizarFeed(listaFiltrada);
}

/**
 * Genera el HTML para el contenedor de alertas urgentes destacadas
 */
function renderizarAlertasUrgentes(alertas) {
  if (alertas.length === 0) {
    dom.containerAlertas.innerHTML = `<p><em>No hay alertas urgentes activas en este momento.</em></p>`;
    return;
  }

  dom.containerAlertas.innerHTML = alertas.map(item => `
    <article border="1" style="background-color: #fff0f0; padding: 12px; margin-bottom: 12px; border-left: 5px solid red;">
      <h4>${item.titulo}</h4>
      <p><small><strong>Publicado por:</strong> ${item.autor} | <strong>Fecha:</strong> ${item.fecha} | <strong>Audiencia:</strong> ${item.destinatario}</small></p>
      <p>${item.mensaje}</p>
      ${item.adjunto ? `<p>📎 <strong>Adjunto:</strong> <button type="button" onclick="alert('Descargando archivo: ${item.adjunto}')">Descargar ${item.adjunto}</button></p>` : ''}
    </article>
  `).join("");
}

/**
 * Genera el HTML para el feed general de comunicados
 */
function renderizarFeed(comunicados) {
  if (comunicados.length === 0) {
    dom.containerFeed.innerHTML = `<p><em>No se encontraron comunicados que coincidan con los criterios de búsqueda.</em></p>`;
    return;
  }

  dom.containerFeed.innerHTML = comunicados.map(item => `
    <article border="1" style="padding: 15px; margin-bottom: 15px; border: 1px solid #ccc;">
      <header>
        <h3>${item.titulo}</h3>
        <p>
          <small>
            <strong>Publicado por:</strong> ${item.autor} &nbsp;|&nbsp; 
            <strong>Fecha:</strong> ${item.fecha} &nbsp;|&nbsp; 
            <strong>Categoría:</strong> [${item.categoria}] &nbsp;|&nbsp; 
            <strong>Para:</strong> [${item.destinatario}]
          </small>
        </p>
      </header>
      <hr>
      <section>
        <p>${item.mensaje}</p>
      </section>
      ${item.adjunto ? `
        <footer>
          <p>
            📎 <strong>Archivo Adjunto:</strong> 
            <button type="button" onclick="alert('Simulación de descarga: ${item.adjunto}')">Descargar ${item.adjunto}</button>
          </p>
        </footer>
      ` : ''}
    </article>
  `).join("");
}
