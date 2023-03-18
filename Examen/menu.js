
const fs = require('fs')
const inquirer = require('inquirer');
const {prompt} = require("inquirer");


async function main(){
    const datos = await leer("./datos.txt")
   menuInicial(datos)
  //  modificarApps(datos,0)
}

main()

function menuInicial(sistemasOperativos){
    inquirer.prompt([{
        type:'rawlist',
        name:'opcionElegida',
        message:'Elija la opcion necesaria: ',
        choices: [
            {value: 1, name:'Crear Sistema Operativo'},
            {value:2, name: 'Mostrar Sistemas Operativos'},
            {value: 3, name:'Modificar Sistemas Operativos'},
            {value: 4 ,name:'Borrar Sistemas Operativos'},
            {value: 5,name: 'Salir'}
        ],
    },])
        .then(answers => {
           const opcion = answers.opcionElegida
            if (opcion===1){
                //create
                crear_nuevo_SO(sistemasOperativos)
            }else if(opcion === 2){
                //read
                imprimir(sistemasOperativos)
                volverAlMenu(sistemasOperativos)
            }else if(opcion===3){
                //update
                sistemasOperativos.forEach((value=>{
                    console.log("ID SO: "+ value.id, "nombre: "+value.nombre)
                }))
                inquirer.prompt(
                    {
                        type:'number',
                        name:'objetoModificar',
                        message:'Que SO va a modificar, seleccione el id del SO: '
                    }
                )
                    .then(answers=>{
                        const ans = answers.objetoModificar
                        if (ans > 0 && ans<= sistemasOperativos.length){
                            modificar_sistemaOperativo(sistemasOperativos,ans-1)

                        }
                    })

            }else if (opcion===4){
                //delete
                imprimir(sistemasOperativos)
                inquirer.prompt({type:'number', name:'opcionBorrar',
                    message:'Que so desea eliminar? (Seleccione el id de la so)'})
                    .then(answers =>{
                        const ans = answers.opcionBorrar
                        if (ans > 0 && ans<= sistemasOperativos.length){
                            delete sistemasOperativos[ans-1]
                            imprimir(sistemasOperativos)
                            volverAlMenu(sistemasOperativos)
                        }
                    })
            }else {
                escribirArchivo('./datos.txt',JSON.stringify(sistemasOperativos))
                console.log("Gracias por preferirnos :D ")
            }
        });
}


function volverAlMenu(datos){
    inquirer.prompt({
        type:'rawlist',
        name:'deseaVolver',
        message:'Desea volver al menu principal',
        choices:[{value:1,name:'Si deseo volver'},
            {value: 2,name:'No, cierre el programa'}]
    }).then((answers) => {
        console.log(answers.deseaVolver)
        if (answers.deseaVolver === 1){
            menuInicial(datos)
        }else {
            escribirArchivo('./datos.txt',JSON.stringify(datos))
            console.log("Gracias por preferirnos.")
        }
    })
}

async function leer(path){
    try {
        const arregloSistemasOperativosString = await leerArchivo(path)
        return JSON.parse(arregloSistemasOperativosString)
    }catch (error){
        console.error(error)
    }
}

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


function imprimir(sistemasOperativos){
    if (sistemasOperativos.length===1){
        value = sistemasOperativos[0]
        console.log("Id SO:" + value.id, "nombre: " + value.nombre,
            "Es libre: " + value.esSoftwareLibre, "Fecha lanzmiento: " + value.fechaLanzamiento)
        console.log("Aplicaciones: \n", imprimirApps(value.aplicaciones))
    }else {
        sistemasOperativos.forEach((value) => {
            console.log("Id SO:" + value.id, "nombre: " + value.nombre,
                "Es libre: " + value.esSoftwareLibre, "Fecha lanzmiento: " + value.fechaLanzamiento)
            console.log("Aplicaciones: \n", imprimirApps(value.aplicaciones))
        })
    }
}

