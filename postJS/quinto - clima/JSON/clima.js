// const datos_Clima = '{ "product" : "civillight" , "init" : "2020031312" , "dataseries" : [ { "date" : 20200313, "weather" : "cloudy", "temp2m" : { "max" : 24, "min" : 21 }, "wind10m_max" : 2 }, { "date" : 20200314, "weather" : "pcloudy", "temp2m" : { "max" : 35, "min" : 21 }, "wind10m_max" : 2 }, { "date" : 20200315, "weather" : "cloudy", "temp2m" : { "max" : 35, "min" : 22 }, "wind10m_max" : 2 }, { "date" : 20200316, "weather" : "lightrain", "temp2m" : { "max" : 29, "min" : 22 }, "wind10m_max" : 2 }, { "date" : 20200317, "weather" : "cloudy", "temp2m" : { "max" : 31, "min" : 22 }, "wind10m_max" : 2 }, { "date" : 20200318, "weather" : "cloudy", "temp2m" : { "max" : 35, "min" : 22 }, "wind10m_max" : 2 }, { "date" : 20200319, "weather" : "cloudy", "temp2m" : { "max" : 30, "min" : 22 }, "wind10m_max" : 2 } ] }';

const clima7 = document.querySelector("#clima7");

let request = new XMLHttpRequest;
request.addEventListener("load", (e)=>{
    const climaAJson = JSON.parse(request.responseText);
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    
    for (let i = 0; i < climaAJson.dataseries.length; i++) {
        
        // Cambiar fecha a un formato yyyy-mm-dd
        let date = new Date(corregirFecha(climaAJson.dataseries[i].date));
        // Ponerla en español
        let esDate = date.toLocaleDateString("es-ES", options);
        // Iniciar con mayuscula
        //esDate = esDate[0].toUpperCase() + esDate.slice(1);
        let weather = climaAJson.dataseries[i].weather;
        // Cambiar el nombre del clima y el icono
        switch (weather) {
            case "pcloudy":
                weather = "parcialmente nublado";
                break;
            case "cloudy":
                weather = "nublado";
                break;
            case "ts":
                weather = "con tromentas eléctricas";
                break;
            case "rain":
                weather = "lluvioso";
                break;
            default:
                weather = "DESCONOCIDO";
                break;
        }
        
        // Tomar temperaturas
        let min = climaAJson.dataseries[i].temp2m.min;
        let max = climaAJson.dataseries[i].temp2m.max;
    
        let pronostico = document.createElement("div");
        pronostico.className = "datosPronostico";

        pronostico.innerHTML = `<div class = 'date dato'>${esDate}</div> <div class = 'weather dato'>${weather}</div> <div class = 'min dato'>${min}</div> <div class = 'max dato'>${max}</div>`;
        // Añadir el elemento completo
        clima7.appendChild(pronostico);

        let extras = document.createElement("div");
        extras.className = "extrasPronostico";
        if ((min + max) / 2 > 26.5) {
            extras.innerHTML = `<div class='txtTemperatura'>¡Hará calor!</div><img class='termometro' src="https://media.istockphoto.com/vectors/hot-bursting-thermometer-vector-id517092453" alt="Mucho Calor en Tampico">`; 
        } else {
            extras.innerHTML = `<div class='txtTemperatura'>¡Hará frío!</div><img class='termometro' src="https://previews.123rf.com/images/krisdog/krisdog1409/krisdog140900126/31812831-una-ilustraci%C3%B3n-de-un-term%C3%B3metro-congelado-fr%C3%ADo-en-baja-temperatura-con-hielo-nieve-y-estalactitas.jpg" alt="Frío en Tampico">`; 
        }
        clima7.appendChild(extras);
    }
});

request.open("GET", "http://www.7timer.info/bin/civillight.php?lon=-102&lat=23&unit=metric&output=json&tzshift=0");
request.send();

function corregirFecha(fecha) {
    let temporal = fecha.toString();
    temporal = temporal.slice(0,4) + "-" + temporal.slice(4,6) + "-" + temporal.slice(6);
    return temporal;
}