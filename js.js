//Deffinimos los id para identificar las diferentes salas del juego
const idSalas = {"entrada": 1,
    //Los bloques del paisllo
    "pasilloA": 2,  "pasiilloB": 3, "pasilloC": 4, "pasilloD": 5,
    "sala1": 6, "sala2": 7,
    "sala3": 8, "sala4": 9, 
    "salaJefe": 10, "tienda": 11, 
    "anteSalaJefe": 12};
/*El pasillo se divide en tandos bloques como sea necesario para que las ids no entren en conflito*/

const mapa = {
    [idSalas.entrada]: {
        id: idSalas.entrada,
        descripcion: "Entrada del calabozo",
        imagenSala: "",
        ubicacion: {norte: -1, sur: -1, este: idSalas.pasilloA, oeste: -1},
        probEnemigos: 0,
    },
    //Primer tramo del pasillo, solo para direccionar a las salas
    //El primer tramo solo puede llevar a la tienda si vas hacia el norte y a sala 1 si vas hacia el sur
    //Al avanzar en el passillo ya cambias a la segunda parte del pasillo.
    [idSalas.pasilloA]: {
        id: idSalas.pasilloA,
        descripcion: "Pasillo Largo y lleno de salas a ambos lados, ¿Qué habra dentro de ellas? ",
        imagenSala: "",
        //Vas al norte tienda y sur sala 1
        ubicacion: {norte: idSalas.tienda, sur: idSalas.sala1, este: idSalas.entrada, oeste: idSalas.pasiilloB},
        probEnemigos: 0,
    },

    [idSalas.tienda]: {
        id: idSalas.tienda,
        descripcion: "Tienda",
        imagenSala: "",
        //Si vas al sur vuelves al pasillo, la sala no tiene salidas.
        ubicacion: {norte: -1, sur: idSalas.pasilloA, este: -1, oeste: -1},
        probEnemigos: 0,
    },
    [idSalas.sala1]: {
        id: idSalas.sala1,
        descripcion: "Sala 1",
        imagenSala: "",
        //Para salir de la sala, vas al sury vuelves al pasillo, no hay mas salidas
        ubicacion: {norte: idSalas.pasilloA, sur: -1, este: -1, oeste: -1},
        probEnemigos: 0.5,
    },
    //Aqui ya estamos en el bloque B de pasillo.
    [idSalas.sala2]: {
        id: idSalas.sala2,
        descripcion: "Sala 2",
        imagenSala: "",
        
        ubicacion: {norte: -1, sur: idSalas.pasiilloB, este: -1, oeste: -1},
        probEnemigos: 0.5,
    },
    [idSalas.sala3]: {
        id: idSalas.sala3,
        descripcion: "Sala 3",
        imagenSala: "",
        ubicacion: {norte: idSalas.pasiilloB, sur: -1, este: -1, oeste: -1},
        probEnemigos: 0.5,
    },
    [idSalas.pasiilloB]: {
        id: idSalas.pasiilloB,
        descripcion: "Pasillo Largo y lleno de salas a ambos lados, ¿Qué habra dentro de ellas? ",
        imagenSala: "",
        //Al final del pasillo es la sala 4 y para volver al vuelves al pasillo A
        ubicacion: {norte: -1, sur: -1, este: idSalas.pasilloA, oeste: idSalas.sala4},
        probEnemigos: 0,
    },
    
    [idSalas.sala4]: {
        id: idSalas.sala4,
        descripcion: "Sala 4",
        imagenSala: "",
        ubicacion: {norte: -1, sur: idSalas.pasilloC, este: idSalas.pasiilloB, oeste: -1},
        probEnemigos: 0.5,
    },
    [idSalas.pasilloC]: {
        id: idSalas.pasilloC,
        descripcion: "Pasillo Largo y lleno de salas a ambos lados, ¿Qué habra dentro de ellas? ",
        imagenSala: "",
        //Al final del pasillo es la sala 4 y para volver al vuelves al pasillo A
        ubicacion: {norte: idSalas.sala4, sur: idSalas.anteSalaJefe, este: -1, oeste: -1},
        probEnemigos: 0,
    },
    [idSalas.anteSalaJefe]: {
        id: idSalas.anteSalaJefe,
        descripcion: "Ante Sala del Jefe",
        imagenSala: "",
        ubicacion: {norte: idSalas.pasilloC, sur: -1, este: -1, oeste: idSalas.pasilloD},
        probEnemigos: 0.5,
    },
    [idSalas.pasilloD]: {
        id: idSalas.pasilloD,
        descripcion: "Pasillo Largo y lleno de salas a ambos lados, ¿Qué habra dentro de ellas? ",
        imagenSala: "",
        //Al final del pasillo es la sala 4 y para volver al vuelves al pasillo A
        ubicacion: {norte: -1, sur: -1, este: idSalas.anteSalaJefe, oeste: idSalas.salaJefe},
        probEnemigos: 0,
    },
    [idSalas.salaJefe]: {
        id: idSalas.salaJefe,
        descripcion: "Sala del Jefe",
        imagenSala: "",
        ubicacion: {norte: -1, sur: -1, este: idSalas.anteSalaJefe, oeste: -1 },
        probEnemigos: 1,
    },
    
    
}
//Fin del mapa.

//Definir el estado personaje del jugador.

const personajeEstadoMapa = {
    salaActual: idSalas.entrada, //empezamos en la entrada
    //Aqui se puede añadir los atributos
    
}

function mostrarSala() {
    //mostrar la sala al arrancar el juego -> sala actual es la entrada
    const sala = mapa[personajeEstadoMapa.salaActual];

    //Templates para ver donde estas en cada momento.

    console.log(`Estas en la sala: ${sala.descripcion}`);

    //Mostramos las posibles salidas de la sala.

    console.log(`Salidas disponibles:`);
    const salidas = "Salidas: ";
    //Recorremos las direcciones de la sala para comprobar cuales son las salidas disponibles.
    for (let direccion in sala.ubicacion){
        //En cada direccion comprobamos si hay una salida, si no es -1, hay una salida en esa direccion.
        //Si hay una salida, la añadimos a las salidas disponibles.
        if (sala.ubicacion[direccion] !== -1){
            salidas += ` ${direccion}`;
        }
    }
    //Mostramos las salidas disponibles.
    console.log(salidas);

}