function imprimirApps(aplicaciones){
    if (Object.entries(aplicaciones).length===0){
        console.log("sin aplicaciones")
    }else {
        let valor = ""
        aplicaciones.forEach((value) => {
            valor = valor + "\t\tid: " + value.id + " nombre: " + value.nombre +
                " Es libre: " + value.esLibre + " Fecha:" + value.fechaInstalacion + " version: " + value.version + "\n"
        })
        return valor
    }
}

 function  modificar_sistemaOperativo(sistemasOperativos,indice){
    let soModificar = sistemasOperativos[indice]
    inquirer.prompt([
        {
            type:'number',
            name:'id',
            message:'Cambiar id?',
            default: soModificar.id
        },{
            name:'nombre',
            message:'Cambiar nombre?',
            default: soModificar.nombre
        },{
            name:'esLibre',
            message:'Cambiar si es libre?',
            default: false
        },{
            name:'fecha',
            message:'Cambiar fecha?',
            default: soModificar.fechaLanzamiento
        },{
            type: 'rawlist',
            name:'modificarApps',
            message: 'Desea modificar las apps del SO?',
            choices: [{value:1,name:'si'},{value:2,name:'no'}]
        }
    ])
        .then(answers =>{
            soModificar.id = answers.id
            soModificar.nombre = answers.nombre
            soModificar.esLibre = (answers.esLibre === 'true')
            soModificar.fechaLanzamiento = new Date(answers.fecha)
            if (answers.modificarApps===1){
                modificarApps(sistemasOperativos,indice)
            }else {
                console.log("Nuevo SO")
                imprimir([soModificar])
                volverAlMenu(sistemasOperativos)
            }

        })
}


function crear_nuevo_SO(sistemasOperativos){
    inquirer.prompt([
        {
            type:'number',
            name:'id',
            message:'Nuevo id?',
        },{
            name:'nombre',
            message:'Nuevo nombre?',
        },{
            name:'esLibre',
            message:'Es libre?',
            default: 'false'
        },{
            name:'fecha',
            message:'Fecha?',
            default: '2022-01-01'
        }
    ]).then(answers=>{
        aux = {}
        aux.id = answers.id
        aux.nombre = answers.nombre
        aux.esSoftwareLibre = answers.esLibre
        aux.fechaLanzamiento = new Date(answers.fecha)
        aux.aplicaciones =  [
            ]

        console.log("para crear las apps, modificar este arreglo")
        console.log("nuevo so",aux)
        sistemasOperativos[sistemasOperativos.length]=aux
    }).then(answers=>{
        //
        imprimir(sistemasOperativos)
        volverAlMenu(sistemasOperativos)
    })
}

function modificarApps(sistemasOperativos,indice){
    let sistemaModificar = sistemasOperativos[indice]
    let aplicacionsDelSistema = sistemaModificar.aplicaciones
    inquirer.prompt({
        type:'rawlist',
        name:'crudApps',
        message: 'Que accion realizara?',
        choices:[
            {value:1,name:'Nueva [id_so]'},
            {value:2,name:'Mostrar Apps'},
            {value:3,name:'Editar APPS'},
            {value:4,name:'Borrar [id_so]'},
            {value: 5,name: 'Salir'}
        ]
    }).then(answers => {
        const valor = answers.crudApps
        if (valor===1){
            crearNuevaApp(sistemasOperativos, indice)

        }else if (valor ===2){
            imprimirApps2(aplicacionsDelSistema)
            volverMenuApps(sistemasOperativos,indice)
        }else if(valor===3){
           imprimirApps2(aplicacionsDelSistema)

            inquirer.prompt(
                {
                    type:'number',
                    name:'appModificar',
                    message:'Que [id_so] va a modificar?, seleccione el id de la [id_so]: '
                }
            )
                .then(answers=>{
                    const ans = answers.appModificar
                    if (ans > 0 && ans<= sistemaModificar.aplicaciones.length){
                        modificar_apps(sistemasOperativos,indice,ans-1)
                    }
                })

        }else if(valor===4){
            imprimirApps2(aplicacionsDelSistema)
            inquirer.prompt({
                type:'number',
                name:'appEliminar',
                message:'Que [id_so] desea eliminar?, eliga el ID'
            }).then(answers=>{
                if (answers.appEliminar>0 && answers.appEliminar<=sistemaModificar.aplicaciones.length){
                    delete sistemaModificar.aplicaciones[answers.appEliminar-1]
                    imprimirApps2(aplicacionsDelSistema)
                   volverMenuApps(sistemasOperativos,indice)
                }else {
                    console.log("No existe esa [id_so]");
                    volverMenuApps(sistemasOperativos,indice)
                }
            })

        }else{
             volverAlMenu(sistemasOperativos)
        }
    })
}

