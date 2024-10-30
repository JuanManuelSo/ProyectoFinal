// Credenciales de ejemplo (por el momento simulo los datos de un usuario en lugar de obtenerlos de una base de datos)
const validEmail = "usuario@gmail.com";
const validPassword = "contraseña123";

const form = document.getElementById('formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenimos el envío del formulario por el momento

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    if (email === validEmail && password === validPassword) {
        form.reset();
        document.getElementById('mensaje-error').classList.remove('mensaje_error-activo');
        document.getElementById('mensaje-exito').classList.add('mensaje_exito-activo');
        setTimeout(() => {
            document.getElementById('mensaje-exito').classList.remove('mensaje_exito-activo');
        }, 3000); // a los 3 segundos se elimina el mensaje
    } else {
        document.getElementById('mensaje-error').classList.add('mensaje_error-activo');
    }
});