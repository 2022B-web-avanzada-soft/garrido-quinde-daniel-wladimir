const arreglo = [
    {
        id: 1,
        nombre: "Adrian",
        nota: 5,
    },
    {
        id: 2,
        nombre: "Vicente",
        nota: 8,
    },
    {
        id: 3,
        nombre: "Carolina",
        nota: 14,
    },
    {
        id: 4,
        nombre: "Wendy",
        nota: 16,
    },
    {
        id: 5,
        nombre: "Andrea",
        nota: 19,
    },
    {
        id: 6,
        nombre: "Pamela",
        nota: 19,
    },
    {
        id: 7,
        nombre: "Cristian",
        nota: 20,
    },
    {
        id: 8,
        nombre: "Daniel",
        nota: 19,
    },
    {
        id: 9,
        nombre: "Lilly",
        nota: 14,
    },
    {
        id: 10,
        nombre: "Ramiro",
        nota: 12,
    },
];


//las funciones son parametros
/*find
enviamos una expresion truty o falsy
devuelve el primero que cumpla con esa condicion
* */

const respuestaFind = arreglo
    .find(
        function (valorActual,indiceActual,arregloCompleto){
            console.log('valor actual',valorActual);
            console.log('indice actual',indiceActual);
            console.log('arreglo: ',arregloCompleto);
            return valorActual.nota===5
        }
    );

console.log('respuesta find', respuestaFind);


//Find index
/*
* enviamos expresion
* devuelve el indice
* devuelve el menos uno si no encuentra nada.
* */

const respuestaIndex = arreglo.findIndex(
    function (valorActual){
        return valorActual.nombre === 'Cristian';
    }
);
console.log('respuestaIndex',respuestaIndex);

//Foreach
//itera el arreglo y devuelve nada osea undefained
const respuestaForEach = arreglo.forEach(
    function (value,index,array){
        console.log('valor actual: ',value)
    }
);
console.log('respuesta For Each: ',respuestaForEach)


/*
* Map
* enviamos datos al nuevo arreglo
* devuelve el nuevo arreglo PERO no modifica el original
* */
const respuestaMap = arreglo.map(
     (value,index,array) => {
        const notaActual = value.nota + 1;
        const nuevoElemento = {
            id:value.id,
            nombre:value.nombre,
            nota : notaActual,
            estaAprobado:notaActual>14,
            casado: false
        };
    return nuevoElemento;
     }
);
console.log(arreglo)
console.log(respuestaMap)


/*
* Filter, enviamos el boolean
* devuelve un arreglo con los valores que cumplan esa condicion.
* */

const respuestaFilter = arreglo.filter(
    (value, index, array)=>{
        return value.nota>=14;
    }
);
console.log('respuesta filter: ')
console.log(respuestaFilter)

/*
* Some -> expresion
* devuelve boolean, si existe ALGUN valor que cumpla con lo establecido
*
* */

const respuestaSome = arreglo.some((value, index, array)=>{return value.nota > 9});
console.log('respuesta some: ',respuestaSome);
/*
* Every -> expresion
* devuelve el boolean, TODO cumple con la condicon
* */
const  respuestaEvey = arreglo.some((value, index, array)=>{return value.nota>9});
console.log('respuesta every',respuestaEvey);


/*
* reduce -> va de izq a dere
* reduce right -> de dere a izq
* opera de manera acumulativa, opera dos valores y ese resultado lo opera al tercero y asi sucesivamente
* [1,2,3,4,5]
* 1+2
* 3+3
* 6+4
* 10+5
*
* */

const respuestaReduce = arreglo.reduce((previousValue, currentValue, currentIndex, array)=>{
    return (previousValue+currentValue.nota);
},0);//el cero es el valor inicial,indice o acumulador
console.log(respuestaReduce);
