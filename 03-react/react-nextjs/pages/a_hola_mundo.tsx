//formas de exportar
//la primera, declaro la funcion y luego la exporto
/*
const a_componente = function (){
    return (
        <></>
    )
}
export default a_componente
const b_componenete = ()=>{
    return <></>
}
*/

import EstilosEjemplos from "../components/a_estilos/EstilosEjemplos";
import Componente from "../components/b_componentes/Componente";
import Layout from "../components/Layout";

export default function a_hola_mundo(){
    return (
        <>
            <Layout title={'Hola mundo'}>
            <h1 className={"text-amber-800 text-3xl"}>HOllaaaa</h1>
            <EstilosEjemplos></EstilosEjemplos>
            <Componente iteraciones={3} mostrar={true} url={'http://google.com'}
            ></Componente>
            </Layout>
        </>
    )
}