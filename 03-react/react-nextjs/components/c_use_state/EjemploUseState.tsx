import {useEffect, useState} from "react";

interface Usuario {
    nombre: string,
    edad: number,
    graduado: boolean,
    hijos?:number[]
}

    export default function (){

    const [numero,setNumero] = useState(0);
    const [nombre,setNobmre] = useState("");
    const [arregloNumeros,setArregloNumeros] = useState([2,5,3]);
    const [usuario,setUsuario] = useState({
        nombre: "Daniel",
        edad: 22,
        graduado:false
    } as Usuario)


        useEffect(
            ()=>{
                console.log('cambio arreglo',arregloNumeros)
            },[arregloNumeros]
        )

        useEffect(
            ()=>{
                console.log('cambio usuario',usuario,numero)
            },[usuario,numero]
        )

    return (<>
        <button className="bg-blue-400 m-5" onClick={
            (event)=>{
                event.preventDefault();
                setNumero(numero+1)
            }
        }>Numero</button>
        <button className="bg-blue-400 m-5" onClick={(event)=>{
            event.preventDefault();
            setArregloNumeros([...arregloNumeros,1])
        }}>Arreglo</button>
        <button className="bg-blue-400 m-5" onClick={(event)=>{
            event.preventDefault();
            let usuarioNuevo = {...usuario,nombre:new Date().toString()}
            setUsuario(usuarioNuevo)
        }}>Usuario</button>



    </>)
}