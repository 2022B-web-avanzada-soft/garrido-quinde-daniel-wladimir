import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";

export default function(){
    const [arregloTodos,setArregloTodos] = useState([] as Todo[])
    useEffect((
        ()=>{
        consultarTodos()    //consultar api
    }),[]
    )

    const consultarTodos = async ()=>{
        const resultado = await TodoHttp();
        setArregloTodos([
            ...arregloTodos,...resultado
        ])
    }

    return(
        <>
            <Layout title={"Todo's"}>
                <h1>To do's</h1>
                {arregloTodos.map(
                    (todo:Todo)=>{
                        return(
                            <li key={todo.id}>
                                {todo.id}  {todo.completed}
                                <a href={'/i_todos/'+todo.id}>
                                    {todo.title}
                                </a>
                            </li>
                        )
                    }
                )}
            </Layout>
        </>
    )
}