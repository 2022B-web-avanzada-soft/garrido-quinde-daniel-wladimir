//Destructuracion de objetos => ORDEN SI IMPORTA
const adrian ={
    nombre: "Adrian"
};
const ejemplo = {
  nombre: "ejemploNombre",
  apellido: "ejemploApellido",
};
const adrianEjemplo = {
    ...adrian,
    ...ejemplo,
};
const ejemploAdrian = {
    ...ejemplo,
    ...adrian,
}
console.log("adrian + ejemplo",adrianEjemplo)
console.log("ejemplo + adrian" ,ejemploAdrian)

//Destructuracion de arreglos
const arregloUno = [1,2,3,4,5];
const arregloDos = [6,7,8,9,10];
const superArreglo = [
    ...arregloUno,
    ...arregloDos,
];
console.log(superArreglo)