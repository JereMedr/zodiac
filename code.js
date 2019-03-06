const imagenesUrl = "https://secret-eyrie-21914.herokuapp.com/signos/"
// const imagenesUrl = "https://jsonplaceholder.typicode.com/todos/1"
document.getElementById("fecha").setAttribute("value",getTodayDate())
function consultar(){
    var fechaInput = document.getElementById("fecha")
    let fecha = fechaInput.value
    console.log(fecha)
    let signo = getSigno(fecha)
    console.log('signo = ',signo)
    var diasParaCumple = getDiasParaCumple(fecha)

    getImagen(signo).then( urlImagen => {
        let contentDIV = document.getElementById("content")
        contentDIV.innerHTML = '<button onclick="volver()">Atras</button>'
        console.log('url',urlImagen)
        let imagen = document.createElement ('img')
        imagen.setAttribute('src',urlImagen)
        imagen.setAttribute('class', 'imgSigno')
        

        let parrafo = document.createElement('p')
        parrafo.innerHTML = `Faltan ${diasParaCumple} dias para tu proximo cumpleaños`
        contentDIV.appendChild(parrafo)




        contentDIV.appendChild(imagen)
    })

//    let diasParaCumple = getDiasParaCumple(fecha)
}

function volver() {
    let contentDIV = document.getElementById("content")
        contentDIV.innerHTML = `
        <label>
        ingrese su fecha de nacimiento:
        <br>
        <input type="date"  id="fecha" >
        </label>
        <br>
        <button onclick="consultar()"> consultar </button>
    ` 
    document.getElementById("fecha").setAttribute("value",getTodayDate())
}

function getSigno(fecha){
    fecha = new Date(fecha)
    let mes = fecha.getMonth()
    let dia = fecha.getDate()

    mes = ++mes
    dia = ++dia

    console.log('mes: ',mes)
    console.log('dia: ',dia)

    if((mes == 1 && dia <= 20) || (mes == 12 && dia >=22)) {
        return "capricornio";
      } else if ((mes == 1 && dia >= 21) || (mes == 2 && dia <= 18)) {
        return "acuario";
      } else if((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) {
        return "piscis";
      } else if((mes == 3 && dia >= 21) || (mes == 4 && dia <= 20)) {
        return "aries";
      } else if((mes == 4 && dia >= 21) || (mes == 5 && dia <= 20)) {
        return "tauro";
      } else if((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) {
        return "geminis";
      } else if((mes == 6 && dia >= 22) || (mes == 7 && dia <= 22)) {
        return "cancer";
      } else if((mes == 7 && dia >= 23) || (mes == 8 && dia <= 23)) {
        return "leo";
      } else if((mes == 8 && dia >= 24) || (mes == 9 && dia <= 23)) {
        return "virgo";
      } else if((mes == 9 && dia >= 24) || (mes == 10 && dia <= 23)) {
        return "libra";
      } else if((mes == 10 && dia >= 24) || (mes == 11 && dia <= 22)) {
        return "escorpio";
      } else if((mes == 11 && dia >= 23) || (mes == 12 && dia <= 21)) {
        return "sagitario";
      }
    
}

function getDiasParaCumple(fechaInput){
   let fechaActual = new Date()
   let fechaCumple = new Date (fechaInput)
   fechaCumple = validarFechas(fechaActual,fechaCumple)
   
    let date1 = fechaActual//.toLocaleDateString('en-GB')
    let date2 = fechaCumple//.toLocaleDateString('en-GB')

    let timeDiff = Math.abs(date2.getTime() - date1.getTime())
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) 
    return diffDays
}

function validarFechas(fechaActual,fechaCumple){
    if (fechaActual>=fechaCumple) {
        return fechaCumple
    } else {
        let yearFuture = (fechaActual.getFullYear())
        fechaCumple.setFullYear(yearFuture);
        return fechaCumple
    }
}

function diaCumple(fechaCumple){

}

 //signo.variable === signo[variable] para acceder al atributo

function getImagen(signo){
    return  fetch(imagenesUrl)
            .then(response => response.json())
            .then(r => r[signo])
        
}

function getTodayDate(){
    let today = new Date()
    let month = today.getMonth()
    let day = today.getDate()
    month = parseInt(month)+1

    if(month < 10){
        month = '0' + month
    }
    if(parseInt(day) < 10){
        day = '0' + day
    }
    let str = `${today.getFullYear()}-${month}-${day}` 
    return str
}