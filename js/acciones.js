
//Importamos el mapa y los id de las salas 
import { idSalas, mapa } from './mapa.js';


//Defimmos las rutas de todas las salas
const rutasSalas = {
    entrada: '../salas/entrada.html',
    pasilloA: '../salas/pasilloA.html',
    pasilloB: '../salas/pasilloB.html',
    pasilloC: '../salas/pasilloC.html',
    pasilloD: '../salas/pasilloD.html',
    sala1: '../salas/sala1.html',
    sala2: '../salas/sala2.html',
    sala3: '../salas/sala3.html',
    sala4: '../salas/sala4.html',
    salaJefe: '../salas/salaJefe.html',
    tienda: '../salas/tienda.html',
    anteSalaJefe: '../salas/salaSemiBoos.html'
};

//Definimos los alias de las direcciones para movernos por consola
const aliasDirecciones = {
    norte: 'norte',
    arriba: 'norte',
    sur: 'sur',
    abajo: 'sur',
    este: 'este',
    derecha: 'este',
    oeste: 'oeste',
    izquierda: 'oeste'
};

//Definimos los alias de las salas para movernos por consola.
const aliasSalas = {
    entrada: 'entrada',
    tienda: 'tienda',
    pasilloa: 'pasilloA',
    pasillob: 'pasilloB',
    pasilloc: 'pasilloC',
    pasillod: 'pasilloD',
    pasillo: 'pasilloA',
    sala1: 'sala1',
    sala2: 'sala2',
    sala3: 'sala3',
    sala4: 'sala4',
    jefe: 'salaJefe',
    salajefe: 'salaJefe',
    trono: 'salaJefe',
    antesalajefe: 'anteSalaJefe',
    santuario: 'anteSalaJefe'
};

const personajeEstadoMapa = {
    salaActual: idSalas.entrada,
    //empezamos en la entrada
    //Aqui se puede añadir los atributos
}

//Funcion para normalizar el comando introducido por el usuario
function normalizarComando(valor) {
    return valor
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/^ir\s+/, '')
        .replace(/\s+/g, '');
    /*Estas funciones no las comento ya que las veo que son autoexplicativas */
}


//Esta funcion recibe la sala que estamos y el comando normalizado
function obtenerDestinoPorComando(sala, comandoNormalizado) {
    const direccion = aliasDirecciones[comandoNormalizado];

    if (direccion) {
        return sala.ubicacion[direccion];
    }
    //
    const coincidencias = [];

    for (let direccionDisponible in sala.ubicacion) {
        const destinoId = sala.ubicacion[direccionDisponible];

        if (destinoId === -1) {
            continue;
        }

        const claveDestino = Object.keys(idSalas).find((clave) => idSalas[clave] === destinoId);
        const nombreDestino = mapa[destinoId]?.nombre;
        const aliasDestino = aliasSalas[comandoNormalizado];

        const coincideConClave = claveDestino && normalizarComando(claveDestino) === comandoNormalizado;
        const coincideConNombre = nombreDestino && normalizarComando(nombreDestino) === comandoNormalizado;
        const coincideConAlias = aliasDestino && claveDestino === aliasDestino;

        if (coincideConClave || coincideConNombre || coincideConAlias) {
            coincidencias.push(destinoId);
        }
    }

    if (coincidencias.length > 1) {
        return 'ambigua';
    }

    if (coincidencias.length === 1) {
        return coincidencias[0];
    }

    if (aliasSalas[comandoNormalizado]) {
        return -1;
    }

    return null;
}

//Funcion para obtener la ruta de la sala destino a partir del id de la sala destino
function obtenerRutaSala(destinoId) {
    const claveSala = Object.keys(idSalas).find((clave) => idSalas[clave] === destinoId);

    if (!claveSala) {
        return null;
    }

    return rutasSalas[claveSala] ?? null;
}

//Funcion para actualizar el historial de movimientos del jugador
//Esto aun no se renderiza en el html, ver como lo pongo
function actualizarHistorial(mensaje) {
    const historial = document.getElementById('historial');

    if (!historial) {
        return;
    }

    const linea = document.createElement('p');
    linea.textContent = mensaje;
    historial.prepend(linea);
}

