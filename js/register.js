let formulario = document.getElementById("formulario-login");

document.getElementById("email").addEventListener("input", validarEmail);
document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("apellido").addEventListener("input", validarApellido);
document.getElementById("contrasena").addEventListener("input", validarContrasenas);
document.getElementById("contrasena2").addEventListener("input", validarContrasenas);

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

function validarApellido() {
    const apellido = document.getElementById("apellido").value;
    const letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    if (!letrasValidas.test(apellido)) {
        document.getElementById("error-apellido").innerText = "El apellido debe contener únicamente letras válidas (A-Z).";
        document.getElementById("error-apellido").style.display = "block";
        return false;
    } else {
        document.getElementById("error-apellido").style.display = "none";
        return true;
    }
}

function validarContrasenas() {
    const contrasena = document.getElementById("contrasena").value;
    const contrasena2 = document.getElementById("contrasena2").value;
    if (contrasena !== contrasena2) {
        document.getElementById("error-contrasena2").innerText = "Las contraseñas no coinciden.";
        document.getElementById("error-contrasena2").style.display = "block";
        return false;
    } else {
        document.getElementById("error-contrasena2").style.display = "none";
        return true;
    }
}

function validarFormulario() {
    const emailValido = validarEmail();
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const contrasenasValidas = validarContrasenas();
    return emailValido && nombreValido && apellidoValido && contrasenasValidas;
}