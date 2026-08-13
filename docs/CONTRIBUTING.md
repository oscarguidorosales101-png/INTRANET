# Guía de contribución

- Cree una rama por cambio, por ejemplo `fix/rutas-academico` o `feat/calendario`.
- Use commits breves e imperativos: `fix: corrige enlace de cursos`.
- Revise primero el HTML, CSS y JavaScript relacionados; no reemplace módulos funcionales sin necesidad.
- Mantenga los datos de `src/js/datos.js` coherentes: los contadores se derivan de esos registros.
- Pruebe rutas locales, controles del DOM y sintaxis con `node --check src/js/*.js` antes de abrir un Pull Request.
- En el Pull Request describa el objetivo, vistas afectadas, verificación hecha y cambios de datos o documentación.
- Las revisiones deben confirmar que no haya enlaces rotos, CSS duplicado ni cambios visuales no solicitados.
