//logica de negocio
//solo UNA instancia*SINGELTON

import {Server,Socket} from "socket.io"
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {interval, timeout} from "rxjs";

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
            return {mensaje: 'Ok'}
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
        socket.broadcast
            .to(message.salaId) // Sala a la que enviamos el mensaje
            .emit('escucharEventoMensajeSala', mensajeSala); // nombre del evento y datos a enviar
        return {mensaje: 'ok'}; // Callback
    }


}