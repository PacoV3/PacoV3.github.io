let json;
window.onload = (e) => {
    $.get(
        "https://pomber.github.io/covid19/timeseries.json"
    ) .done ( function( response ) {
        // response["China"]["0"]["date"];
        console.log(response["China"]);
        let txt = "";
        for (let i = 0; i < response.China.length; i++) {
            txt += `C: ${response.China[i].confirmed} D: ${response.China[i].deaths} R: ${response.China[i].recovered} </br>`;
        }
        $("#data").html(txt);
    });
};