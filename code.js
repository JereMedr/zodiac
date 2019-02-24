const imagenesUrl = "http://192.168.1.54/signos"
// const imagenesUrl = "https://jsonplaceholder.typicode.com/todos/1"

function consultar(){
    var fechaInput = document.getElementById("fecha")
    let fecha = fechaInput.value
    console.log(fecha)
    let signo = getSigno(fecha)
    console.log('signo = ',signo)
    getImagen(signo).then( urlImagen => {
        console.log('url',urlImagen)
        let imagen = document.createElement ('img')
        imagen.setAttribute('src',urlImagen)
        imagen.setAttribute('class', 'imgSigno')
        
        let contentDIV = document.getElementById("content")
        contentDIV.innerHTML = '<button id="btn">Atras</button>'
        document.getElementById('btn').addEventListener('mouseover', () => {
            document.getElementById('btn').innerHTML = 'Gonzalo Cardoso'
        }) 

        document.getElementById('btn').addEventListener("mouseleave", () => {
            document.getElementById('btn').innerHTML = 'Atras'
        })

        contentDIV.appendChild(imagen)
    })
//    let diasParaCumple = getDiasParaCumple(fecha)
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
        let yearFuture = (fechaActual.getFullYear())+1
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