const textoDialogo = document.getElementById("textoDialogo");
const textoPrimeraOpcion = document.getElementById("primeraOpcion");
const textoSegundaOpcion = document.getElementById("segundaOpcion");
const modalDialogo = document.getElementById("dialogoJuego");

const textoRutaBackEnd = "BACK END";
const textoRutaFrontEnd = "FRONT END";
const textoReact = "REACT";
const textoVue = "VUE";
const textoC = "C#";
const textoJava = "JAVA";


let ruta, tecnologia, objetivo, otrosLenguajes;

let preguntaARealizar = 1;
let listaTecnologias = [];
let cantidadEsferas = 0;
const almacenarValor = () => {
    cerrarDialogo();
    let res;
    if (textoPrimeraOpcion.style.opacity != "0.5") {
        res = textoPrimeraOpcion.textContent;
    } else {
        res = textoSegundaOpcion.textContent;
    }
    switch (preguntaARealizar) {
        case 1: { // Significa que estamos en la eleccion de ruta
            ruta = res;
            preguntaARealizar++;
            break;
        }
        case 2: { // Significa que estamos en la eleccion de la tecnologia
            tecnologia = res;
            preguntaARealizar++;
            break;
        }
        case 3: { // Significa que estamos preguntando si va a especializarse o ser Full Stack
            objetivo = res;
            preguntaARealizar++;
            break;
        }
        case 4: { // Preguntamos si va a agregar mas tecnologias
            if (res == "SI") {
                otrosLenguajes = true;
                if (otrosLenguajes) {
                    let ultimaTecnologia = prompt("Ingrese el lenguaje: ");
                    listaTecnologias.push(ultimaTecnologia);
                    document.getElementById("ultimaTecnologia").textContent = `Agregaste: ${ultimaTecnologia.toLocaleUpperCase()}`;
                }
                armarDialogo();
            } else {
                otrosLenguajes = false;
            }
            break;
        }
    }
    if (cantidadEsferas < 4) {
        agregarEsfera();
    }
}
function agregarEsfera() {
    let imgEsfera = document.createElement("img");
    imgEsfera.setAttribute("src", "esfera.webp");
    imgEsfera.classList.add("col-3", "d-block");
    document.getElementById("esferas").appendChild(imgEsfera);
    cantidadEsferas++;
    if(cantidadEsferas == 4){
        let esferas = document.querySelectorAll("#esferas > img");
        for (let i = 0; i < esferas.length; i++) {
            esferas[i].classList.add("brillar");
        }
    }
    borrarEsferaDelRadar();
}
function borrarEsferaDelRadar(){
    document.querySelector(`.ball${cantidadEsferas}`).remove();
}
function armarDialogo() {
    resetearEstilos();
    switch (preguntaARealizar) {
        case 1: { // Preguntar por la ruta
            textoDialogo.textContent = "Que ruta elegiras?";
            textoPrimeraOpcion.textContent = textoRutaFrontEnd;
            textoSegundaOpcion.textContent = textoRutaBackEnd;
            break;
        }
        case 2: {// Preguntar la tecnologia a utilizar
            textoDialogo.textContent = "Que tecnologia aprenderas";
            if (ruta == textoRutaFrontEnd) {
                textoPrimeraOpcion.textContent = textoReact;
                textoSegundaOpcion.textContent = textoVue;
            } else {
                textoPrimeraOpcion.textContent = textoC;
                textoSegundaOpcion.textContent = textoJava;
            }
            break;
        }
        case 3: { // No importa ruta, preguntar si se especializara en el area elegida o ser Full Stack
            textoDialogo.textContent = `Te especializaras en ${ruta} o te convertiras en Full Stack?`;
            textoPrimeraOpcion.textContent = `Me especializare en ${ruta} con ${tecnologia}`;
            textoSegundaOpcion.textContent = `Aprendere sobre ${ruta == textoRutaBackEnd ? textoRutaFrontEnd : textoRutaBackEnd} y me convertire en Full Stack`;
            break;
        }
        case 4: { // Preguntar por otras tecnologias que le gustaria aprender.
            textoDialogo.textContent = "¿Hay alguna otra tecnología que te gustaría aprender?";
            textoPrimeraOpcion.classList.add("d-flex");
            textoSegundaOpcion.classList.add("d-flex");
            textoPrimeraOpcion.textContent = "SI";
            textoSegundaOpcion.textContent = "NO";
            break;
        }
    }
    modalDialogo.showModal();
    modalDialogo.classList.add("d-flex", "flex-column", "align-items-center");
}
function resetearEstilos() {
    textoPrimeraOpcion.style.opacity = "1";
    textoPrimeraOpcion.style.border = "none";
    textoSegundaOpcion.style.opacity = "1";
    textoSegundaOpcion.style.border = "none";
}
function cerrarDialogo() {
    modalDialogo.close();
    modalDialogo.classList.remove("d-flex");
}

textoPrimeraOpcion.addEventListener("click", function () {
    textoSegundaOpcion.style.opacity = "0.5";
    textoSegundaOpcion.style.border = "none";
    textoPrimeraOpcion.style.opacity = "1";
    textoPrimeraOpcion.style.border = "1px solid black";
});

textoSegundaOpcion.addEventListener("click", function () {
    textoPrimeraOpcion.style.opacity = "0.5";
    textoPrimeraOpcion.style.border = "none";
    textoSegundaOpcion.style.opacity = "1";
    textoSegundaOpcion.style.border = "1px solid black";
});
