//stringfy y parse

const arregloUsuarios =[
    {
        id:1,
        nombre:'Daniel',
    }
];
const arregloGuardado = JSON.stringify(arregloUsuarios)//arreglos, objetos
const objetoRestaurado = JSON.parse(arregloGuardado)
/*
* Se transforma en arreglos con stringfy
* se devuelve al objeto original
* */
const usuarios = {
    id:1,
    nombre:'DANIEL',
};
console.log('arregloGuardado', arregloGuardado);
const arregloRestaurado = JSON.parse(arregloGuardado);
console.log('arregloRestaurado',arregloRestaurado)