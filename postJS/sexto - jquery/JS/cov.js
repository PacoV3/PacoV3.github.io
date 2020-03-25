// https://coronavirus-19-api.herokuapp.com/all
$( "#refresh" ).on( "click", (e) => {
    $.ajax ({
        type: 'GET',
        url: 'https://coronavirus-19-api.herokuapp.com/all',
        success: function ( response ) {
            let a = response;
            // Aquí ya está la información
            $( ".hola" ).html( "Casos globales: " + a.cases + " Muertes: " + a.deaths + " Recuperados " + a.recovered );
        }
    });
});