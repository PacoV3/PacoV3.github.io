const reloj = document.querySelector("#reloj");

function dosDigitos(value) {
    if (value.length !== 2) {
        value = "0" + value;
    }
    return value;
}

function tresDigitos(value) {
    if (value.length !== 3) {
        value.length === 2 ? value = "0" + value : value = "00" + value;
    }
    return value;
}

// Función que se encarga de modificar la fecha
function actualizaFecha() {
    let amOrpm;
    now = new Date();
    let hours;

    if ((now.getHours() - 12) >= 0) {
        now.getHours() === 12 ? hours = now.getHours() : hours = now.getHours() - 12;
        amOrpm = "p.m.";
    } else {
        if (now.getHours() === 0) {
            hours = 12;
        } else {
            hours = now.getHours();
        }
        amOrpm = "a.m.";
    }
    // Datos de tiempo
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // let milliseconds = now.getMilliseconds();
    reloj.textContent = dosDigitos(hours.toString()) + ":" + 
                        dosDigitos(minutes.toString()) + ":" + 
                        dosDigitos(seconds.toString()) + amOrpm; // + ":"
                        //tresDigitos(milliseconds.toString()) + amOrpm;

    // Llamar a setTimeout de nuevo para continuar ejecutando actualizarFecha()
    setTimeout(actualizaFecha, 1);
}
actualizaFecha();