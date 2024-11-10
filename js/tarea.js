let formulario = document.getElementById("form-container");

document.getElementById("nombre").addEventListener("input", validarNombreTarea);
document.getElementById("dia").addEventListener("input", validarFecha);
document.getElementById("mes").addEventListener("input", validarFecha);
document.getElementById("año").addEventListener("input", validarFecha);
document.getElementById("empieza").addEventListener("input", validarTiempo);
document.getElementById("termina").addEventListener("input", validarTiempo);

formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    if (validarFormularioTarea()) {
        formulario.submit(); 
    } else {
        console.log("Formulario de tarea inválido.");
    }
});

function validarNombreTarea() {
    const nombre = document.getElementById("nombre").value;
    const letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    
    if (nombre == null || nombre == '') {
        document.getElementById("error-nombre").style.display = "none";
        return false;
    } else if (!letrasValidas.test(nombre)) {
        document.getElementById("error-nombre").innerText = "El nombre debe contener únicamente letras válidas (A-Z).";
        document.getElementById("error-nombre").style.display = "block";
        return false;
    } else {
        document.getElementById("error-nombre").style.display = "none";
        return true;
    }
}

function validarFecha() {
    let diasMes = 31;
    let fechaActual = new Date();
    let listaNrosValidos = /^[0-9]+$/;
    let dia = document.getElementById("dia").value;
    let mes = document.getElementById("mes").value;
    let año = document.getElementById("año").value;
    let errores = 0;
  
    // Validar formato numérico
    if ((dia !== "" && !listaNrosValidos.test(dia)) || 
        (mes !== "" && !listaNrosValidos.test(mes)) || 
        (año !== "" && !listaNrosValidos.test(año))) {
      document.getElementById('error-año').textContent = 'Los valores de la fecha deben ser numéricos';
      document.getElementById('error-año').style.display = 'block';
      errores++;
    } else {
      document.getElementById('error-año').style.display = 'none';
    }
  
    // Determinar días del mes
    if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
      diasMes = 31;
    } else if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
      diasMes = 30;
    } else if (mes == 2) { 
      if (año % 4 == 0 && (año % 100 != 0 || año % 400 == 0)) {
        diasMes = 29;
      } else {
        diasMes = 28;
      }
    }
  
    // Validar año
    if(año == null || año == ''){
      errores++;
    }else{
      if (año < fechaActual.getFullYear()) {
        document.getElementById('error-año').textContent = 'El año no puede ser menor que el actual';
        document.getElementById('error-año').style.display = 'block'; 
        errores++;
      } else {
        document.getElementById('error-año').style.display = 'none';
      }
    }
  
    // Validar mes
    if ((mes < 1 || mes > 12) && mes != '') {
      document.getElementById('error-mes').textContent = 'El mes debe estar entre 1-12';
      document.getElementById('error-mes').style.display = 'block';
      errores++;
    } else {
      document.getElementById('error-mes').style.display = 'none';
    }
  
    // Validar día
    if (dia === "" || dia === null) {
      document.getElementById("error-dia").style.display = "none"; 
    } else if (dia < 1 || dia > diasMes) {
      document.getElementById("error-dia").innerText = `Día no válido. Asegúrese de que los valores del día son correctos (1-${diasMes}).`;
      document.getElementById("error-dia").style.display = "block";
      errores++;
    } else {
      document.getElementById("error-dia").style.display = "none";
    }

    console.log(errores === 0);
    return errores === 0; // Fecha válida
}

function validarTiempo() {
    let empieza = document.getElementById("empieza").value;
    let termina = document.getElementById("termina").value;
    
    let errorMensaje = document.getElementById("error-tiempo");
    
    errorMensaje.style.display = "none";
    errorMensaje.textContent = "";

    if (empieza === "" || termina === "") {
        errorMensaje.textContent = "Ambos campos de tiempo son obligatorios.";
        errorMensaje.style.display = "block";
        return false;
    }

    let empiezaHora = new Date("1970-01-01T" + empieza + "Z");
    let terminaHora = new Date("1970-01-01T" + termina + "Z");

    if (terminaHora <= empiezaHora) {
        errorMensaje.textContent = "La hora de 'termina' debe ser después de 'empieza'.";
        errorMensaje.style.display = "block";
        return false;
    }

    errorMensaje.style.display = "none";
    return true;
}

function validarFormularioTarea() {
    const nombreTareaValido = validarNombreTarea();
    const fechaValida = validarFecha();
    const tiempoValido = validarTiempo();
    
    return nombreTareaValido && fechaValida && tiempoValido;
}