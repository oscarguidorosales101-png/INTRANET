# Guía para agentes

INTRANET es una aplicación estática Vanilla. `pages/` contiene vistas; `src/css/app.css` contiene estilos compartidos; `src/js/datos.js` es la fuente única de estudiantes, cursos, eventos y notificaciones administrativas.

Reglas: analizar antes de editar, no borrar código funcional, preservar rutas relativas, no duplicar datos ni CSS, y mantener los estados académicos derivados del promedio. Los controladores importantes son `administrador.js`, `academico.js`, `comunicados.js`, `gestion.js` y `login.js`.

Para cambios: modifique solo lo necesario, verifique los IDs usados por JavaScript, compruebe enlaces y ejecute `node --check` sobre los scripts modificados. Actualice esta documentación y `CHANGELOG.md` cuando el comportamiento o la estructura cambien.
