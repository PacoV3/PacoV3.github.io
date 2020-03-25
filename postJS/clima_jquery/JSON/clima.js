function corregirFecha(fecha) {
    let temporal = fecha.toString();
    temporal = temporal.slice(0,4) + "-" + temporal.slice(4,6) + "-" + temporal.slice(6);
    return temporal;
}

window.onload = (e) => {
    /* Con ajax solamente
    $.ajax ({
        url: "http://www.7timer.info/bin/civillight.php?lon=22.233105&lat=-97.861099&unit=metric&output=json&tzshift=0",
        success: function ( response ) {
            const climaAJson = JSON.parse(response);
            // ...
        }
    });
    */
    // Usando el $.get directo ( se usa .done, .fail, .always)
    $.get(
        "http://www.7timer.info/bin/civillight.php?lon=22.233105&lat=-97.861099&unit=metric&output=json&tzshift=0"
    ) .done ( function( response ) {
        const climaAJson = JSON.parse(response);
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
    
            $(pronostico).html (`<div class = 'date dato'>${esDate}</div> <div class = 'weather dato'>${weather}</div> <div class = 'min dato'>${min}</div> <div class = 'max dato'>${max}</div>`);
            // Añadir el elemento completo
            $(clima7).append(pronostico);
    
            let extras = document.createElement("div");
            extras.className = "extrasPronostico";
            if ((min + max) / 2 > 26.5) {
                $(extras).html (`<div class='txtTemperatura'>¡Hará calor!</div><img class='termometro' src="https://thumbs.dreamstime.com/b/term%C3%B3metro-que-estalla-caliente-44252591.jpg" alt="Mucho Calor en Tampico">`); 
            } else {
                $(extras).html (`<div class='txtTemperatura'>¡Hará frío!</div><img class='termometro' src="https://comps.canstockphoto.es/congelado-fr%C3%ADo-term%C3%B3metro-dibujo_csp22282395.jpg" alt="Frío en Tampico">`); 
            }
            $(clima7).append(extras);
        }
    });
};