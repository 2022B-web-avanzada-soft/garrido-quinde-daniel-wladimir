import {GetStaticPaths, GetStaticProps} from "next";
import {so, soHttp, soHttpAlone, soIdList} from "../../../../servicios/so/so.http";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {app} from "../../../../servicios/aplicaciones/app.http";
import Item_so from "../../../../components/Item_so";
import Item_app from "../../../../components/Item_app";

export default function (){
    const router = useRouter()
    const {id_so} = router.query
    const [so,setSO] = useState({} as so)
    const [arregloApps,setArregloApps] = useState([] as app[])

    useEffect(
        ()=>{
            consultarTodos();
        },
        []
    )
    const consultarTodos = async  ()=>{
        const respuesta = await soHttpAlone(id_so[0])
        setSO(respuesta)
    }



    return(
        <>
            <Container>
                <Row className={"text-center"}>
                    <span className={"fs-3"}>Examen Daniel Garrido</span>
                    <span>Entidades: Sistema Operativo-Aplicaciones</span>
                    <span>Aplicaciones del sistema operativo: {so.nombre}</span>
                </Row>
                <Row >
                    <div className={"d-flex mt-2 justify-content-end"}>
                        <Button variant="success" href={'/examen/'+so.id+'/app/-1'} size={"sm"}>
                            Insertar Nueva Aplicacion</Button>{' '}
                    </div>
                </Row>
            </Container>

            <Container className={"mt-3"}>
                <ListGroup as="ol" >
                    {so.aplicaciones?.map(
                        (app) => {
                            return (
                               <Item_app id={app.id} nombre={app.nombre}
                                         esLibre={app.esLibre} version={app.version} key={app.id}></Item_app>
                            )
                        }
                    )}
                </ListGroup>
            </Container>
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
    const paths = []
    const lista = await soIdList()
    lista.map(
        (soID) =>{
            paths.push({params:{id_so:soID.id.toString()}})
        })
    return {paths,fallback:false}
}