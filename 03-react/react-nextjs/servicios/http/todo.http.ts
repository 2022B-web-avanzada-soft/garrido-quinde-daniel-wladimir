import Layout from "../../components/Layout";

export interface Todo{
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean
}


export async function TodoHttp(
    id?:string
): Promise<Todo[]>{
    const url = `https://jsonplaceholder.typicode.com/todos${id ? '/' + id :''}`;//si hay id, se manda el id. Caso contrario
    //se manda vacio
    const respuesta = await fetch(url)
    return await (respuesta.json()) as Todo[]
}


export interface Product{
    "id":number,
    "title":string,
    "price":number,
    "thumbnail":string,
}

export async function ProductHttp(
    id?:string
):Promise<Product[]>{
    const url = `https://dummyjson.com/products${id ? '/' + id :''}?select=title,price,thumbnail`
    const respuesta = await fetch(url)
    return await (respuesta.json()) as Product[]
}

