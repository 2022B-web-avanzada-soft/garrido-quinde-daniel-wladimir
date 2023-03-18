import {app} from "../aplicaciones/app.http";

export interface so{
    id:number;
    nombre:string;
    esLibre:boolean;
    fechaLanzamiento:string;
    aplicaciones:app[]
}

export interface soId{
    id: number
}


export async function soHttp(
    id?:String
):Promise<so[]>{
    const url = `http://localhost:60/sisOpe${id ? '/' + id :''}`;
    const respuesta = await fetch(url)
    return (await respuesta.json()) as so[]
}

export async function soHttpAlone(
    id?:String
):Promise<so>{
    const url = `http://localhost:60/sisOpe${id ? '/' + id :''}`;
    const respuesta = await fetch(url)
    return (await respuesta.json()) as so
}

export async function soIdList():Promise<soId[]>{
    const url = `http://localhost:60/sisOpe?listaIds=3`
    const respuesta = await fetch(url)
    return (await  respuesta.json()) as soId[]
}