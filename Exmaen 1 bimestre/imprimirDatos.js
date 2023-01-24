const fs = require('fs')
let path = './datos.txt'

let s_o_1 = {
    id:1,nombre:'Windows',esSoftwareLibre:false,fechaLanzamiento:new Date('2000-12-12'),aplicaciones:[{}]
}

let s_o_2 = {
    id:2,nombre:'Ubuntu',esSoftwareLibre:true,fechaLanzamiento:new Date('2023-12-12'),aplicaciones:[{}]
}

s_o_1.aplicaciones = [{
    id:1,nombre:"word",esLibre:false,fechaInstalacion:new Date('2015-10-02'),version: 2.32
},{
    id:2,nombre:"word1",esLibre:false,fechaInstalacion:new Date('2014-10-02'),version: 1.82
},{
    id:3,nombre:"word2",esLibre:true,fechaInstalacion:new Date('2016-10-02'),version: 2.52
},{
    id:4,nombre:"word3",esLibre:false,fechaInstalacion:new Date('2018-10-02'),version: 1.32
},{
    id:5,nombre:"word4",esLibre:true,fechaInstalacion:new Date('2020-10-02'),version: 3.32
}
]

s_o_2.aplicaciones = [{
    id:1,nombre:"excel",esLibre:false,fechaInstalacion:new Date('2015-10-02'),version: 2.32
},{
    id:2,nombre:"excel1",esLibre:false,fechaInstalacion:new Date('2014-10-02'),version: 1.82
},{
    id:3,nombre:"excel2",esLibre:true,fechaInstalacion:new Date('2016-10-02'),version: 2.52
},{
    id:4,nombre:"excel3",esLibre:false,fechaInstalacion:new Date('2018-10-02'),version: 1.32
},{
    id:5,nombre:"excel4",esLibre:true,fechaInstalacion:new Date('2020-10-02'),version: 3.32
}
]

const archivo = [s_o_1,s_o_2]
//escribirArchivo(path,JSON.stringify(archivo))


 async function leer(path){
    try {
        const arregloSistemasOperativosString = await leerArchivo(path)
        return JSON.parse(arregloSistemasOperativosString)
    }catch (error){
        console.error(error)
    }
}
const datos = leer(path)
console.log(datos)


async function imprimir(datos){
    datos.forEach(function (value,index,array){
        console.log(value)
    })
}


//imprimir(datos)


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


