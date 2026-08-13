# INTRANET Escolar

INTRANET es una maqueta web estática de gestión escolar. Ofrece autenticación simulada, expediente de estudiantes, cursos, calificaciones, calendario, notificaciones, comunicados y vistas académicas por rol.

## Características

- Panel administrativo con 120 estudiantes, búsqueda, filtros y estadísticas coherentes.
- Estados académicos: aprobado (70%+), aplazado (60–69%) y reprobado (<60%).
- Oferta de 18 cursos, docentes asignados, calendario y notificaciones.
- Módulo académico para docente/estudiante y tablón de comunicados.
- Diseño responsive con HTML5, CSS3 y JavaScript ES6 sin paquetes de npm.

## Estructura

```text
pages/       Vistas HTML y acceso principal
src/css/     Estilos de login y estilos compartidos de la aplicación
src/js/      Autenticación, datos simulados y controladores de cada vista
docs/        Arquitectura y requerimientos
```

## Uso y ejecución

No requiere instalación ni servidor. Abra `pages/index.html` con un navegador moderno:

```powershell
Start-Process .\pages\index.html
```

Use `admin@colegio.edu` / `admin1234` para el panel administrativo, `profe@colegio.edu` / `profe2026` para la vista docente o `alumno@colegio.edu` / `alumno123` para la vista estudiante. La sesión se guarda en `sessionStorage` y termina al cerrar la pestaña o salir.

## Licencia

No se ha definido una licencia para este repositorio.
