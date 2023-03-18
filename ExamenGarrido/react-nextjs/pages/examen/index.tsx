import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Button} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Item_so from "../../components/Item_so";
import {useEffect, useState} from "react";
import {so, soHttp} from "../../servicios/so/so.http";
import DeleteModal from "../../components/DeleteModal";


export default function (){

    const [arregloSO,setArregloSO] = useState([] as so[])

    useEffect(
        ()=>{
            consultarTodos();
        },
        []
    )

    const consultarTodos = async  ()=>{
        const resultado = await soHttp();
        setArregloSO([
            ...arregloSO,
            ...resultado
        ]);
    }


    return(
        <>
               <Container>
                   <Row className={"text-center"}>
                       <span className={"fs-3"}>Examen Daniel Garrido</span>
                       <span>Entidades: Sistema Operativo-Aplicaciones</span>
                   </Row>
                   <Row >
                       <div className={"d-flex mt-2 justify-content-end"}>
                           <Button variant="success" href={'/examen/-1'} size={"sm"}>
                               Insertar Nuevo Sistema Operativo</Button>{' '}
                       </div>
                   </Row>
               </Container>

                <Container className={"mt-3"}>
                    <ListGroup as="ol" >
                        {arregloSO.map(
                            (so) => {
                                return (
                                    <Item_so id={so.id} nombre={so.nombre} esLibre={so.esLibre}
                                    fechaLanzamiento={so.fechaLanzamiento} aplicaciones={so.aplicaciones}></Item_so>
                                )
                            }
                        )}
                    </ListGroup>
                </Container>
        </>
    )
}