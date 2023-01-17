// 08-promesas.js
const fs = require('fs');
/*
* Una funcion que acepte como parametro una variable
* del "path" del archivo y otra variable con el "contenidoArchivo".
* Utilizar el modulo 'fs' para leer el archivo en ese "path" y anadir el
* "contenidoArchivo" a ese archivo.
* */

function leerArchivo(path){
    return new Promise(
        (resolve, reject)=>{
            fs.readFile(
                path, // Nombre o path del archivo
                'utf-8', // codificacion
                (errorLectura, contenido) => {
                    if (errorLectura) {
                        console.error(errorLectura);
                        reject('Error leyendo primer archivo');
                    } else {
                        resolve(contenido)
                    }
                }
            );
        }
    ); //
}
function escribirArchivo(path, nuevoContenido){
    return new Promise(
        (resolve, reject) =>{
            fs.writeFile(
                path,
                nuevoContenido,
                (errorEscritura) => {
                    if (errorEscritura) {
                        console.error(errorEscritura);
                        reject('Error escribiendo nuevo archivo');
                    } else {
                        resolve('Completado');
                    }
                }
            );
        }
    ); //
}
//
function ejercicio08(path, contenidoNuevo){
    leerArchivo(path)
        .then(
            (contenidoArchivoOriginal)=>{
                return escribirArchivo(
                    path, contenidoArchivoOriginal + contenidoNuevo
                )
            }
        )
        .then()
        .catch((error)=> console.error(error));
}

ejercicio08('06-ejemplo.txt', ' :)  lo logramos!');

//async-await

async function asyncAwaitUno(path, nuevoContenido){
    try {
        const respuestaContenidoArchivoOriginal = await leerArchivo(path);
        await escribirArchivo(path,respuestaContenidoArchivoOriginal+nuevoContenido)
    }catch (error) {
        console.error(error)
    }
}
const asyncAwaitDos =  function(){}
const asyncAwaitTres = () => {}

/*
* REGLAS
* 1.- se necesita funciones para usar async o await. Debe estar dentro de la funcion
* 2.-agregar la palabra async antes de la declaracion
* 3.-agergar la palabra await antes de la declaracion de una promesa
* * Si sabemos que va a existir un reject, colocamos un try catch
*
* */