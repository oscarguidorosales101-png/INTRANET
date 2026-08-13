/* =========================================================
   DATOS DE EJEMPLO
   ========================================================= */

const estudiantes = [

    {
        id: "EST-001",
        nombre: "María Fernanda López",
        correo: "maria.lopez@educampus.com",
        carrera: "Desarrollo Web",
        grupo: "DW-01",
        promedio: 91,
        asistencia: 96,
        tareasEntregadas: 18,
        tareasTotales: 20,

        materias: [
            { nombre: "Programación Web", nota: 94 },
            { nombre: "Diseño UX/UI", nota: 89 },
            { nombre: "Bases de Datos", nota: 92 },
            { nombre: "Matemáticas", nota: 90 }
        ]
    },

    {
        id: "EST-002",
        nombre: "Carlos Andrés Rodríguez",
        correo: "carlos.rodriguez@educampus.com",
        carrera: "Desarrollo Web",
        grupo: "DW-01",
        promedio: 76,
        asistencia: 88,
        tareasEntregadas: 16,
        tareasTotales: 20,

        materias: [
            { nombre: "Programación Web", nota: 81 },
            { nombre: "Diseño UX/UI", nota: 73 },
            { nombre: "Bases de Datos", nota: 79 },
            { nombre: "Matemáticas", nota: 71 }
        ]
    },

    {
        id: "EST-003",
        nombre: "Sofía Valentina Pérez",
        correo: "sofia.perez@educampus.com",
        carrera: "Diseño Digital",
        grupo: "DD-02",
        promedio: 65,
        asistencia: 82,
        tareasEntregadas: 13,
        tareasTotales: 20,

        materias: [
            { nombre: "Diseño UX/UI", nota: 69 },
            { nombre: "Programación Web", nota: 63 },
            { nombre: "Comunicación", nota: 72 },
            { nombre: "Matemáticas", nota: 56 }
        ]
    },

    {
        id: "EST-004",
        nombre: "Daniel Alejandro Gómez",
        correo: "daniel.gomez@educampus.com",
        carrera: "Programación",
        grupo: "PR-01",
        promedio: 48,
        asistencia: 67,
        tareasEntregadas: 8,
        tareasTotales: 20,

        materias: [
            { nombre: "Programación Web", nota: 55 },
            { nombre: "Matemáticas", nota: 42 },
            { nombre: "Bases de Datos", nota: 49 },
            { nombre: "Lógica", nota: 46 }
        ]
    },

    {
        id: "EST-005",
        nombre: "Valeria Jiménez Mora",
        correo: "valeria.jimenez@educampus.com",
        carrera: "Desarrollo Web",
        grupo: "DW-02",
        promedio: 84,
        asistencia: 93,
        tareasEntregadas: 19,
        tareasTotales: 20,

        materias: [
            { nombre: "Programación Web", nota: 88 },
            { nombre: "Diseño UX/UI", nota: 85 },
            { nombre: "Bases de Datos", nota: 81 },
            { nombre: "Matemáticas", nota: 82 }
        ]
    },

    {
        id: "EST-006",
        nombre: "José Manuel Vargas",
        correo: "jose.vargas@educampus.com",
        carrera: "Programación",
        grupo: "PR-02",
        promedio: 58,
        asistencia: 74,
        tareasEntregadas: 11,
        tareasTotales: 20,

        materias: [
            { nombre: "Programación Web", nota: 60 },
            { nombre: "Matemáticas", nota: 55 },
            { nombre: "Bases de Datos", nota: 59 },
            { nombre: "Lógica", nota: 58 }
        ]
    }

];


/* =========================================================
   VARIABLES
   ========================================================= */

const listaEstudiantes =
    document.getElementById("listaEstudiantes");

const buscarInput =
    document.getElementById("buscarEstudiante");

const detalleEstudiante =
    document.getElementById("detalleEstudiante");

let filtroActual = "todos";

let estudianteSeleccionado = null;


/* =========================================================
   DETERMINAR ESTADO
   ========================================================= */

function obtenerEstado(promedio) {

    if (promedio >= 70) {
        return "pasando";
    }

    if (promedio >= 60) {
        return "aplazado";
    }

    return "reprobado";
}


/* =========================================================
   INFORMACIÓN DEL ESTADO
   ========================================================= */

function obtenerInformacionEstado(promedio) {

    if (promedio >= 70) {

        return {
            texto: "VA A PASAR",
            clase: "estado-pasa",
            color: "verde"
        };

    }

    if (promedio >= 60) {

        return {
            texto: "APLAZADO",
            clase: "estado-aplazado",
            color: "amarillo"
        };

    }

    return {
        texto: "REPROBADO",
        clase: "estado-reprobado",
        color: "rojo"
    };

}


/* =========================================================
   INICIALES
   ========================================================= */

