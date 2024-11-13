function asignarEventosDias() {
    let dias = document.getElementsByClassName('dia');
    for (let i = 0; i < dias.length; i++) {
        dias[i].onclick = function() {
            // Buscar el elemento con el id 'dia-seleccionado' y eliminar el id
            let seleccionado = document.getElementById('dia-seleccionado');
            if (seleccionado != null) {
                seleccionado.removeAttribute('id');
            }
            // Añadir el id al día clicado
            this.id = 'dia-seleccionado';       
            if(document.getElementsByClassName('dia-actual')[0] != null){
                document.getElementsByClassName('dia-actual')[0].classList.remove('dia-actual');
            }
            this.classList.add('dia-actual');
            document.getElementById('diaNro-tareas').innerText = this.innerText;
            diaNuevo = this.innerText;
            document.getElementById('mes-tareas').innerText = meses[mesActual];
            console.log(document.getElementById('diaNro-tareas'),document.getElementById('mes-tareas'))
            let nuevaFecha = new Date(anioActual, mesActual, diaNuevo);
            diaSemanaNuevo = nuevaFecha.getDay()-1;
            if(diaSemanaNuevo == -1){
                diaSemanaNuevo = 6;
            }
            console.log(diaSemanaNuevo);
            document.getElementById('dia-tareas').innerText = diasSemana[diaSemanaNuevo];    
        }
    }
}

function cantidadDias(mes, anio){
    /* Esta funcion se utiliza para saber la cantidad de dias que tiene un mes */
    if(mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11){
        return 31;
    } else if(mes == 3 || mes == 5 || mes == 8 || mes == 10){
        return 30;
    /* Caso especial: Para Febrero necesitamos saber si es año biciesto */
    } else{
        if(anio%4 == 0 && anio%100 != 0){
            return 29;
        } else if(anio%100 == 0 && anio%400 == 0){
            return 29;
        } else{
            return 28;
        }
    }
}

function escribirDias(mes, anio){
    let dias = cantidadDias(mes, anio);
    
    // Elimina los dias del mes anterior para poder escribir los nuevos
    let eliminarDia = divDias.getElementsByClassName('dia');
    while(eliminarDia.length > 0){
        eliminarDia[0].remove();
    }
    let eliminarCompletaSemana = document.getElementsByClassName('completa-semana');
    while(eliminarCompletaSemana.length > 0){
        eliminarCompletaSemana[0].remove();
    }

    // Verifica que dia comienza el mes
    let diaInicio = new Date(anio, mes, 1).getDay();
    // Ajuste para el calendario hispano (Lunes = 0, ..., Domingo = 6)
    if(diaInicio == 0){
        diaInicio = 6;
    } else{
        diaInicio = diaInicio - 1;
    }

    // Añadir los días del mes anterior que completan la primera semana
    let mesAnterior = mes - 1;
    let anioAnterior = anio;
    if(mesAnterior < 0){
        mesAnterior = 11;
        anioAnterior = anio - 1;
    }
    let diasMesAnterior = cantidadDias(mesAnterior, anioAnterior);
    for (let k = diasMesAnterior - diaInicio; k < diasMesAnterior; k++) {
        let nuevaSalida = document.createElement('p');
        nuevaSalida.classList.add('completa-semana');
        nuevaSalida.innerText = k+1;
        divDias.appendChild(nuevaSalida);
    }

    // Escribe los dias
    for(let i = 0; i < dias; i++) {
        let nuevaSalida = document.createElement('p');
        nuevaSalida.innerText = i+1;
        if(i+1 == diaActual && mesActual == fechaActual.getMonth()){
            nuevaSalida.classList.add('dia', 'dia-actual');
        } else{
            nuevaSalida.classList.add('dia');
        }
        divDias.appendChild(nuevaSalida);
    }
    
    asignarEventosDias();
}

function cambioMes(direccion) {
    // Logica para que el mesActual y anioActual se vayan actualizando a medida que pasa los meses del calenedario
    if (direccion == 'izq') {
        if (mesActual == 0) {
            mes.innerText = meses[11];
            mesActual = 11;
            anio.innerText = anioActual-1;
            anioActual = anioActual-1;
            escribirDias(mesActual, anioActual);
        } else {
            mes.innerText = meses[mesActual - 1];
            mesActual = mesActual - 1;
            escribirDias(mesActual, anioActual);
        }
    } else if (direccion == 'der') {
        if (mesActual == 11) {
            mes.innerText = meses[0];
            mesActual = 0;
            anio.innerText = anioActual+1;
            anioActual = anioActual+1;
            escribirDias(mesActual, anioActual);
        } else {
            mes.innerText = meses[mesActual + 1];
            mesActual = mesActual + 1;
            escribirDias(mesActual, anioActual);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const opcionesIcono = document.getElementById('opciones');
    const modal = document.getElementById('modalEliminarTarea');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const confirmarEliminar = document.getElementById('confirmarEliminar');
    const eliminarTarea = document.getElementById('eliminar-tarea');

    // Mostrar el modal al hacer clic en el ícono de opciones
    opcionesIcono.onclick = function() {
        modal.style.display = 'block';
    };

    // Cerrar el modal al hacer clic en la 'x'
    cerrarModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Cerrar el modal si se hace clic fuera de la ventana modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Manejar la eliminación de la tarea
    confirmarEliminar.onclick = function() {
        modal.style.display = 'none';
        eliminarTarea.style.display = 'none';
    };
});

document.getElementById('tarea-completada').onclick = function(){
    document.getElementById('eliminar-tarea').style.display = 'none';
}

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/* Consigue la fecha actual de la PC */
const fechaActual = new Date();

/* Guarda en variables la fecha, mes y año */
let diaActual = fechaActual.getDate();
let mesActual = fechaActual.getMonth();
let anioActual = fechaActual.getFullYear();
let mes = document.getElementById('mes-calendario');
mes.innerText = meses[mesActual];
let divDias = document.getElementsByClassName('dias')[0];
document.getElementById('mes-tareas').innerText = meses[fechaActual.getMonth()];
if(fechaActual.getDay()-1 == -1){
    document.getElementById('dia-tareas').innerText = diasSemana[6]
}
else{
    document.getElementById('dia-tareas').innerText = diasSemana[fechaActual.getDay()-1];
}
document.getElementById('diaNro-tareas').innerText = fechaActual.getDate();

/* Escribe los dias de el mes inicial */
escribirDias(mesActual, anioActual);
/* Llama a la funcion "cambioMes" */
document.getElementById('flecha-izq-calendar').onclick = function() { cambioMes('izq'); };

document.getElementById('flecha-der-calendar').onclick = function() { cambioMes('der'); };

// Llamar a esta función luego de escribir los días en el calendario
escribirDias(mesActual, anioActual);
resaltarDiasConTareas();

