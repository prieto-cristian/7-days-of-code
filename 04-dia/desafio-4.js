let numeroAEncontrar = Math.floor(Math.random() * 10) + 1;
console.log(numeroAEncontrar);
let valorIngresado;
let intentosUtilizados = 0;
let listaDeNumerosIntentados = [];
let listaNumeroPokemonEliminado = [];

const dialogoResultado = document.getElementById("resultado");

const comprobarIntento = () => {
    valorIngresado = document.getElementById('campoNumero').value;
    if ((intentosUtilizados <= 3) && (verificarNumero(valorIngresado))) {
        listaDeNumerosIntentados.push(valorIngresado);
        intentosUtilizados++;
        intentarAtrapar(valorIngresado);
        if (valorIngresado == numeroAEncontrar) {
            setTimeout(mostrarResultado, 1700);
            deshabilitarBoton();
        } else {
            if (intentosUtilizados == 3) {
                deshabilitarBoton();
                setTimeout(mostrarPikachuCorrecto, 1700);
            }
            setTimeout(desaparecerPikachu, 1700);
        }

    }
    document.getElementById('campoNumero').value = "";
}
function mostrarPikachuCorrecto() {
    let textoNumeroPokemon = document.querySelector(".resultado__numeroPokemon");
    textoNumeroPokemon.textContent = `Numero: ${numeroAEncontrar}`;
    dialogoResultado.showModal();
    dialogoResultado.style.display = "flex";
    let parrafo = document.querySelector(".resultado__texto");
    parrafo.textContent = `Agotaste tus 3 intentos, el pikachu correcto era el numero: ${numeroAEncontrar}`;
}
function desaparecerPikachu() {
    // Seleccionar el pikachuIncorrecto y eliminarlo
    const pikachu = document.getElementById(`p-${valorIngresado}`);
    const imagenPikachu = document.querySelector(`#p-${valorIngresado} > img`);
    imagenPikachu.setAttribute("src", "./assets/emojiDesapareciendo.gif");
    setTimeout(() => {
        pikachu.remove();
    }, 1500);
    listaNumeroPokemonEliminado.push(valorIngresado);
}
function mostrarResultado() {
    let textoNumeroPokemon = document.querySelector(`.resultado__numeroPokemon`);
    textoNumeroPokemon.textContent = `Numero: ${numeroAEncontrar}`;
    dialogoResultado.showModal();
    dialogoResultado.style.display = "flex";
    let parrafo = document.querySelector(".resultado__texto");
    parrafo.textContent = "🎉​​Felicitaciones, encontraste al pikachu correcto🎊";
}
function cerrarModal() {
    dialogoResultado.close();
    dialogoResultado.style.display = "none";
}
function verificarNumero(numero) {
    if(numero == ""){
        alert(`El campo no puede estar vacio, Ingrese un numero`);
        return false;
    }
    else if(numero < 1 || numero > 10){
        alert(`El numero ${numero} no entra en el rango`);
            return false;
    }
    else if(listaDeNumerosIntentados.includes(numero)){
        alert(`Ya ingresaste el numero: ${numero}`);
        return false;
    }else{
        return true;
    }
}
function deshabilitarBoton() {
    document.querySelector(".cabinaControl__botones > .cabinaControl__boton:first-child").setAttribute("disabled", "true");
}
function habilitarBoton() {
    document.querySelector(".cabinaControl__botones > .cabinaControl__boton:first-child").removeAttribute("disabled");
}
function limpiarCaja() {
    document.querySelector("input").value = "";
}
function reiniciarJuego() {
    intentosUtilizados = 0;
    habilitarBoton();
    numeroAEncontrar = Math.floor(Math.random() * 10) + 1;
    limpiarCaja();
    colocarPikachusBorrados();
    listaDeNumerosIntentados = [];
    listaNumeroPokemonEliminado = [];
}

function colocarPikachusBorrados() {
    // Ordena los numeros para hacer una insercion facil luego
    listaNumeroPokemonEliminado.sort();
    listaNumeroPokemonEliminado.forEach(element => {
        let articlePokemon = document.createElement("article");
        articlePokemon.id = `p-${element}`;
        articlePokemon.classList.add("pikachu");
        let imgPokemon = document.createElement("img");
        imgPokemon.setAttribute("src", "./assets/pikachu.gif");
        imgPokemon.setAttribute("width", "80px");
        imgPokemon.setAttribute("alt", "imagen de pikachu");
        let parrafoPokemon = document.createElement("p");
        parrafoPokemon.textContent = `Numero: ${element}`;
        articlePokemon.appendChild(imgPokemon);
        articlePokemon.appendChild(parrafoPokemon);
        // Si es el numero 1 lo agrega al principio
        if (element == 1) {
            document.querySelector(".tablero").insertAdjacentElement("afterbegin", articlePokemon);
        }
        // Para cualquier otro numero siempre tendra antecesor.
        else{
            document.getElementById(`p-${element -1}`).insertAdjacentElement("afterend", articlePokemon);
        }
    })
}
function intentarAtrapar(numeroIngresado) {
    const pikachu = document.querySelector(`#p-${numeroIngresado}`);
    const rect = pikachu.getBoundingClientRect();
    document.querySelector(".pokeball").animate(
        [
            {
                display: "block",
                left: `${rect.left}px`,
            },
            {
                top: `${rect.top}px`,
                left: `${rect.left}px`,
            },
        ],
        {
            duration: 1700,
        }
    )
}