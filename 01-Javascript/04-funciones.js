//funciones anonimas - fat arrow functions
const funcionFatArrow1 = () => {};
var funcionFatArrow2 = () => {};
let funcionFatArrow3 = () => {};

const funcionFatArrow4 = () => {};
const funcionFatArrow5 = (parametro) => {
    return parametro + 1;
};
const funcionFatArrow6 = (parametro) => parametro + 1;// una sola linea, se omite llaves y return
const funcionFatArrow7 = parametro => parametro + 1;//solo si tenemos 1 parametro, omite los parentesis


// ... => parametros infinitos => Llegan en un arreglo de paramteros
// solo podemos tener un parametro infinito por funcion

function  sumarNumeros(...todosNumeros){
    let total = 0;
    todosNumeros.forEach(
        (valorActual)=>{
            total = total + valorActual;
        }
    );
    return total;
}

sumarNumeros(1,2,3,5,1,2,3,5,1,2,3,5,4,4,8,2,1,8,5)