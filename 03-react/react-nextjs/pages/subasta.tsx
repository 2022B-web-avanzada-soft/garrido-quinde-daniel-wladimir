import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MensajeChat, {MensajeChatProps} from "../components/i_websockets/MensajeChat";
import {io} from "socket.io-client";
import {type} from "os";
import {validate} from "@babel/types";
import carusel from "../components/deber/carusel";
import {fontFamily} from "@mui/system";
const servidorWebsocket = 'http://localhost:61/';
const socket = io(servidorWebsocket)


export interface FormularioModelo{
    salaId:string,
    nombre:string,
    mensaje:number
}
export type MensajeSala = FormularioModelo
export const arregloDeProductos = {"products":[
    {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg"},
        {"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg"},
        {"id":3,"title":"Samsung Universe 9","description":"Samsung's new variant which goes beyond Galaxy to the Universe","price":1249,"thumbnail":"https://i.dummyjson.com/data/products/3/thumbnail.jpg"},
        {"id":4,"title":"OPPOF19","description":"OPPO F19 is officially announced on April 2021.","price":280,"thumbnail":"https://i.dummyjson.com/data/products/4/thumbnail.jpg"},
        {"id":5,"title":"Huawei P30","description":"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.","price":499,"thumbnail":"https://i.dummyjson.com/data/products/5/thumbnail.jpg"},
        {"id":6,"title":"MacBook Pro","description":"MacBook Pro 2021 with mini-LED display may launch between September, November","price":1749,"thumbnail":"https://i.dummyjson.com/data/products/6/thumbnail.png"},
        {"id":7,"title":"Samsung Galaxy Book","description":"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched","price":1499,"thumbnail":"https://i.dummyjson.com/data/products/7/thumbnail.jpg"},
        {"id":8,"title":"Microsoft Surface Laptop 4","description":"Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.","price":1499,"thumbnail":"https://i.dummyjson.com/data/products/8/thumbnail.jpg"},
        {"id":9,"title":"Infinix INBOOK","description":"Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty","price":1099,"thumbnail":"https://i.dummyjson.com/data/products/9/thumbnail.jpg"},
        {"id":10,"title":"HP Pavilion 15-DK1056WM","description":"HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10","price":1099,"thumbnail":"https://i.dummyjson.com/data/products/10/thumbnail.jpeg"}
    ],"total":100,"skip":0,"limit":10}

export default function (){

    const [isConnected,setIsConnected] = useState(socket.connected)
    const [mensajes,setMensaje] = useState([{mensaje:"Bienvenido al chat en vivo",posicion:"I",nombre:"SISTEMA"}] as MensajeChatProps[]);

    const {control,getValues,register,handleSubmit,formState:{errors,isValid}} = useForm({
        defaultValues:{
            salaId:'',
            nombre:'',
            mensaje:1
        },mode: 'all'
    })

    const [salaID,setSalaid] = useState(0)
    const [precio,setPrecio] = useState(0)
    const [ultimoPrecio,setUltimoPrecio] = useState(0)

    //parte del form
    const generarJSXElementCarusel: () => JSX.Element[] = () =>{
        return arregloDeProductos.products.map(
            (producto)=>(
            <div className={"mx-10 my-1.5"}>
                <label htmlFor={producto.title} key={String(producto.id)}>
                    <input
                        {...register('salaId',{required:true})}
                        type="radio"
                        name="salaId"
                        value={String(producto.id)}
                        key={String(producto.id)}
                        className="form-check-input"
                        id={String(producto.id)}
                    />
                    {producto.title}
                </label>
            </div>

            )
        )
    };

    //useeffect
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

            socket.on('escucharEventoUnirseSala',(data:{mensaje:string})=>{
                console.log('escuchareventoUnirseSala')
                const nuevoMensaje:MensajeChatProps ={
                    mensaje:data.mensaje,
                    nombre:'Prueba',
                    posicion:'I'
                };
                setMensaje((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])

            });

            socket.on('escucharEventoMensajeSala',
                (data: MensajeSala) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.salaId + ' - ' + data.mensaje,
                    nombre: data.nombre,
                    posicion: 'I'
                };
                setMensaje((mensajesAnteriores) => [...mensajesAnteriores,
                    nuevoMensaje]);
                console.log('escucharEventoMensajeSala',data);
                    setUltimoPrecio(data.mensaje)

            });
        },
        []
    )

    useEffect(
        ()=>{
            console.log(mensajes.length)
        },[mensajes]
    )


    //funcion
    const unirseSala = (data:FormularioModelo)=>{
            //unimos a la sala
        if (data.mensaje===0 ||data.mensaje===1){
            //console.log("cambio 2 "+data.salaId)
            setSalaid(parseInt(data.salaId))
            const dataEventUnirseSala = {
                salaId:data.salaId,
                nombre:data.nombre
            };
            socket.emit(
                'unirseSala', //nombre evento en el backend
                dataEventUnirseSala,
                (callBack)=>{
                    const nuevoMensaje:MensajeChatProps={
                        mensaje:'Bienvenido a la sala: ' + dataEventUnirseSala.salaId,
                        nombre:'Sistema',
                        posicion:'I'
                    };
                    setMensaje((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])
                    setUltimoPrecio(callBack.precioEnviado)
                    //console.log(callBack.precioEnviado)
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
                (data2)=>{
                    const nuevoMensaje:MensajeChatProps ={
                        mensaje:data.salaId +' - '+data.mensaje,
                        nombre:data.nombre,
                        posicion:'D'
                    };
                    setMensaje((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])
                    setUltimoPrecio(data.mensaje)
                    console.log(data.mensaje)
                }

            )

        }

    }


    return(
        <>
            <div className={""}>
                <form onSubmit={handleSubmit(unirseSala)}>
                <div className={"row text-center text-2xl font-mono"}>
                    <span className={"tracking-wide "}>
                        <b>Sistema de subasta en vivo</b>
                    </span>
                </div>
                <div className={"row text-center form-check"}>
                    <div><span>Elija su producto</span></div>
                        <div className={"grid grid-cols-4 my-5"}>
                            {generarJSXElementCarusel()}
                        </div>

                            <div className={"my-2.5"}>
                                <label htmlFor={"nombre"} className={"form-label mx-5"}>Nombre</label>
                                <input type={"text"} className={"form-control text-black"} placeholder={"  EJ: Daniel"}
                                       id={"nombre"} {...register('nombre',{required:true, pattern: /^[A-Za-z]+$/i})}
                                       aria-describedby={"salaIdHelp"}/>
                                <div id={"nombreHelp"} className={"form-text my-2"}>
                                    Ingresa tu Nombre
                                </div>
                            </div>

                        <div className={"my-5"}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Ingresar a sala
                            </button>
                        </div>
                </div>

                <div className={"text-center my-10"}>
                    <span>Chat</span>
                </div>

                    {/*Parte de abajo*/}
                <div className={"grid grid-cols-3 text-center"}>
                    <div className={""}>
                            <div className={"my-2.5 "}>
                                <label htmlFor={"mensaje"} className={" mx-5"}>Valor</label>
                                <input type={"text"} className={"text-black"}  placeholder={"  EJ: 25"}
                                       id={"mensaje"}  {...register('mensaje',{valueAsNumber:true,
                                    validate:(value)=> value > ultimoPrecio
                                       })}
                                       aria-describedby={"salaIdHelp"}/>
                                <div id={"nombreHelp"} className={"form-text my-2"}>
                                    Ingresa tu Valor
                                </div>
                            </div>

                            <div className={"my-5"}>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                    Enviar Propuesta
                                </button>
                            </div>
                    </div>

                    <div className={""}>
                        {mensajes.map((mensajes,indice)=>
                            <MensajeChat key={indice}
                                         mensaje={mensajes.mensaje}
                                         nombre={mensajes.nombre}
                                         posicion={mensajes.posicion}></MensajeChat> )}
                    </div>
                    <div className={"grid grid-rows-3 grid-flow-col "}>
                        {carusel(salaID,ultimoPrecio)}
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}