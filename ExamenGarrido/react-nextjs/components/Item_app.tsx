import {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Button, DropdownButton, Modal} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import {app} from "../servicios/aplicaciones/app.http";
import {useRouter} from "next/router";

export default function (app:app){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useRouter()
    const {id_so} = router.query

    return(
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">ID:{app.id} {app.nombre}</div>
                <div>Version: {app.version}</div>
                <div>Es software libre: {app.esLibre.toString()}</div>
            </div>
            <DropdownButton className={"mt-2"} id="dropdown-basic-button" title="">
                {/*Editar*/}
                <Dropdown.Item href={'/examen/'+Number(id_so)+'/app/'+app.id}>Editar</Dropdown.Item>

                {/*Aqui eliminar*/}
                <Dropdown.Item onClick={handleShow}>Eliminar</Dropdown.Item>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Sistema Operativo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Desea eliminar la aplicacion: {app.nombre}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={ ()=> {borrar(app.id)}}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </DropdownButton>
        </ListGroup.Item>
    )
}

function borrar(id:Number){
    const url = `http://localhost:60/aplicacion/${id}`
    fetch(url,{method:'DELETE'})
        .then(()=>console.log("borrado con exito"))
}