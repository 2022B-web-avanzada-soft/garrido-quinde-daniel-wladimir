let arreglo = [6,7,8,9]
arreglo=1
arreglo=null
arreglo=undefined
arreglo="adf"
arreglo = [true,1,2,'daf',"dadf",null]
arreglo=[1,2,3,4]

for (let numero of arreglo){
    console.log('numero',numero)
}/*
numero 1
numero 2
numero 3
numero 4
*/

for (let indice in arreglo){
    console.log(arreglo[indice] +' '+'indice'+indice)
}
/*1 indice0
2 indice1
3 indice2
4 indice3
*/

arreglo.push(11); //add al final del elemento
arreglo.pop()//eliminar al principio del arreglo
arreglo.unshift(2);//add al principio del arreglo
arreglo.splice(0,2,'sad','ad','afafd','123')//empieza en el puntero 0, elimina 3 items
// despues y coloca el 4
console.log(arreglo)

const indice = arreglo.indexOf(2)//devuelve el indice de solo el primer elemento que encuentra
//si no existe devuelve -1
arreglo.splice(indice,2)
console.log(arreglo)