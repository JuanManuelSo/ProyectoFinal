// Credenciales de ejemplo (por el momento simulo los datos de un usuario en lugar de obtenerlos de una base de datos)
const email = "usuario@gmail.com";
const password = "contraseña123";

const form = document.getElementById('formulario');

document.getElementById("email").addEventListener("input", validarEmail);
document.getElementById("password").addEventListener("input", validarUsuario);

function validarEmail() {
    const input_email = document.getElementById("email").value;
    const validarSintaxis = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validarSintaxis.test(input_email)) { // valida que el email
        document.getElementById("error-email").innerText = "El email debe contener un @ y un dominio válido.";
        document.getElementById("error-email").style.display = "block";
        return false;
    } else {
        document.getElementById("error-email").style.display = "none";
        return true;
    }
}

function validarUsuario() {
    const input_password = document.getElementById("password").value;
    const input_email = document.getElementById("email").value;
    if (input_password !== password || input_email !== email) { // valida que el email y la contraseña ya esten registrados
        return false;
    } else {
        return true;
    }
}

form.addEventListener('submit', function(evento) {
    evento.preventDefault();// Prevenimos el envío del formulario por el momento
    
    if (validarUsuario() && validarUsuario()) {
        document.getElementById("error-login").style.display = "none";
        document.getElementById("exito-login").style.display = "block";
        document.getElementById("exito-login").innerText = "Inicio de Sesion exitoso!.";
        setTimeout(() => {
            document.getElementById("exito-login").style.display = "none";
        }, 5000); // a los 5 segundos se elimina el mensaje de exito
        form.reset(); // simula el envio del formulario
    } else {
        document.getElementById("exito-login").style.display = "none";
        document.getElementById("error-login").style.display = "block";
        document.getElementById("error-login").innerText = "Error: Email y/o contraseña incorrectos.";
        form.reset();
    }
});
