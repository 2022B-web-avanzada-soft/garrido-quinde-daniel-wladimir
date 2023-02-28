import Layout from "../../components/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";
import {useRouter} from "next/router";
//import {useRouter} from "next/navigation";


//parametros recibidos
interface ParametrosTodo{
        error?:string
        todo?:Todo;
}


export default function(params:ParametrosTodo){
    const router = useRouter()
    const {idTodo,nombre,etc} = router.query //en el query esta el objeto con todos los parametros
    return(
        /*
        * Los parametros tambien se pueden obtener con el hook, useRouter()
        * */

        <>
            <Layout title={"Todo's HIJO"}>

                <h1>To do's HIJO</h1>
                <h1>{params?.todo.title}</h1>
            </Layout>
        </>
    )
}

export const getStaticPaths:GetStaticPaths = async () =>{

    //consulta de ids validos
    const paths = [
        {params:{idTodo:'1'}},
        {params:{idTodo:'2'}},
        {params:{idTodo:'5'}},
        {params:{idTodo:'4'}}
    ]
    return {paths,fallback:false}
}




export const getStaticProps:GetStaticProps = async (
    {params}
) =>{
    try {
        //fetch
        const id = params?.idTodo as string;
        const resultado = await TodoHttp(id)
        return {props:{todo:resultado}}
    }catch (
        err:any
        ){return {props:{errors:err.message}}}
}
