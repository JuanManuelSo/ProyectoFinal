// Credenciales de ejemplo (por el momento simulo los datos de un usuario en lugar de obtenerlos de una base de datos)

const form = document.getElementById('formulario');
const gmail = document.getElementById('gmail');
const password = document.getElementById('password');

function validarGmail() {
    const validacionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const _gmail = document.getElementById('gmail').value;
    if (!validacionCorreo.test(_gmail)) {
        document.getElementById("error-gmail").innerText = "El email debe contener un @ y un dominio válido.";
        document.getElementById("error-gmail").style.display = "block";
        return false;
    } else {
        document.getElementById("error-gmail").innerText = "";
        document.getElementById("error-email").style.display = "none";
        return true;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenimos el envío del formulario por el momento

    if (validarGmail) {
        form.submit();
    }
});

gmail.addEventListener('blur', validarGmail);