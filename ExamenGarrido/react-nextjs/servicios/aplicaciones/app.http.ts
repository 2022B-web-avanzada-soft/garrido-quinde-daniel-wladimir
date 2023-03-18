export interface app{
    esLibre:boolean;
    id:number;
    nombre:string;
    version:number;
}

export interface appIdP{
    id:number
}

export async function appHttp(
    id?:String
):Promise<app[]>{
    const url = `http://localhost:60/aplicacion${id ? '/' + id :''}`;
    const respuesta = await fetch(url)
    return (await respuesta.json()) as app[]
}

export async function appIdList(soId:number){
    const url = `http://localhost:60/appSo/${soId}`
    const so = await fetch(url)

}