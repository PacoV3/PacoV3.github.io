// Todos los bttns
const bttnIniciar = document.querySelector("#bttniniciar");
const bttnDetener = document.querySelector("#bttnDetener");
const bttnReanudar = document.querySelector("#bttnReanudar");
const bttnRestablecer = document.querySelector("#bttnRestablecer");
const bttnVuelta = document.querySelector("#bttnVuelta");
let lista = document.querySelector("#miLista");

// Arreglos con los valores de tiempo
const contador = document.querySelectorAll(".tiempoContador");
const vuelta = document.querySelectorAll(".tiempoVuelta");

// Variable para determinar si se cuenta o no
let contando = false;
let reinicio = false;

// Variable que tendrá el tiempo en ms.
let cero = 0;
let tiempo = cero, tiempoVuelta = cero;

////////// Eventos //////////
bttnIniciar.addEventListener("click", (e)=> {
    contando = true;
    iniciarTiempo();
    bttnIniciar.style.display = "none";
    bttnDetener.style.display = "inline";
    bttnVuelta.style.display = "inline";
});

bttnReanudar.addEventListener("click", (e)=> {
    contando = true;
    iniciarTiempo();
    bttnRestablecer.style.display = "none";
    bttnReanudar.style.display = "none";
    bttnDetener.style.display = "inline";
    bttnVuelta.style.display = "inline";
});

bttnDetener.addEventListener("click", (e)=> {
    contando = false;
    bttnVuelta.style.display = "none";
    bttnDetener.style.display = "none";
    bttnReanudar.style.display = "inline";
    bttnRestablecer.style.display = "inline";
});

bttnRestablecer.addEventListener("click", (e)=> {
    contando = false;
    reinicio = true;
    tiempo = 0;
    iniciarTiempo();
    bttnReanudar.style.display = "none";
    bttnDetener.style.display = "none";
    bttnIniciar.style.display = "inline";
    bttnRestablecer.style.display = "none";
    while (lista.lastElementChild) {
        lista.removeChild(lista.lastElementChild);
    }
});

bttnVuelta.addEventListener("click", (e) => {
    let min, s, ms;
    limpiarValores(vuelta);

    ms = tiempoVuelta % 1000;
    s = Math.floor(tiempoVuelta / 1000) % 60;
    min = Math.floor(tiempoVuelta / 60000) % 60;
    tiempoVuelta = 0;

    let datosVuelta = dosDigitos(min.toString()) + " min "
                    + dosDigitos(s.toString()) + " seg "
                    + tresDigitos(ms.toString()) + " ms ";

    let node = document.createElement("li");
    let textnode = document.createTextNode(datosVuelta);
    node.appendChild(textnode);
    lista.appendChild(node);
});

// Poner todos los elementos en 0 con su respectivo formato
function limpiarValores(arregloDatos) {
    cambiarTiempoDe(arregloDatos, 0, 0, 0);
}

limpiarValores(vuelta);
limpiarValores(contador);

// Funciones para dar formato
function dosDigitos(value) { if (value.length < 2) { value = "0" + value; } return value; }
function tresDigitos(value) { if (value.length < 3) { value.length === 2 ? value = "0" + value : value = "00" + value; return value; } else { return value; } }

// Función principal para el setTimeout
function iniciarTiempo() {
    let msContador, sContador, minContador;
    let msVuelta, sVuelta, minVuelta;
    // tiempo siempre tiene el valor del tiempo total
    if (contando) {
        ++tiempo;
        msContador = tiempo % 1000;
        sContador = Math.floor(tiempo / 1000) % 60;
        minContador = Math.floor(tiempo / 60000) % 60;
        cambiarTiempoDe(contador, msContador, sContador, minContador);
        
        msVuelta = tiempoVuelta % 1000;
        sVuelta = Math.floor(tiempoVuelta / 1000) % 60;
        minVuelta = Math.floor(tiempoVuelta / 60000) % 60;
        ++tiempoVuelta;
        cambiarTiempoDe(vuelta, msVuelta, sVuelta, minVuelta);
        setTimeout(iniciarTiempo, 1);
    }
    if (reinicio) {
        limpiarValores(vuelta);
        limpiarValores(contador);
        reinicio = false;
    }
}

// Función para cambiar los valores
function cambiarTiempoDe(arregloElementos, ms, s, min) {
    arregloElementos[0].textContent = dosDigitos(min.toString()) + " ";
    arregloElementos[1].textContent = dosDigitos(s.toString()) + " ";
    arregloElementos[2].textContent = tresDigitos(ms.toString()) + " ";
}

// Si se debe contar activa el Timeout
if (contando) {
    iniciarTiempo();
}