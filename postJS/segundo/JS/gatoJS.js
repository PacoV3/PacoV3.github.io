let turno = true; // Cambiar X a O y O a X
let vals = Array(9); // Arreglo de 9 elementos (unsigned)
let ronda = 0; // ¿Qué ronda se está jugando?

// Cuenta de cada jugador
let cuentaX = 0;
let cuentaO = 0;

// Spans de conteo
const labelX = document.querySelector("#Xcount");
const labelO = document.querySelector("#Ocount");
const labelEstado = document.querySelector("#estado");

// Btn para reiniciar
const bttnReiniciar = document.querySelector("#reinicio");
// Victoria
let victoria = false;

// Seleccionar todos los elementos dentro de una clase
const bttns = document.querySelectorAll(".cuadro_hijo");

// Hacer el primer movimiento
window.onload = function() {
    mejorMovimiento("X");
}

// Función para revisar el arreglo
function checkWinOf(XandOarray, XorO) {
    let count = 0;
    // Revisar horizontales
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (XandOarray[j + (i * 3)] === XorO)
                count++;
            if (count === 3)
                return true;
        }
        count = 0;
    }
    // Revisar verticales
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (XandOarray[i + (j * 3)] === XorO)
                count++;
            if (count === 3)
                return true;
        }
        count = 0;
    }
    // Revisar diagonales
    if (XandOarray[4] === XorO) {
        for (let i = 0; i < 2; i++) {
            if (XandOarray[2 + (i * 4)] === XorO)
                count++;
            if (count === 2)
                return true;
        }
        count = 0;
        for (let i = 0; i < 2; i++) {
            if (XandOarray[i * 8] === XorO)
                count++;
            if (count === 2)
                return true;
        }
    }
    return false;
}

/*
    Función para revisar victoria
    * Si gana "O" -> return -1;
    * Si gana "X" -> return 1;
    * Si gana hay empate -> return 0;
*/
function revisarVictoria(tempVals) {
    if (checkWinOf(tempVals, "O")) {
        // Victoria de O
        return -1;
    } else if (checkWinOf(tempVals, "X")) {
        // Victoria de X
        return 1;
    } else if (ronda === 9) {
        // Empate
        return 0;
    } else {
        // Nada
        return null;
    }
}

function revisarVictoriaEventos() {
    // Revisar desde la ronda 4 porque no se puede ganar desde antes
    if (ronda >= 4) {
        let ganador = revisarVictoria(vals);
        if (ganador !== null) {
            victoria = !victoria;
            bttnReiniciar.disabled = false;
            ronda = 0;
        }
        if (ganador === 1) {
            labelX.innerHTML = "X: " + ++cuentaX;
            labelEstado.innerHTML = "Estado: Ganó X"; 
        } else if (ganador === -1) {
            labelO.innerHTML = "O: " + ++cuentaO;
            labelEstado.innerHTML = "Estado: Ganó O"; 
        } else if (ganador === 0) {
            labelEstado.innerHTML = "Estado: Empate"; 
        }
    }
}

// Bttn reiniciar el juego
bttnReiniciar.addEventListener("click", (e)=> {
    for(let i = 0; i < bttns.length; i++) {
        bttns[i].innerHTML = "";
    }
    labelEstado.innerHTML = "Estado: En juego"; 
    victoria ? victoria = !victoria : false ;
    turno = true;
    ronda = 0;
    e.target.disabled = true;
    vals = Array(9);
    mejorMovimiento("X");
});

// Función para saber el mejor movimiento
function mejorMovimiento(XorO) {
    let movimiento;
    let mejorPuntaje = -Infinity;
    for (let i = 0; i < vals.length; i++) {
        if (vals[i] === undefined) {
            vals[i] = XorO;
            let score = minimax(vals, 0, false);
            vals[i] = undefined;
            if (score > mejorPuntaje) {
                mejorPuntaje = score;
                movimiento = i;
            }
        }
    }
    if (movimiento !== undefined) {
        vals[movimiento] = XorO;
        bttns[movimiento].innerHTML = vals[movimiento];
        ++ronda;
    }
}

// Función minimax
// tablas es solo una copia del array
// repeticiones es el nivel en el árbol
// isMax determina si revisamos una jugada para X o O
function minimax(tablas, repeticiones, isMax) {
    let estado = revisarVictoria(tablas);
    if (estado !== null) {
        return estado;
    }
    if (isMax) {
        let mejorMovimiento = -Infinity;
        for (let i = 0; i < tablas.length; i++) {
            if (tablas[i] === undefined) {
                tablas[i] = "X";
                let score = minimax(tablas, repeticiones + 1, !isMax);
                vals[i] = undefined;
                mejorMovimiento = Math.max(score, mejorMovimiento);
            }
        }
        return mejorMovimiento;
    } else {
        let mejorMovimiento = Infinity;
        for (let i = 0; i < tablas.length; i++) {
            if (tablas[i] === undefined) {
                tablas[i] = "O";
                let score = minimax(tablas, repeticiones + 1, !isMax);
                vals[i] = undefined;
                mejorMovimiento = Math.min(score, mejorMovimiento);
            }
        }
        return mejorMovimiento;
    }
}

// Recorrer todos los botones y asignarles el mismo evento
for(let i = 0; i < bttns.length; i++) {
    // Al elemento dentro de botones se le añade el evento
    bttns[i].addEventListener("click", (e)=> {
        // e.target para referirse al bttn actual
        if (turno && (e.target.innerHTML === "") && !victoria) {
            // Turno normal del jugador
            e.target.innerHTML = "O";
            vals[i] = "O";
            ++ronda;
            revisarVictoriaEventos(vals);
            // Seguido del input O se busca hacer un movimiento
            mejorMovimiento("X");
            revisarVictoriaEventos(vals);
        }
        if (ronda === 9) {
            bttnReiniciar.disabled = false;
        }
    });
}