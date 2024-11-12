let formulario = document.getElementById("formulario-contact");

document.getElementById("email").addEventListener("input", validarEmail);
document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("mensaje").addEventListener("input", validarMensaje);

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    
    if (validarFormulario()) {
        formulario.submit();
    } else {
        console.log("Formulario inválido.");
    }
});

function validarEmail() {
    const email = document.getElementById("email").value;
    const validacionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validacionCorreo.test(email)) {
        document.getElementById("error-email").innerText = "El email debe contener un @ y un dominio válido.";
        document.getElementById("error-email").style.display = "block";
        return false;
    } else {
        document.getElementById("error-email").style.display = "none";
        return true;
    }
}

function validarNombre() {
    const nombre = document.getElementById("nombre").value;
    const letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    if (!letrasValidas.test(nombre)) {
        document.getElementById("error-nombre").innerText = "El nombre debe contener únicamente letras válidas (A-Z).";
        document.getElementById("error-nombre").style.display = "block";
        return false;
    } else {
        document.getElementById("error-nombre").style.display = "none";
        return true;
    }
}

function validarMensaje() {
    const mensaje = document.getElementById("mensaje").value.trim();
    if (mensaje.length === 0) {
        document.getElementById("error-mensaje").innerText = "El mensaje no debe estar vacío";
        document.getElementById("error-mensaje").style.display = "block";
        return false;
    } else {
        document.getElementById("error-mensaje").style.display = "none";
        return true;
    }
}

function validarFormulario() {
    const emailValido = validarEmail();
    const nombreValido = validarNombre();
    const mensajeValido = validarMensaje();
    return emailValido && nombreValido && mensajeValido;
}