//Esto es un for muy reducido, que muestra todas las direcciones disponibles de la sala.
function obtenerSalidasDisponibles(sala) {
    return Object.keys(sala.ubicacion).filter((direccion) => sala.ubicacion[direccion] !== -1);
}

export function configurarMovimientoPorComando() {
    const inputComando = document.getElementById('comando');
    const salaActual = document.querySelector('main')?.id;

    if (!inputComando || !salaActual || !(salaActual in idSalas)) {
        return;
    }

    inputComando.addEventListener('keydown', (event) => {
        //Si presiona enter, se procesa el comando
        if (event.key !== 'Enter') {
            return;
        }

        //Prevenimos que el formulario se envie y la pagina se recargue
        event.preventDefault();


        //Normalizamos el comando introducido por el usuario
        const comandoNormalizado = normalizarComando(inputComando.value);
        const salaId = idSalas[salaActual];
        const sala = mapa[salaId];


        if (!comandoNormalizado) {
            actualizarHistorial('Escribe una direccion o una sala antes de moverte.');
            return;
        }

        const destinoId = obtenerDestinoPorComando(sala, comandoNormalizado);

        if (destinoId === null) {
            actualizarHistorial(`No entiendo el comando "${inputComando.value}".`);
            return;
        }

        if (destinoId === 'ambigua') {
            actualizarHistorial('Hay varias salidas con ese nombre. Usa norte, sur, este u oeste.');
            return;
        }

        if (destinoId === -1) {
            actualizarHistorial('Te has topado con una pared amigo, no estas en Hogwarts rey.');
            return;
        }

        const rutaDestino = obtenerRutaSala(destinoId);

        if (!rutaDestino) {
            actualizarHistorial('La sala destino no tiene una pagina asociada.');
            return;
        }

        actualizarHistorial(`Te mueves hacia ${inputComando.value}.`);
        inputComando.value = '';
        window.location.href = rutaDestino;
    });
}

export function mostrarSala() {
    //mostrar la sala al arrancar el juego -> sala actual es la entrada
    const salaActual = document.querySelector("main").id; //Esto selecciona el id del main, que es la sala en la que se encuentra.
    const salaId = idSalas[salaActual]; //Obtenemos el id de la sala actual a partir del idSalas
    const sala = mapa[salaId]; //Obtenemos la sala actual a partir del mapa y el id de la sala.

    //Aqui podemos ver en que sala nos encontramos.
    document.getElementById("nombreSala").textContent = sala.nombre; //Mostramos el nombre de la sala en el titulo.
    document.getElementById("descripcionSala").textContent = sala.descripcion; //Mostramos la descripcion de la sala en el parrafo.



    const salidasDisponibles = obtenerSalidasDisponibles(sala);

    if (salidasDisponibles.length > 0 && sala.nombre !== "Pasillo") {
        document.getElementById("descripcionSala").textContent += ` Salidas disponibles: ${salidasDisponibles.join(', ')}.`;
    }

    /*Aqui lo que hacemos como tenemos varios pasillos es un bucle que nos diga a donde pdemos ir */
    if (sala.nombre === "Pasillo") {
        let descripcionSala = "";


        for (let direccion in sala.ubicacion) {
            //Obtenermos la sala a la que se puede ir; 
            //Esto lo hago para comprobar si es tienda o no.
            const destino = sala.ubicacion[direccion];
            /*Vale entonces aqui tiene que ir en orden: 1º comprueba si es tienda: 2º si es pasillo si 3º resto */

            if (destino === idSalas.tienda) {
                descripcionSala += ` Hay una puerta al ${direccion} que lleva a la tienda, `;
            } else if (destino === idSalas.entrada) {
                descripcionSala += ` Hay una puerta al ${direccion} que vuelve a la entrada, `;
            } else if ([idSalas.pasilloA, idSalas.pasilloB, idSalas.pasilloC, idSalas.pasilloD].includes(destino)) {
                descripcionSala += ` puedes continuar por el ${direccion} que lleva a otro pasillo, `;
            } else if (destino !== -1) {
                descripcionSala += ` Hay una puerta al ${direccion} que lleva a otra sala, `;
            } else {
                descripcionSala += ` Te has topado con una pared al ${direccion}`;
            }
           
        }
        document.getElementById("descripcionSala").textContent = descripcionSala;
    }

}
