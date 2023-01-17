import {useState} from "react";

type PropiedadesComponente = {
  url:string;
  iteraciones:number;
  mostrar?:boolean;
};

export default function (props:PropiedadesComponente){
/*
    const url = props.url
    const mostrar = props.mostrar
    const iteraciones = props.iteraciones
*/
    const {url,mostrar,iteraciones} = props;
    //variables que no son READ-ONLY
    const [iteracion,setIteracion] = useState(iteraciones)
    const contenidoCondicional: () => (JSX.Element) = () => {
        if (mostrar){
            return <p>Hola</p>
        }
        return <></>
    }

    return(
        <>
            <a target="_blank" href={url}>Ir google</a>
            {/*mostrar? <p>Hello </p> : <></>*/}
            {contenidoCondicional()}
            {mostrar &&
                <h1>NO SE VERA</h1>
            }
            <div>
                {iteracion}
            </div>
            <button className="bg-blue-400" onClick={
                (event)=>{
                    console.log(event)
                    setIteracion(iteracion+1)
                }
            }>Aumentar</button>
        </>
    )
}