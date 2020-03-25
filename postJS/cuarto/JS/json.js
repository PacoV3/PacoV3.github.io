const btRecibir = document.querySelector("#jsonAstr");
const btMandar = document.querySelector("#srtAjson");

const inPrimerNombre = document.querySelector("#fname");
const inApellido = document.querySelector("#lname");
const inEdad = document.querySelector("#edad");
const inCorreo = document.querySelector("#correo");

const cajabox = document.querySelector("#w3mission");

btRecibir.addEventListener("click", (e)=> {
    cajabox.textContent = "";
    let inJson = { nombre: inPrimerNombre.value, apellido: inApellido.value, edad: inEdad.value, correo: inCorreo.value };
    let strJson = JSON.stringify(inJson);
    cajabox.value = strJson;  
});

btMandar.addEventListener("click", (e)=> {
    let outJson;
    if (cajabox.value === "") {
        outJson = { nombre: "", apellido: "", edad: "", correo:""};
    } else {
        let strJson = cajabox.value;
        outJson = JSON.parse(strJson);
    }
    inPrimerNombre.value = outJson.nombre;
    inApellido.value = outJson.apellido;
    inEdad.value = outJson.edad;
    inCorreo.value = outJson.correo;
});