import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import MensajeChat, {MensajeChatProps} from "../components/i_websockets/MensajeChat";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";


const servidorWebsocket = 'http://localhost:61/';
const socket = io(servidorWebsocket)

export interface FormularioModelo{
    salaId:string,
    nombre:string,
    mensaje:string
}

export type MensajeSala = FormularioModelo
//los tipos se pueden igualar a interfaces y tambien pueden ser interfaces
//ademas los tipos tienen los and or
// export type MensajeSala = FormularioModelo & Date

export default function (){
    const [isConnected,setIsConnected] = useState(socket.connected)
    const [mensajes,setMensaje] = useState([] as MensajeChatProps[]);

    const {control,register,handleSubmit,formState:{errors,isValid}} = useForm({
        defaultValues:{
            salaId:'',
            nombre:'',
            mensaje:''
        },mode: 'all'
    })

    useEffect(
        ()=>{
            socket.on('connect', () => {
            setIsConnected(true);
            console.log('Si esta conectado');
        });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No esta conectado');
            });
            socket.on('escucharEventoHola',(data: {mensaje:string})=>{
                console.log('escuchareventoHOLA')//aca llega el body de los mensajes
                const nuevoMensaje:MensajeChatProps ={
                    mensaje: data.mensaje,
                    nombre:'SISTEMA',
                    posicion:'I'
                };
                setMensaje((mensajesanteriores)=>[...mensajesanteriores,nuevoMensaje])
            });

            socket.on('escucharEventoUnirseSala',(data:{mensaje:string})=>{
                console.log('escuchareventoUnirseSala')
                    const nuevoMensaje:MensajeChatProps ={
                        mensaje:data.mensaje,
                        nombre:'Prueba',
                        posicion:'I'
                    };
                    setMensaje((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])
            });

            socket.on('escucharEventoMensajeSala', (data: MensajeSala) => {

                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.salaId + ' - ' + data.mensaje,
                    nombre: data.nombre,
                    posicion: 'I'
                };
                setMensaje((mensajesAnteriores) => [...mensajesAnteriores,
                    nuevoMensaje]);
                console.log('escucharEventoMensajeSala');

            });
        },
        []
    )

    const enviarEventoHola = ()=> {
        const nuevoMensaje: MensajeChatProps = {
            mensaje: 'Adrian',
            nombre: 'Sistema',
            posicion: 'I'
        }


        socket.emit(
            'hola',//nombre del evento que lanzo
            nuevoMensaje, //datos evento
            (datosEventoHola) => {//callback del evento/respuesta
                console.log(datosEventoHola)//{mensaje 'ok'}
                setMensaje((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            }
        )
    };

    const unirseSalaOEnviarMensajeASala = (data:FormularioModelo)=>{
        if (data.mensaje === '') {
            //unimos a la sala
            const dataEventUnirseSala = {
                salaId:data.salaId,
                nombre:data.nombre
            };
            socket.emit(
                'unirseSala', //nombre evento en el backend
                dataEventUnirseSala,
                ()=>{
                    const nuevoMensaje:MensajeChatProps={
                        mensaje:'Bienvenido a la sala: ' + dataEventUnirseSala.salaId,
                        nombre:'Sistema',
                        posicion:'I'
                    };
                    setMensaje((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])
                    //      LAS DOS FORMAS HACEN LO MISMO, pero el callback es en casos especiales
                    //     const [nombre, setNombre] = useState('Adrian')
                    //      setNombre('Vicente')
                    //     const [arreglo, setArreglo] = useState([1,2])
                    //      setArreglo( [1,2,3] ) // Metodo1: SIN CALLBACK
                    //      setArreglo( ([1,2])=> [ ...[1,2], 3 ]) => [1,2,3] // Metodo2: CON CALLBACK
                }

            )
        }else {
            //mandamos mensaje
            const dataEventoEnviarMensajeSala = {
                salaId:data.salaId,
                nombre:data.nombre,
                mensaje:data.mensaje
            };
            socket.emit(
                'enviarMensaje',
                dataEventoEnviarMensajeSala,
                ()=>{
                    const nuevoMensaje:MensajeChatProps ={
                        mensaje:data.salaId +' - '+data.mensaje,
                        nombre:data.nombre,
                        posicion:'D'
                    };
                    setMensaje((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])
                }

            )
        }
    }

    return(
        <>
            <Layout title={"Formularo"}>
                <h1>Websockets</h1>
                <button className={"btn btn-succes"} onClick={()=>enviarEventoHola()}>Enviar evento Hola</button>
                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <h1>FORMULARIO</h1>
                            <div className={"row"}>
                                <div className={"col-sm-6"}>
                                    <form onSubmit={handleSubmit(unirseSalaOEnviarMensajeASala)}>
                                        <div className={"mb-3"}>
                                            <label htmlFor={"salaId"} className={"form-label"}>Sala ID</label>
                                            <input type={"text"} className={"form-control"} placeholder={"EJ: 123"}
                                                   id={"salaId"} {...register('salaId',{required:'Ingresar salaID'})}
                                                aria-describedby={"salaIdHelp"}/>
                                            <div id={"salaidHelp"} className={"form-text"}>
                                                Ingresa tu idSala
                                            </div>
                                            {errors.salaId &&
                                                <div className={"alert alert-warning"}>
                                                    Tiene errores {errors.salaId.message}
                                                </div>
                                            }
                                        </div>
                                        <div className={"mb-3"}>
                                            <label htmlFor={"nombre"} className={"form-label"}>Nombre</label>
                                            <input type={"text"} className={"form-control"} placeholder={"EJ: Daniel"}
                                                   id={"nombre"} {...register('nombre',{required:'Ingresar Nombre'})}
                                                   aria-describedby={"salaIdHelp"}/>
                                            <div id={"nombreHelp"} className={"form-text"}>
                                                Ingresa tu idSala
                                            </div>
                                            {errors.salaId &&
                                                <div className={"alert alert-warning"}>
                                                    Tiene errores {errors.salaId.message}
                                                </div>
                                            }
                                        </div>Nombre
                                        <div className={"mb-3"}>
                                            <label htmlFor={"mensaje"} className={"form-label"}>Mensaje</label>
                                            <input type={"text"} className={"form-control"} placeholder={"EJ: 1000"}
                                                   id={"mensaje"} {...register('mensaje')}
                                                   aria-describedby={"salaIdHelp"}/>
                                            <div id={"mensajeHelp"} className={"form-text"}>
                                                Ingresa tu idSala
                                            </div>
                                            {errors.salaId &&
                                                <div className={"alert alert-warning"}>
                                                    Tiene errores {errors.salaId.message}
                                                </div>
                                            }
                                        </div>Mensaje
                                        <button type={"submit"}
                                                disabled={!isValid}
                                                className={"btn btn-warning"}>
                                            Unirse sala
                                        </button>
                                        <button type={"reset"}
                                                className={"btn btn-danger"}>
                                            Reset
                                        </button>
                                    </form>
                                </div>
                            </div>
                    </div>
                    <div className={"col-sm-6"}>
                        {mensajes.map((mensajes,indice)=>
                        <MensajeChat key={indice}
                            mensaje={mensajes.mensaje}
                            nombre={mensajes.nombre}
                            posicion={mensajes.posicion}></MensajeChat> )}
                    </div>
                </div>
            </Layout>
        </>
    )
}