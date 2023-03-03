//logica de negocio
//solo UNA instancia*SINGELTON

import {Server,Socket} from "socket.io"
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {interval, timeout} from "rxjs";

export const productos =  {"products":[
    {"id":1,"title":"iPhone 9","price":549,"thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg"},
        {"id":2,"title":"iPhone X","price":899,"thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg"},
        {"id":3,"title":"Samsung Universe 9","price":1249,"thumbnail":"https://i.dummyjson.com/data/products/3/thumbnail.jpg"},
        {"id":4,"title":"OPPOF19","price":280,"thumbnail":"https://i.dummyjson.com/data/products/4/thumbnail.jpg"},
        {"id":5,"title":"Huawei P30","price":499,"thumbnail":"https://i.dummyjson.com/data/products/5/thumbnail.jpg"},
        {"id":6,"title":"MacBook Pro","price":1749,"thumbnail":"https://i.dummyjson.com/data/products/6/thumbnail.png"},
        {"id":7,"title":"Samsung Galaxy Book","price":1499,"thumbnail":"https://i.dummyjson.com/data/products/7/thumbnail.jpg"},
        {"id":8,"title":"Microsoft Surface Laptop 4","price":1499,"thumbnail":"https://i.dummyjson.com/data/products/8/thumbnail.jpg"},
        {"id":9,"title":"Infinix INBOOK","price":1099,"thumbnail":"https://i.dummyjson.com/data/products/9/thumbnail.jpg"},
        {"id":10,"title":"HP Pavilion 15-DK1056WM","price":1099,"thumbnail":"https://i.dummyjson.com/data/products/10/thumbnail.jpeg"}
    ],"total":10,"skip":0,"limit":10}

const findProductById = (id) =>{
    const key = Object.keys(productos.products).find(product =>
        productos.products[product].id === id)
    return productos.products[key]
}

const fast = interval(5000)
timeout({
    each:1000,
    with:()=>fast
})

@WebSocketGateway(
    61,//puerto donde esta escuchando el servido de websockets
    {
        cors:{
            origin: '*'//habilitando la conexion desde cualquier IP
        }
    }
    )




export class EventosGateway{
    @SubscribeMessage('hola')//nombre del metodo para recibir eventos
    devolverHola(
        @MessageBody()
            message:{mensaje:string},
        @ConnectedSocket()
            socket:Socket
    ){
        console.log('mesage',message)
        socket.broadcast
            .emit(
                'escucharEventoHola',//nombre del evento que vamos a enviar a los clientes conectados
                {
                    mensaje:'Bienvenido' + message.mensaje
                }
            );
        return {mensaje: 'Ok'}
    }


    @SubscribeMessage('unirseSala')//nombre del metodo para recibir eventos
    unirseSala(
        @MessageBody()
            message:{salaId:string,nombre:string}, //parametro del metodo
        @ConnectedSocket()
            socket:Socket
    ){
        //console.log('mesage',message)

        socket.join(message.salaId)//agrupa a los clientes de websockets segun el identificador, los deja en una sola sala
        const mensajeDeBienvenida = {
            mensaje: `Bienvenido ${message.nombre} a la sala ${message.salaId}`
        };
            socket.broadcast
                .to(message.salaId)//se especifica a un grupo con cierto id
                .emit(
                    'escucharEventoUnirseSala',//nombre del evento que vamos a enviar a los clientes conectados
                    mensajeDeBienvenida
                );
            //return {mensaje: }
            return {precioEnviado:findProductById(parseInt(message.salaId)).price}
    }



    // @SubscribeMessage('enviarMensaje')//nombre del metodo para recibir eventos
    // enviarMensaje(
    //     @MessageBody()
    //         message:{salaId:string,nombre:string,mensaje:string}, //parametro del metodo
    //     @ConnectedSocket()
    //         socket:Socket
    // ){
    //     //backend
    //     const mensajeSala ={
    //         nombre:message.nombre,
    //         mensaje:message.mensaje,
    //         salaId:message.salaId
    //     };
    //     socket.broadcast
    //         .to(message.salaId)//se especifica a un grupo con cierto id
    //         .emit(
    //             'escucharEventoMensajeSala',//nombre del evento que vamos a enviar a los clientes conectados
    //             mensajeSala
    //         );
    //     return {mensaje: 'Ok'}
    // }

    @SubscribeMessage('enviarMensaje') // nombre del metodo "enviarMensaje"
    enviarMensaje(
        @MessageBody()
            message: { salaId: string, nombre: string, mensaje: string },
        @ConnectedSocket()
            socket: Socket
    ) {
        // backend
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        };
        let objetoCambiar = findProductById(parseInt(message.salaId))
        objetoCambiar.price=message.mensaje
        socket.broadcast
            .to(message.salaId) // Sala a la que enviamos el mensaje
            .emit('escucharEventoMensajeSala', mensajeSala); // nombre del evento y datos a enviar
        return {mensaje: {precioEnviado:findProductById(parseInt(message.salaId)).price}}; // Callback
    }


}