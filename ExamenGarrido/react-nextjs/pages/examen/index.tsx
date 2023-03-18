import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Button} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Item_so from "../../components/Item_so";


export default function examen(){

    return(
        <>

               <Container>
                   <Row className={"text-center"}>
                       <span className={"fs-3"}>Examen Daniel Garrido</span>
                       <span>Entidades: Sistema Operativo-Aplicaciones</span>
                   </Row>
                   <Row >
                       <div className={"d-flex justify-content-end"}>
                           <Button variant="success" size={"sm"}>
                               Insertar Nuevo Sistema Operativo</Button>{' '}
                       </div>
                   </Row>
               </Container>

                <Container className={"mt-3"}>
                    <ListGroup as="ol" >
                        <Item_so></Item_so>
                    </ListGroup>
                </Container>
        </>
    )
}