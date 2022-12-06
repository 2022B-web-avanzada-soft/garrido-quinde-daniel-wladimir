const fs = require('fs'); //file system
//importar modulo fs
//06-ejemplo.txt -> hola

fs.readFile(
    './06-ejemplo.txt',
    'utf-8',
    (errorLecturaArchivo,contenidoPrimerArchivo) => {
        if (errorLecturaArchivo){
            console.error('Error leyendo archivo',errorLecturaArchivo);
        }else {

            fs.readFile(
                './01-variables.js',
                'utf-8',
                (errorLecturaArchivo2,contenidoSegundpArchivo) => {
                    if (errorLecturaArchivo){
                        console.error('Error leyendo archivo',errorLecturaArchivo2);
                    }else {
                        fs.writeFile(
                            './06-nuevo.txt',
                            contenidoSegundpArchivo+contenidoPrimerArchivo,
                            (errorEscritura)=>{
                                contenidoSegundpArchivo
                            }
                        );
                    }

                }
            );

        }
    }
);

fs.readFile(
    './01-variables.js',
    'utf-8',
    (errorLecturaArchivo,contenidoPrimerArchivo) => {
        if (errorLecturaArchivo){
            console.error('Error leyendo archivo',errorLecturaArchivo);
        }else {
            //console.log('Contendio: ',contenidoPrimerArchivo)
            contenido2=contenidoPrimerArchivo;
        }

    }
);
