const parrafoResultado = document.getElementById("resultado");
const calculadoraPantalla = document.getElementById("pantalla");
const botonesNumericos = document.querySelectorAll(".calculadora__botones__numero");
const botonesSimboles = document.querySelectorAll(".calculadora__botones__simbolo");
const botonesOperaciones = document.querySelectorAll(".calculadora__botones__operacion");

let valorMemoria = 0;
let operacionActual = "ninguna";
let estaApagada = false;
let primerValor = 0;
let segundoValor = 0;
let mensajeMemoria = "Valor Memoria: ";

function sumar(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function restar(num1, num2) {
    return num1 - num2;
}
function multiplicar(num1, num2) {
    return num1 * num2;
}
function dividir(num1, num2) {
    return (num2 == 0) ? "No se puede dividir por cero" : (num1 / num2);
}
function apagar() {
    estaApagada = true;
    parrafoResultado.textContent = "";
    calculadoraPantalla.style.backgroundColor = "gray";
    resetearMemoria();
}
function prender() {
    estaApagada = false;
    calculadoraPantalla.style.backgroundColor = "#6f98b4";
}
function resetear() {
    parrafoResultado.textContent = "";
    operacionActual = "ninguna";
    primerValor = 0;
}
// Traer todos los botones e implementarles el metodo de presionar.
botonesSimboles.forEach(elemento => {
    elemento.addEventListener("click", function () {
        if (!estaApagada) {
            parrafoResultado.textContent += this.textContent;
        }
    });
});

botonesNumericos.forEach(elemento => {
    elemento.addEventListener("click", function () {
        if (!estaApagada) {
            parrafoResultado.textContent += elemento.textContent;
        }
    })
});

botonesOperaciones.forEach(elemento => {
    elemento.addEventListener("click", function () {
        if (!estaApagada && parrafoResultado.textContent != "" && operacionActual == "ninguna") {
            primerValor = parrafoResultado.textContent;
            operacionActual = elemento.textContent;
            parrafoResultado.textContent = "";
        }
    })
});

function mostrarResultado() {
    let res;
    if (!estaApagada && operacionActual != "ninguna" && parrafoResultado.textContent != "") {
        if (operacionActual == "x") {
            res = multiplicar(primerValor, parrafoResultado.textContent);
        }
        else if (operacionActual == "/") {
            res = dividir(primerValor, parrafoResultado.textContent);
        }
        else if (operacionActual == "+") {
            res = sumar(primerValor, parrafoResultado.textContent);
        }
        else if (operacionActual == "-") {
            res = restar(primerValor, parrafoResultado.textContent);
        }
        else {
            res = "EXPRESION NO VALIDA";
        }
        parrafoResultado.textContent = res;
        primerValor = res;
        operacionActual = "ninguna"
    }
}

// Memoria
function resetearMemoria() {
    valorMemoria = 0;
    document.getElementById("memoria__valor").textContent = mensajeMemoria + valorMemoria;
}
function sumarMemoria() {
    if (parrafoResultado.textContent != "") {
        valorMemoria += parseFloat(parrafoResultado.textContent);
        document.getElementById("memoria__valor").textContent = mensajeMemoria + valorMemoria;
    }
}
function restarMemoria() {
    if (parrafoResultado.textContent != "") {
        valorMemoria -= parseFloat(parrafoResultado.textContent);
        document.getElementById("memoria__valor").textContent = mensajeMemoria + valorMemoria;
    }
}