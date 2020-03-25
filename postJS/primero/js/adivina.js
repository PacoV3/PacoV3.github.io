const input = document.querySelector("#in");
const button = document.querySelector("#ad");
const restart = document.querySelector("#res");
let aleatorio = Math.round(Math.random() * 100);

window.onload = function() {
    input.value = "";
}

// function lee() {
//     alert(input.value);
// }

// Solo es referencia a la función ya creada, no se ejecuta
// button.addEventListener("click", lee); 
// Ahora se debe usar (e)=>{función}

button.addEventListener("click", (e)=> {
    let node = document.createElement("li");
    let textnode = document.createTextNode(input.value);
    node.appendChild(textnode);
    if(input.value < aleatorio) {
        alert("Más arriba!");
        document.getElementById("miLista").appendChild(node);
    } else if (input.value > aleatorio) {
        alert("Más abajo!");
        document.getElementById("miLista").appendChild(node);
    } else {
        // var audio = new Audio('js/media/winner.mp3');
        // audio.play();
        alert("GASTE!!");
        const nodo = document.getElementById("miLista");
        input.value = "";
        aleatorio = Math.round(Math.random() * 100);
        while (nodo.lastElementChild) {
            nodo.removeChild(nodo.lastElementChild);
        }
    }
});

restart.addEventListener("click", (e)=> {
    aleatorio = Math.round(Math.random() * 100);
    input.value = "";
    const nodo = document.getElementById("miLista");
    while (nodo.lastElementChild) {
        nodo.removeChild(nodo.lastElementChild);
    }
});