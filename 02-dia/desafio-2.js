function mostrarInformacion(){
    let nombre, edad, lenguaje;
    nombre = document.getElementById('campoNombre').value;
    edad = document.getElementById('campoAnios').value;
    lenguaje = document.getElementById('campoLenguaje').value;
    if(camposValidos(nombre, edad, lenguaje)){
        document.getElementById("resultado").textContent = `Hola ${nombre}, tienes ${edad} años y ya estás aprendiendo ${lenguaje}!`;
        document.getElementById('favDialog').showModal();    
    }else{
        alert("Debes completar todos los campos para continuar");
    }
}
function camposValidos(nombre, edad, lenguaje){
    return (nombre != "") && (edad > 0) && (lenguaje != "");
}