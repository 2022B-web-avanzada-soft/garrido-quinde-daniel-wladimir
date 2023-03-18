import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param, Post, Put, Query,
    UnauthorizedException
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDTO} from "./dto/usuario-create";
import {UsuarioUpdateDTO} from "./dto/usuario-update";
import {validate} from "class-validator";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";


/*
htttp: localhost:3000//usuario   => @Controller('usuario')
htttp: localhost:3000//usuario/asd/qwe   => @Controller('usuario/asd/qwe')
*/
@Controller('usuario')
export class UsuarioController{
    constructor(
        private readonly  usuarioServide: UsuarioService//inyeccion de depndecnias
    ) {
    }

    @Get("/:id") // GET /usuario/1
    @HttpCode(200)
    findOneById(
        // "/:id/notas/:idNota"
        @Param() params // {id:1, idNota:12}
    ) {
        return this.usuarioServide.findOneById(+params.id); // +"1" = 1
    }

    @Delete("/:id") // DELETE /usuario/:id
    @HttpCode(200)
    delete(
        // "/:id/notas/:idNota"
        @Param() params // {id:1, idNota:12}
    ) {
        return this.usuarioServide.delete(+params.id);
    }

    @Put("/:id") // PUT /usuario/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new UsuarioUpdateDTO();
        nuevoRegistro.nombres = bodyParams.nombres;
        nuevoRegistro.apellidos = bodyParams.apellidos;
        nuevoRegistro.rol = bodyParams.rol;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.usuarioServide.update(
            bodyParams,
            +params.id
        );
    }


    @Post("/") // POST /usuario
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new UsuarioCreateDTO();
        nuevoRegistro.nombres = bodyParams.nombres;
        nuevoRegistro.apellidos = bodyParams.apellidos;
        nuevoRegistro.rol = bodyParams.rol;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.usuarioServide.create(nuevoRegistro);
    }

    @Get("/") // GET /usuario/
    @HttpCode(200)
    find(
        @Query() queryParams
    ) {
        const consulta: FindManyOptions<UsuarioEntity> = {
            relations: ['notas'],
            // select: ['id'], // Select
            // relations: { //  Relaciones
            //     notas: true
            // },
            skip: queryParams.skip ? +queryParams.skip : 0 , // 2 * 0 = 0 ; 2 * 1 = 2; 2 * 2 = 4;
            take: queryParams.take ? +queryParams.take : 10
        };
        const consultaWhere = [] as FindOptionsWhere<UsuarioEntity>[]
        if(queryParams.nombres){
            consultaWhere.push({
                nombres: Like('%' + queryParams.nombres + '%'), // dr
                rol: queryParams.rol ? queryParams.rol : undefined // U
            })
        }
        if(queryParams.apellidos){
            consultaWhere.push({
                apellidos: Like('%' + queryParams.apellidos + '%'), // dr
                rol: queryParams.rol ? queryParams.rol : undefined, // U
            })
        }
        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.usuarioServide.find(consulta)

    }











    // 1 Informativo
    // 2 OK
    // 3 Redireccion
    // 4 Error cliente
    // 5 Error servidor
    // parametros:
    // 1 QueryParams ?id=1&consulta=Adrian
    // 2 BodyParams (viajan en el formulario)
    // 3 Parametros de ruta /usuario/:id/notas

}