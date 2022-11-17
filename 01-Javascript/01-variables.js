// tipos de variables
//mutables e inmatables


// mutables que se pueden reasignar
var numero1 = 1;
let nueroDos = 2;

numero1 = 13;
nueroDos='dasd';



//inmutables, no cambia es const
const hola = "fas";

//tipos de variables
const numero = 1;
const sueldo = 1.3;
const texto = "adiran"
const boolean = true;


console.log(typeof numero)


if(-1){
    console.log("Negativo es truty")
}else {
    console.log("negativo es false")
}

if(0){
    console.log("cero es truty")
}else {
    console.log("cero es false")
}

if (1){
    console.log("uno es truty")
}else {
    console.log("uno es false")
}

if (null){
    console.log("null es truty")
}else {
    console.log("null es false")
}

if (undefined){
    console.log("undefined es truty")
}else {
    console.log("undefined es false")
}

const ejemplo = {
    "nombre":"Daniel",
    'apellido':'garrido',
    edad: 22,
    hijos:null,
    casado:undefined,
    hijos:{
        varon:'cero',
        mujer:'cero'
    },
    mascotas : ['kira','altair']
};

//borrrar el valor de una propiedad
ejemplo.edad = undefined
console.log(ejemplo)
console.log(Object.keys(ejemplo))
console.log(Object.values(ejemplo))

delete ejemplo.edad
console.log(Object.keys(ejemplo)
)

//variables por valor
let ejemplo3 = 10
let ejemplo4 = ejemplo3
console.log(ejemplo3)
console.log(ejemplo4)
ejemplo3 = ejemplo3+1
console.log(ejemplo3)
console.log(ejemplo4)
//Las variables se clonan

//todos los que no son primitivas, se hacen refrencias
console.log("referencia")
let notas = {total:10}
let notaSegundoBimestre = notas
notaSegundoBimestre.total = notaSegundoBimestre.total + 1
console.log(notaSegundoBimestre)//11
console.log(notas)//11

//clonar objetos
let notasClonadas = Object.assign(notas); //clonado
console.log(notasClonadas)