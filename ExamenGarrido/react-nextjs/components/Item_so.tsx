import {Button, DropdownButton, Modal} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import {so} from "../servicios/so/so.http";
import DeleteModal from "./DeleteModal";
import {useState} from "react";



export default function (so:so){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">ID:{so.id} {so.nombre}</div>
                <div>Fecha de lanzamiento: {so.fechaLanzamiento}</div>
                <div>Es software libre: {so.esLibre.toString()}</div>
            </div>
            <DropdownButton className={"mt-2"} id="dropdown-basic-button" title="">
                {/*Editar*/}
                <Dropdown.Item href={'/examen/'+so.id}>Editar</Dropdown.Item>

                {/*Aqui eliminar*/}
                <Dropdown.Item onClick={handleShow}>Eliminar</Dropdown.Item>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Sistema Operativo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Desea eliminar el sistema operativo: {so.nombre}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={ ()=> {borrar(so.id)
                            handleClose}}>
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                {/*Aplicaciones*/}
                <Dropdown.Item href={'/examen/'+so.id+'/app'}>Aplicaciones</Dropdown.Item>
            </DropdownButton>
        </ListGroup.Item>
    )
}

function borrar(id:Number){
    const url = `http://localhost:60/sisOpe/${id}`
    fetch(url,{method:'DELETE'})
        .then(()=>console.log("borrado con exito"))
}

