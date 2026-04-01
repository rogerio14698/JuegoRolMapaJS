/*Entonces vamos hacer el codigo js modular, ya que va a ser mas facil de mantener 
a largo plazo y más facil de vizualizar */


//Aqui se carga la informacion de la sala actual.
import { configurarMovimientoPorComando, mostrarSala } from './js/acciones.js';

//Si existen los elementos de titulo/descripcion, mostramos datos de la sala.
if (document.getElementById("nombreSala") && document.getElementById("descripcionSala")) {
	mostrarSala();
}

//La consola debe funcionar en cualquier sala aunque falte algun id visual.
configurarMovimientoPorComando();

const btnInicio = document.getElementById("btnInicio");

if (btnInicio) {
	btnInicio.addEventListener("click", () => {
		window.location.href = "salas/entrada.html";
	});
}

