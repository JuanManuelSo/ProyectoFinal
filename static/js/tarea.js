let formulario = document.getElementById("form-container");

document.getElementById("nombre").addEventListener("input", validarNombreTarea);
document.getElementById("dia").addEventListener("input", validarFecha);
document.getElementById("mes").addEventListener("input", validarFecha);
document.getElementById("año").addEventListener("input", validarFecha);
document.getElementById("empieza").addEventListener("input", validarTiempo);
document.getElementById("termina").addEventListener("input", validarTiempo);
document.getElementById("empieza").addEventListener("input", validarFecha);
document.getElementById("termina").addEventListener("input", validarFecha);

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validarFormularioTarea()) {
    formulario.submit();
  } else {
    if (document.getElementById("nombre").value == "") {
      document.getElementById("error-nombre").innerText = "El campo nombre no puede ser vacío.";
      document.getElementById("error-nombre").style.display = "block";
    }
    if (document.getElementById("dia").value == "") {
      document.getElementById("error-dia").innerText = "El campo día no puede ser vacío.";
      document.getElementById("error-dia").style.display = "block";
    }
    if (document.getElementById("mes").value == "") {
      document.getElementById("error-mes").innerText = "El campo mes no puede ser vacío.";
      document.getElementById("error-mes").style.display = "block";
    }
    if (document.getElementById("año").value == "") {
      document.getElementById("error-año").innerText = "El campo año no puede ser vacío.";
      document.getElementById("error-año").style.display = "block";
    }
    if (document.getElementById("empieza").value == "") {
      document.getElementById("error-tiempo").innerText = "El campo empieza no puede ser vacío.";
      document.getElementById("error-tiempo").style.display = "block";
    }
    if (document.getElementById("termina").value == "") {
      document.getElementById("error-tiempo").innerText = "El campo termina no puede ser vacío.";
      document.getElementById("error-tiempo").style.display = "block";
    }
    console.log("Formulario de tarea inválido.");
  }
});

function validarNombreTarea() {
  const nombre = document.getElementById("nombre").value;
  const letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/;

  if (nombre == null || nombre == '') {
    document.getElementById("error-nombre").style.display = "none";
    return false;
  } else if (!letrasValidas.test(nombre)) {
    document.getElementById("error-nombre").innerText = "No se permiten caracteres especiales.";
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
  let empieza = document.getElementById("empieza").value;
  let empiezaHoras = empieza.split(":")[0]; // Obtiene las horas
  let empiezaMinutos = empieza.split(":")[1]; // Obtiene los minutos
  let fechaIngresada = 0;
  let errores = 0;

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
  if(empieza != '' && empieza != null){
    fechaIngresada = new Date(año, mes - 1, dia, empiezaHoras, empiezaMinutos);
  } else{
    fechaIngresada = new Date(año, mes - 1, dia);
  }
  
  console.log("-----------------------------------------")
  console.log("fechaActual: ", fechaActual);
  console.log("fechaIngresada: ", fechaIngresada);
  console.log("empieza, termina: ", empiezaHoras, empiezaMinutos);
  
  if (año == '' || mes == '' || dia == '') {
    document.getElementById('error-año').style.display = 'none';
    errores++;
  } else if (fechaIngresada >= fechaActual) {
    document.getElementById('error-año').style.display = 'none';
  } else {
    if (año == fechaActual.getFullYear() && mes-1 == fechaActual.getMonth() && dia == fechaActual.getDate()) {
      if (empiezaHoras != undefined && empiezaHoras != '' && empiezaMinutos != undefined && empiezaMinutos != '') {
        document.getElementById('error-año').textContent = 'El horario no puede ser menor o igual que el actual';
        document.getElementById('error-año').style.display = 'block';
        errores++;
      } else {
        document.getElementById('error-año').style.display = 'none';
      }
    } else {
      document.getElementById('error-año').textContent = 'La fecha no puede ser menor que la actual';
      document.getElementById('error-año').style.display = 'block';
      errores++;
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

  // Validar formato numérico
  if ((dia !== "" && !listaNrosValidos.test(dia)) ||
    (mes !== "" && !listaNrosValidos.test(mes)) ||
    (año !== "" && !listaNrosValidos.test(año))) {
    document.getElementById('error-general').textContent = 'Los valores de la fecha deben ser numéricos';
    document.getElementById('error-general').style.display = 'block';
    errores++;
  } else {
    document.getElementById('error-general').style.display = 'none';
  }

  console.log(errores == 0);
  return errores == 0; // Fecha válida
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
    errorMensaje.textContent = "La hora de finalizacion debe ser mayo a la de inicio.";
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