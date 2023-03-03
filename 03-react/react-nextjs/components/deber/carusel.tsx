import React from "react";
import {arregloDeProductos} from "../../pages/subasta";



export default function (id:number,valor:number){
     const findProductById = (id) =>{
        const key = Object.keys(arregloDeProductos.products).find(product =>
            arregloDeProductos.products[product].id === id)
        return arregloDeProductos.products[key]
    }

    let producto = findProductById(id)

    if(id===0){
        return(
            <>

            </>
        )
    }else {
        return(
            <>
                <div className={"col-span-2 my-5"}>
                    <b>{producto.title}</b>
                </div>
                <div className={"row-span-2 col-span-2  mx-3 grid-cols-2 py-2"}>
                    <div>
                        Valor Inicial
                    </div>
                    <div className={"py-4"}>
                        <span className={"font-mono text-xl tracking-wider"}><b>{valor}</b></span>
                    </div>

                </div>
                <div className={"row-span-3 "}>
                    <img src={producto.thumbnail}
                         width={"100%"} height={"auto"} />
                </div>
            </>
        )
    }


}