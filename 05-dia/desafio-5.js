const dialogoAgregarProducto = document.getElementById("dialogoProducto");
const campoNombreProducto = document.getElementById("campoNombre");
const opcionSinSeleccionar = document.getElementById("opcionInicial");
const cbxOpciones = document.getElementById('campoCategoria');
const ulListadoItems = document.getElementById("listadoItems");
const tituloListado = document.querySelector(".lista__hojaDerecha__listado_titulo");
const botonesFiltros = document.querySelectorAll(".hojaIzquierda__botonesFiltro > button");
const resultadoOperacion = document.getElementById("resultadoOperacion");

let tituloActual = "todos";
let colorTituloActual = "";
let opcionCategoriaActual = "-1";

let listaFrutas = ["Zanahoria"];
let listaLacteos = ["Leche", "Yogur"];
let listaCongelados = [];
let listaDulces = [];
let listaBebidas = ["Fernet", "Gancia", "Cerveza"];
let listaOtros = [];
let listaTodos = ["Zanahoria", "Leche", "Yogur", "Fernet", "Gancia", "Cerveza"];

mostrarLista(listaTodos);
// funcionalidad para mostrar
function mostrarLista(unaLista) {
    // Limpiamos los items visuales
    limpiarItemsVisuales(ulListadoItems.querySelectorAll("li"));
    unaLista.forEach(element => {
        let itemElemento = crearElemento(element);
        ulListadoItems.appendChild(itemElemento);
    })
}
function configurarTituloListado(nombreTitulo, claseColor) {
    // Modificamos el titulo
    tituloListado.textContent = nombreTitulo;
    // Al iniciar el programa no tiene clase de color asignado
    if (colorTituloActual != "") {
        tituloListado.classList.remove(colorTituloActual);
    }
    tituloListado.classList.add(claseColor);
    colorTituloActual = claseColor;
    tituloActual = nombreTitulo.toLocaleLowerCase();
}
// Darle a cada boton su metodo
botonesFiltros.forEach(element => {
    switch (element.textContent) {
        case ("FRUTAS"): {
            element.addEventListener("click", () => { mostrarLista(listaFrutas); configurarTituloListado("Frutas", "color-celeste") });
            break;
        }
        case ("LACTEOS"): {
            element.addEventListener("click", () => { mostrarLista(listaLacteos); configurarTituloListado("Lacteos", "color-blanco") });
            break;
        }
        case ("CONGELADOS"): {
            element.addEventListener("click", () => { mostrarLista(listaCongelados); configurarTituloListado("Congelados", "color-amarillo") });
            break;
        }
        case ("DULCES"): {
            element.addEventListener("click", () => { mostrarLista(listaDulces); configurarTituloListado("Dulces", "color-morado") });
            break;
        }
        case ("BEBIDAS"): {
            element.addEventListener("click", () => { mostrarLista(listaBebidas); configurarTituloListado("Bebidas", "color-naranja") });
            break;
        }
        case ("OTROS"): {
            element.addEventListener("click", () => { mostrarLista(listaOtros); configurarTituloListado("Otros", "color-verde") });
            break;
        }
        default: {
            element.addEventListener("click", () => { mostrarLista(listaTodos); configurarTituloListado("Todos", "color-negro") });
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
            if(esNombreUnico(campoNombreProducto.value)){
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
                    case ("otros"): {
                        listaOtros.push(campoNombreProducto.value);
                        break;
                    }
                }
                listaTodos.push(campoNombreProducto.value);
                resultadoOperacion.textContent = `Agregamos: '${campoNombreProducto.value}' en la categoria '${opcionCategoriaActual}'. Lista de compras actualizada!`;
                // Si el titulo actual es Todos o coincide con la categoria seleccionada para el items, entonces mostramos el elemento.
                if ((tituloActual == "todos") || (tituloActual == opcionCategoriaActual)) {
                    let liElemento = crearElemento(campoNombreProducto.value);
                    ulListadoItems.appendChild(liElemento);
                }
            }else{
                alert(`El nombre: '${campoNombreProducto.value}' ya esta registrado en otro item. Por favor escriba otro nombre`, "Advertencia");
            }
        } else {
            alert("Debe seleccionar una categoria", "Advertencia");
        }
    } else {
        alert("Ingrese el nombre del producto", "Advertencia");
    }
}
// Va consultar a todas las listas especificas si ese nombre ya se encuentra en la lista
function esNombreUnico(nombre){
    return !(listaBebidas.includes(nombre) || listaCongelados.includes(nombre) || listaDulces.includes(nombre) || listaFrutas.includes(nombre) || listaLacteos.includes(nombre) || listaOtros.includes(nombre));
}

function crearElemento(texto) {
    let liElemento = document.createElement("li");
    let labelElemento = document.createElement("label");
    labelElemento.textContent = texto;

    let inputElemento = document.createElement("input");
    inputElemento.setAttribute("type", "checkbox");
    inputElemento.addEventListener("click", function(){
        if(inputElemento.checked){
            liElemento.style.textDecoration = "line-through";
        }else{
            liElemento.style.textDecoration = "none";
        }
    })
    // Crear el boton para eliminar y se le agrega el comportamiento
    let buttonElemento = document.createElement("button");
    buttonElemento.textContent = "Eliminar";
    buttonElemento.addEventListener("click", () => {
        // si encontramos el valor en la lista general, significa que tambien
        // existe en alguna lista especifica.
        if (listaTodos.indexOf(texto) != -1) {
            listaTodos.splice(listaTodos.indexOf(texto), 1);

            // Encontrar la lista que contiene ese valor y elimnar el elemento
            if (listaBebidas.includes(texto)) {
                listaBebidas.splice(listaBebidas.indexOf(texto), 1);
            }
            else if (listaCongelados.includes(texto)) {
                listaCongelados.splice(listaCongelados.indexOf(texto), 1);
            }
            else if (listaDulces.includes(texto)) {
                listaDulces.splice(listaDulces.indexOf(texto), 1);
            }
            else if (listaFrutas.includes(texto)) {
                listaFrutas.splice(listaFrutas.indexOf(texto), 1);
            }
            else if (listaLacteos.includes(texto)) {
                listaLacteos.splice(listaLacteos.indexOf(texto), 1);
            }
            else {
                listaOtros.splice(listaOtros.indexOf(texto), 1);
            }
            liElemento.remove();
        }
    });
    // Armar Elemento Visual
    labelElemento.appendChild(inputElemento);
    liElemento.appendChild(labelElemento);
    liElemento.appendChild(buttonElemento);
    return liElemento;
}
function abrirDialogo() {
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
    limpiarItemsVisuales(ulListadoItems.querySelectorAll("li"));
}
function limpiarItemsVisuales(itemsLi) {
    itemsLi.forEach(element => {
        element.remove();
    });
}