function obtenerIniciales(nombre) {

    const partes = nombre.trim().split(" ");

    const primera = partes[0]?.charAt(0) || "";

    const segunda = partes[1]?.charAt(0) || "";

    return (
        primera + segunda
    ).toUpperCase();

}


/* =========================================================
   MOSTRAR ESTUDIANTES
   ========================================================= */

function mostrarEstudiantes() {

    const textoBusqueda =
        buscarInput.value
            .toLowerCase()
            .trim();


    let resultados =
        estudiantes.filter(estudiante => {

            const coincideBusqueda =
                estudiante.nombre
                    .toLowerCase()
                    .includes(textoBusqueda)

                ||

                estudiante.correo
                    .toLowerCase()
                    .includes(textoBusqueda)

                ||

                estudiante.id
                    .toLowerCase()
                    .includes(textoBusqueda);


            const estado =
                obtenerEstado(
                    estudiante.promedio
                );


            const coincideFiltro =
                filtroActual === "todos"
                    ? true
                    : estado === filtroActual;


            return (
                coincideBusqueda &&
                coincideFiltro
            );

        });


    listaEstudiantes.innerHTML = "";


    if (resultados.length === 0) {

        listaEstudiantes.innerHTML = `

            <div class="mensaje-vacio">

                <div style="font-size: 40px;">
                    🔎
                </div>

                <h3>No se encontraron estudiantes</h3>

                <p>
                    Intenta cambiar la búsqueda o el filtro.
                </p>

            </div>

        `;

        return;
    }


    resultados.forEach(estudiante => {

        const estado =
            obtenerInformacionEstado(
                estudiante.promedio
            );


        const fila =
            document.createElement("div");

        fila.className =
            "estudiante-row";


        fila.innerHTML = `

            <div class="estudiante-avatar">
                ${obtenerIniciales(estudiante.nombre)}
            </div>


            <div class="estudiante-info">

                <strong>
                    ${estudiante.nombre}
                </strong>

                <small>
                    ${estudiante.id} ·
                    ${estudiante.carrera}
                </small>

            </div>


            <div class="promedio">
                ${estudiante.promedio}%
            </div>


            <span
                class="estado-badge ${estado.clase}"
            >
                ${estado.texto}
            </span>

        `;


        fila.addEventListener(
            "click",
            () => seleccionarEstudiante(estudiante)
        );


        listaEstudiantes.appendChild(fila);

    });

}


/* =========================================================
   SELECCIONAR ESTUDIANTE
   ========================================================= */

