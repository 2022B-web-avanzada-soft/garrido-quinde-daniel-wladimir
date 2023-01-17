

function promesaPar(numero){
    const miPrimerPromesa = new Promise(
        (resolve,reject) => {
            if(numero%2 ===0){resolve(numero)}else {
                reject('no es par')
            }
        }
    );
    return miPrimerPromesa;
}

function promesaElevar(numero){
    return new Promise()
}

promesaPar(6).then(
    (data) => {console.log('DATA',data,'1')
    return promesaPar(data+1)}
).then(
    (data) => {console.log('DATA',data,'2')}
).catch(
    (error) => {console.log('ERROR', error)}
).finally(
    () => {console.log('FINALLY')}
)









