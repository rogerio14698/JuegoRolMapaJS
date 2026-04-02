/*Entonces vamos hacer el codigo js modular, ya que va a ser mas facil de mantener 
a largo plazo y más facil de vizualizar */


//Aqui se carga la informacion de la sala actual.
import { configurarMovimientoPorComando, mostrarSala } from './js/acciones.js';
import { renderizarTemplate } from './js/cargarTemplates.js';

//Si existen los elementos de titulo/descripcion, mostramos datos de la sala.
if (document.getElementById("nombreSala") && document.getElementById("descripcionSala")) {
	mostrarSala();
}

const btnInicio = document.getElementById("btnInicio");

//Btn de inicio del index.html que redirige a la sala de entrada.
if (btnInicio) {
	btnInicio.addEventListener("click", () => {
		window.location.href = "salas/entrada.html";
	});
}


async function iniciarPantalla() {
	await renderizarTemplate('main', '../template/templateMain.html');
	//Primero renderizamos el template, luego registramos los listeners que dependen de ese HTML.
	await renderizarTemplate('contenedor-consola', '../template/templateConsola.html');
	configurarMovimientoPorComando();
}


cargarEscenaDinámica();
iniciarPantalla();