function seleccionarEstudiante(estudiante) {

    estudianteSeleccionado =
        estudiante;


    const estado =
        obtenerInformacionEstado(
            estudiante.promedio
        );


    const porcentajeTareas =
        Math.round(
            (
                estudiante.tareasEntregadas /
                estudiante.tareasTotales
            ) * 100
        );


    let riesgoTexto = "";

    if (estudiante.promedio >= 85) {

        riesgoTexto =
            "✅ Excelente rendimiento. El estudiante presenta un buen nivel académico.";

    } else if (estudiante.promedio >= 70) {

        riesgoTexto =
            "✅ El estudiante mantiene un rendimiento suficiente para aprobar.";

    } else if (estudiante.promedio >= 60) {

        riesgoTexto =
            "⚠️ El estudiante presenta riesgo académico. Se recomienda seguimiento y refuerzo.";

    } else {

        riesgoTexto =
            "🚨 Alto riesgo académico. El estudiante presenta un promedio insuficiente para aprobar.";

    }


    detalleEstudiante.innerHTML = `

        <div class="detalle-header">

            <div class="detalle-avatar">

                ${obtenerIniciales(
                    estudiante.nombre
                )}

            </div>

            <div>

                <h2>
                    ${estudiante.nombre}
                </h2>

                <p>
                    ${estudiante.id}
                </p>

            </div>

        </div>


        <span
            class="estado-badge ${estado.clase}"
            style="margin-bottom:18px;"
        >
            ${estado.texto}
        </span>


        <div class="resumen-academico">

            <div class="dato-academico">

                <small>Promedio general</small>

                <strong>
                    ${estudiante.promedio}%
                </strong>

            </div>


            <div class="dato-academico">

                <small>Asistencia</small>

                <strong>
                    ${estudiante.asistencia}%
                </strong>

            </div>


            <div class="dato-academico">

                <small>Tareas entregadas</small>

                <strong>
                    ${estudiante.tareasEntregadas}/
                    ${estudiante.tareasTotales}
                </strong>

            </div>


            <div class="dato-academico">

                <small>Grupo</small>

                <strong>
                    ${estudiante.grupo}
                </strong>

            </div>

        </div>


        <div class="detalle-seccion">

            <h3>
                👤 Información personal
            </h3>

            <div class="materia-detalle">

                <strong>Correo</strong>

                <p style="color:var(--text-secondary);font-size:12px;margin-top:4px;">
                    ${estudiante.correo}
                </p>

            </div>

            <div class="materia-detalle">

                <strong>Carrera</strong>

                <p style="color:var(--text-secondary);font-size:12px;margin-top:4px;">
                    ${estudiante.carrera}
                </p>

            </div>

        </div>


        <div class="detalle-seccion">

            <h3>
                📚 Rendimiento por materia
            </h3>

            ${estudiante.materias.map(materia => {

                const estadoMateria =
                    obtenerInformacionEstado(
                        materia.nota
                    );


                const barraClase =
                    materia.nota >= 70
                        ? "barra-verde"
                        : materia.nota >= 60
                            ? "barra-amarilla"
                            : "barra-roja";


                return `

                    <div class="materia-detalle">

                        <div class="materia-detalle-superior">

                            <strong>
                                ${materia.nombre}
                            </strong>

                            <span class="nota-materia">
                                ${materia.nota}%
                            </span>

                        </div>

                        <div class="mini-progreso">

                            <div
                                class="mini-progreso-barra ${barraClase}"
                                style="width:${materia.nota}%"
                            ></div>

                        </div>

                        <small
                            style="
                                display:block;
                                margin-top:6px;
                                color:var(--text-secondary);
                            "
                        >
                            ${
                                materia.nota >= 70
                                    ? "Aprobando"
                                    : materia.nota >= 60
                                        ? "Aplazado"
                                        : "Reprobado"
                            }
                        </small>

                    </div>

                `;

            }).join("")}

        </div>


        <div class="detalle-seccion">

            <h3>
                📊 Entrega de tareas
            </h3>

            <div class="materia-detalle">

                <div class="materia-detalle-superior">

                    <strong>
                        ${porcentajeTareas}% entregadas
                    </strong>

                    <span>
                        ${
                            estudiante.tareasEntregadas
                        } /
                        ${
                            estudiante.tareasTotales
                        }
                    </span>

                </div>

                <div class="mini-progreso">

                    <div
                        class="mini-progreso-barra barra-verde"
                        style="width:${porcentajeTareas}%"
                    ></div>

                </div>

            </div>

        </div>


        <div class="detalle-seccion">

            <h3>
                🎯 Evaluación académica
            </h3>

            <div class="riesgo ${estado.color}">

                ${riesgoTexto}

            </div>

        </div>

    `;

}


/* =========================================================
   ESTADÍSTICAS
   ========================================================= */

function actualizarEstadisticas() {

    const total =
        estudiantes.length;


    const pasando =
        estudiantes.filter(
            estudiante =>
                obtenerEstado(
                    estudiante.promedio
                ) === "pasando"
        ).length;


    const aplazados =
        estudiantes.filter(
            estudiante =>
                obtenerEstado(
                    estudiante.promedio
                ) === "aplazado"
        ).length;


    const reprobados =
        estudiantes.filter(
            estudiante =>
                obtenerEstado(
                    estudiante.promedio
                ) === "reprobado"
        ).length;


    document.getElementById(
        "totalEstudiantes"
    ).textContent = total;


    document.getElementById(
        "totalPasando"
    ).textContent = pasando;


    document.getElementById(
        "totalAplazados"
    ).textContent = aplazados;


    document.getElementById(
        "totalReprobados"
    ).textContent = reprobados;

}


/* =========================================================
   BUSCADOR
   ========================================================= */

buscarInput.addEventListener(
    "input",
    mostrarEstudiantes
);


/* =========================================================
   FILTROS
   ========================================================= */

document
    .querySelectorAll(".filtro-admin")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filtro-admin"
                    )
                    .forEach(b => {

                        b.classList.remove(
                            "activo"
                        );

                    });


                boton.classList.add(
                    "activo"
                );


                filtroActual =
                    boton.dataset.filtro;


                mostrarEstudiantes();

            }
        );

    });


/* =========================================================
   ACTUALIZAR
   ========================================================= */

document
    .getElementById("actualizarDatos")
    .addEventListener(
        "click",
        () => {

            mostrarEstudiantes();

            actualizarEstadisticas();

            if (estudianteSeleccionado) {

                seleccionarEstudiante(
                    estudianteSeleccionado
                );

            }

        }
    );


/* =========================================================
   CERRAR SESIÓN
   ========================================================= */

const cerrarSesion =
    document.getElementById("cerrarSesion");


if (cerrarSesion) {

    cerrarSesion.addEventListener(
        "click",
        () => {

            const confirmar =
                confirm(
                    "¿Seguro que deseas cerrar sesión?"
                );


            if (confirmar) {

                window.location.href =
                    "index.html";

            }

        }
    );

}


/* =========================================================
   INICIALIZAR
   ========================================================= */

actualizarEstadisticas();

mostrarEstudiantes();