const dialogoAgregarProducto = document.getElementById("dialogoProducto");
const campoNombreProducto = document.getElementById("campoNombre");
const opcionSinSeleccionar = document.getElementById("opcionInicial");
const cbxOpciones = document.getElementById('campoCategoria');
const ulListaTodos = document.getElementById("todos");
const ulListaEspecifica = document.getElementById("especifico");
const tituloListado = document.querySelector(".lista__hojaDerecha__listado_titulo");
const botonesFiltros = document.querySelectorAll(".hojaIzquierda__botonesFiltro > button");
const resultadoOperacion = document.getElementById("resultadoOperacion");

let colorTituloActual = "";
let opcionCategoriaActual = "-1";
let listaFrutas = ["Zanahoria"];
let listaLacteos = ["Leche", "Yogur"];
let listaCongelados = [];
let listaDulces = [];
let listaBebidas = ["Fernet", "Gancia", "Cerveza"];
let listaOtros = [];
let listaTodos = ["Zanahoria", "Leche", "Yogur", "Fernet", "Gancia", "Cerveza"];

// funcionalidad para filtrar
function mostrarLista(unaLista, nombreTitulo, claseColor) {
    let ulAModificar;
    if (nombreTitulo == "Todos") {
        // Limpiamos la lista de todos los items
        limpiarItemsVisuales(document.querySelectorAll("#todos > li"));
        ulAModificar = ulListaTodos;
        ulListaTodos.style.display = "flex";
        ulListaEspecifica.style.display = "none";
    } else {
        // Limpiamos los items visuales
        limpiarItemsVisuales(document.querySelectorAll("#especifico > li"));
        // Ocultamos la lista general
        ulListaTodos.style.display = "none";
        ulListaEspecifica.style.display = "flex";
        ulAModificar = ulListaEspecifica;
    }

    // Modificamos el titulo
    tituloListado.textContent = nombreTitulo;
    if (colorTituloActual != "") {
        tituloListado.classList.remove(colorTituloActual);
    }
    tituloListado.classList.add(claseColor);
    unaLista.forEach(element => {
        let itemElemento = crearElemento(element);
        ulAModificar.appendChild(itemElemento);
    })
    colorTituloActual = claseColor;
}
// Darle a cada boton su metodo
botonesFiltros.forEach(element => {
    switch (element.textContent) {
        case ("FRUTAS"): {
            element.addEventListener("click", () => mostrarLista(listaFrutas, "Frutas", "color-celeste"));
            break;
        }
        case ("LACTEOS"): {
            element.addEventListener("click", () => mostrarLista(listaLacteos, "Lacteos", "color-blanco"));
            break;
        }
        case ("CONGELADOS"): {
            element.addEventListener("click", () => mostrarLista(listaCongelados, "Congelados", "color-amarillo"));
            break;
        }
        case ("DULCES"): {
            element.addEventListener("click", () => mostrarLista(listaDulces, "Dulces", "color-morado"));
            break;
        }
        case ("BEBIDAS"): {
            element.addEventListener("click", () => mostrarLista(listaBebidas, "Bebidas", "color-naranja"));
            break;
        }
        case ("OTROS"): {
            element.addEventListener("click", () => mostrarLista(listaOtros, "Otros", "color-verde"));
            break;
        }
        default: {
            element.addEventListener("click", () => mostrarLista(listaTodos, "Todos", "color-negro"));
            break;
        }
    }
});
cbxOpciones.addEventListener("change", function () {
    opcionCategoriaActual = this.value;
});


