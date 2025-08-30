let numeroUn = 1

let stringUn = "1"

let numeroTreinta = 30

let stringTreinta = "30"

let numeroDiez = 10

let stringDiez = '10'

const compararValores = (primerNombre, primerValor, segundoNombre, segundoValor) =>{
    if (primerValor == segundoValor) {
        let mensajeFinal = `Las variables ${primerNombre} y ${segundoNombre} tienen el mismo `;
        (typeof(primerValor) == typeof(segundoValor)) ? (mensajeFinal += "valor y tipo") : (mensajeFinal += "valor, pero tipos diferentes");
        console.log(mensajeFinal);
    } else {
        console.log('Las variables numeroUn y stringUn no tienen el mismo valor')
    }
}

compararValores("numeroUn", numeroUn, "stringUn", stringUn);

if (numeroTreinta === stringTreinta) {
    console.log('Las variables numeroTreinta y stringTreinta tienen el mismo valor y el mismo tipo')
} else {
    console.log('Las variables numeroTreinta y stringTreinta no tienen el mismo tipo')
}

compararValores("numeroDiez", numeroDiez, "stringDiez", stringDiez);