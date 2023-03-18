import {GetStaticPaths, GetStaticProps} from "next";
import {soHttp, soIdList} from "../../../../servicios/so/so.http";
import {app} from "../../../../servicios/aplicaciones/app.http";

interface paramsApp {
    error?:string;
    appr?:app;
}

export default function (paramsApp:paramsApp){
    return(
        <>
            dasfasdfafsd
        </>
    )
}


export const getStaticProps:GetStaticProps =async (
    {params}
) => {
    try {
        //fetch
        const id = params.id_so as String
        const resultado = await soHttp(id);
        return {props:{so:resultado}}
    }catch (err:any){
        return  {props:{errors:err.message}}
    }
}

export const getStaticPaths:GetStaticPaths = async () =>{
    //consultar ids validos
    const paths = [{params:{id_so: "-1"}}]
    const lista = await soIdList()
    lista.map(
        (soID) =>{
            paths.push({params:{id_so:soID.id.toString()}})
        })
    return {paths,fallback:false}
}