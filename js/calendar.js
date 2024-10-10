const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const fechaActual = new Date();
console.log (fechaActual);
let diaActual = fechaActual.getDate();
let mesActual = fechaActual.getMonth();
let anioActual = fechaActual.getFullYear();
let mes = document.getElementById('mes-calendario');
mes.innerText = meses[mesActual];
let divDias = document.getElementsByClassName('dias')[0];
document.getElementById('mes-tareas').innerText = meses[fechaActual.getMonth()];
document.getElementById('dia-tareas').innerText = dias[fechaActual.getDay()-1];
document.getElementById('diaNro-tareas').innerText = fechaActual.getDate();



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

function cantidadDias(mes, anio){
    // Meses de 31 dias = Enero, Marzo, Mayo, Julio, Agosto, Octubre, Diciembre
    if(mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11){
        return 31;
    // Meses de 30 dias = Abril, Junio, Septiembre, Noviembre
    } else if(mes == 3 || mes == 5 || mes == 8 || mes == 10){
        return 30;
    // Caso especial: Para Febrero necesitamos saber si es año biciesto
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
    console.log(mes);
    console.log(dias);
    
    // Elimina los dias del mes anterior para poder escribir los nuevos
    let eliminarDia = divDias.getElementsByClassName('dia');
    while(eliminarDia.length > 0){
        eliminarDia[0].remove();
    }

    // Verifica que dia comienza el mes
    let diaInicio = new Date(anio, mes, 1).getDay();
    console.log("diaInicio: ", diaInicio);
    // Ajuste para el calendario hispano (Lunes = 0, ..., Domingo = 6)
    if(diaInicio == 0){
        diaInicio = 6;
    } else{
        diaInicio = diaInicio - 1;
    }
    console.log("diaInicio: ", diaInicio);

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
        nuevaSalida.classList.add('dia', 'completa-semana');
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
}

escribirDias(mesActual, anioActual);
document.getElementById('flecha-izq-calendar').onclick = function() { cambioMes('izq'); };
document.getElementById('flecha-der-calendar').onclick = function() { cambioMes('der'); };