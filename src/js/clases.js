const rolClase = sessionStorage.getItem("rolUsuario");
if (rolClase !== "docente") window.location.replace("academico.html");
const gruposClase = ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3", "10-1", "10-2", "10-3", "11-1", "11-2"];
const encargados = ["Ana Vargas", "Luis Rojas", "María Castro", "Daniel Solano", "Elena Mora", "Carlos Jiménez"];
const niveles = { 7:"Séptimo", 8:"Octavo", 9:"Noveno", 10:"Décimo", 11:"Undécimo" };
const lista = document.getElementById("lista-clases");
lista.innerHTML = gruposClase.map((grupo, indice) => `<article class="class-card"><span class="class-level">${niveles[grupo.split("-")[0]]}</span><h2>Grupo ${grupo}</h2><p>13 estudiantes · Docente: ${encargados[indice % encargados.length]}</p><a class="button" href="academico.html?grupo=${grupo}">Ver estudiantes</a></article>`).join("");