function agregarProductos() {
    if (campoNombreProducto.value != "") {
        if ((opcionCategoriaActual != "-1")) {
            switch (opcionCategoriaActual) {
                case ("frutas"): {
                    listaFrutas.push(campoNombreProducto.value);
                    break;
                }
                case ("lacteos"): {
                    listaLacteos.push(campoNombreProducto.value);
                    break;
                }
                case ("congelados"): {
                    listaCongelados.push(campoNombreProducto.value);
                    break;
                }
                case ("dulces"): {
                    listaDulces.push(campoNombreProducto.value);
                    break;
                }
                case ("bebidas"): {
                    listaBebidas.push(campoNombreProducto.value);
                    break;
                }
                default: {
                    listaOtros.push(campoNombreProducto.value);
                    break;
                }
            }
            listaTodos.push(campoNombreProducto.value);
            mostrarElemento(campoNombreProducto.value);
        } else {
            alert("Debe seleccionar una categoria", "Advertencia");
        }
    } else {
        alert("Ingrese el nombre del producto", "Advertencia");
    }
}
function mostrarElemento(itemTexto) {
    // Debo crear el li
    let itemElemento = crearElemento(itemTexto);
    // Agregarlo al ul
    ulListaTodos.appendChild(itemElemento);
    // Colocar en el dialogo el texto que indica que agregamos el producto
    resultadoOperacion.textContent = `Agregamos: ${itemTexto} a la lista de compras`;
}

function crearElemento(texto) {
    let liElemento = document.createElement("li");
    let labelElemento = document.createElement("label");
    labelElemento.textContent = texto;

    let inputElemento = document.createElement("input");
    inputElemento.setAttribute("type", "checkbox");
    // Crear el boton para eliminar
    let buttonElemento = document.createElement("button");
    buttonElemento.textContent = "Eliminar";
    buttonElemento.addEventListener("click", ()=>{
        // si encontramos el valor en la lista general, significa que tambien
        // existe en alguna lista especifica.
        if(listaTodos.indexOf(texto) != -1){
            // Eliminar de la lista general
            listaTodos.splice(listaTodos.indexOf(texto), 1);
            // Encontrar la lista que contiene ese valor y elimnar el elemento
            if(listaBebidas.includes(texto)){
                listaBebidas.splice(listaBebidas.indexOf(texto), 1);
            }
            else if(listaCongelados.includes(texto)){
                listaCongelados.splice(listaCongelados.indexOf(texto), 1);
            }
            else if(listaDulces.includes(texto)){
                listaDulces.splice(listaDulces.indexOf(texto), 1);
            }
            else if(listaFrutas.includes(texto)){
                listaFrutas.splice(listaFrutas.indexOf(texto), 1);
            }
            else if(listaLacteos.includes(texto)){
                listaLacteos.splice(listaLacteos.indexOf(texto), 1);
            }
            else{
                listaOtros.splice(listaOtros.indexOf(texto), 1);
            }
            liElemento.remove();
        }else{
            alert(`No encontramos el elemento: ${texto} en ninguna lista`);
        }

    });
    // Armar
    labelElemento.appendChild(inputElemento);
    liElemento.appendChild(labelElemento);
    liElemento.appendChild(buttonElemento);
    console.log(labelElemento.textContent);
    return liElemento;
}
function abrirDialogo() {
    // Mostrar el dialogo para ingresar productos
    dialogoAgregarProducto.style.display = "flex";
}
function cerrarDialogo() {
    // Si solo agrego la propiedad selected, item vuelve al default
    // en la primera iteracion nomas. Por eso lo saco y vuelvo a meter 
    opcionSinSeleccionar.removeAttribute("selected");
    opcionSinSeleccionar.setAttribute("selected", "true");
    opcionCategoriaActual = "-1";

    // Oculto el dialogo y borro el producto escrito
    dialogoAgregarProducto.style.display = "none";
    campoNombreProducto.value = "";
    resultadoOperacion.textContent = "";
}

function limpiarListas() {
    listaFrutas = [];
    listaLacteos = [];
    listaCongelados = [];
    listaDulces = [];
    listaBebidas = [];
    listaOtros = [];
    listaTodos = [];

    let itemsListaTodos = document.querySelectorAll("#todos > li");
    let itemsListaEspecifica = document.querySelectorAll("#especifico > li");
    limpiarItemsVisuales(itemsListaTodos);
    limpiarItemsVisuales(itemsListaEspecifica);
}
function limpiarItemsVisuales(itemsLi) {
    itemsLi.forEach(element => {
        element.remove();
    });
}