function volverMenuApps(sistemasOperativos,indice){
    inquirer.prompt({
        type:'rawlist',
        name:'deseaVolver',
        message:'Desea volver al menu de apps',
        choices:[{value:1,name:'Si deseo volver'},
            {value: 2,name:'No, cierre el programa'}]
    }).then((answers) => {
        console.log(answers.deseaVolver)
        if (answers.deseaVolver === 1){
            modificarApps(sistemasOperativos,indice)
        }else {
            console.log("Gracias por preferirnos.")
        }
    })
}

function modificar_apps(sistemasOperativos,indiceSO,indiceApp){
    let app = sistemasOperativos[indiceSO].aplicaciones[indiceApp];
    inquirer.prompt([
        {
            type:'number',
            name:'id',
            message:'Cambiar id?',
            default: app.id
        },{
            name:'nombre',
            message:'Cambiar nombre?',
            default: app.nombre
        },{
            name:'esLibre',
            message:'Cambiar si es libre?',
            default: false
        },{
            name:'fecha',
            message:'Cambiar fecha?',
            default: app.fechaInstalacion
        },{
            type: 'number',
            name:'version',
            message:'Cambiar version?',
            default: app.version
        }
    ])
        .then(answers =>{
            app.id = answers.id
            app.nombre = answers.nombre
            app.esLibre = (answers.esLibre === 'true')
            app.fechaInstalacion = new Date(answers.fecha)
            app.version = answers.version
            console.log("exito")
        })
        .then(()=>{
            volverMenuApps(sistemasOperativos,indiceSO)
        })
}

function crearNuevaApp(sistemasOperativos,indice){
    inquirer.prompt([
        {
            type:'number',
            name:'id',
            message:'Nuevo id?',
        },{
            name:'nombre',
            message:'Nuevo nombre?',
        },{
            name:'esLibre',
            message:'Es libre?',
            default: 'false'
        },{
            name:'fechaInstalacion',
            message:'Fecha instalacion?',
            default: '2022-01-01'
        },{
            type:'number',
            name:'version',
            message:'version: ',
            default: 2.3
        }
        ])
        .then(answers=>{
            answers.fechaInstalacion = new Date(answers.fechaInstalacion)
            sistemasOperativos[indice].aplicaciones[sistemasOperativos[indice].aplicaciones.length] = answers
            volverMenuApps(sistemasOperativos,indice)
        })
}

function imprimirApps2(listaAplicaciones){
   if (listaAplicaciones.length===0){
       console.log("no hay apps")
   }else if (listaAplicaciones.length ===1){
       console.log(listaAplicaciones[0])
   }else if (listaAplicaciones.length>1){
    let valor = ""
    listaAplicaciones.forEach((value) => {
        valor = valor + "\t\tid: " + value.id + " nombre: " + value.nombre +
            " Es libre: " + value.esLibre + " Fecha:" + value.fechaInstalacion + " version: " + value.version + "\n"

    })
    console.log(valor)
   }else {
       console.log("no hay apps")
   }
}