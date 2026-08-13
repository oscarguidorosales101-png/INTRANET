# Arquitectura

## Stack y decisiones

El sistema usa HTML5, CSS3 y JavaScript ES6 del navegador. No hay backend, base de datos, compilación ni dependencias de paquetes. La autenticación y los datos son simulados; la sesión por pestaña usa `sessionStorage`.

## Organización

- `pages/`: login, panel administrativo y vistas secundarias.
- `src/css/login.css`: estilo de acceso; `src/css/app.css`: componentes responsive reutilizables.
- `src/js/datos.js`: datos administrativos compartidos.
- `src/js/administrador.js`: lista, filtros, estadísticas y expediente.
- `src/js/gestion.js`: renderiza cursos, calificaciones, calendario, notificaciones y docentes según `data-vista`.
- `src/js/academico.js` y `src/js/comunicados.js`: módulos originales protegidos por rol.

Las páginas administrativas cargan primero `datos.js` y luego su controlador. Los conteos del panel se calculan desde la colección de estudiantes, por lo que se mantienen alineados con la tabla de calificaciones.
