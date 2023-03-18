import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param, Post, Put, Query,
} from "@nestjs/common";
import {apliService} from "./aplicaciones.service";
import {validate} from "class-validator";
import {apliCreateDTO} from "./dto/create_update";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {aplicacionesEntity} from "./aplicaciones.entity";
import {get} from "http";
import {equal} from "assert";

@Controller('aplicacion')
export class apliController{
    constructor(
        private readonly apliService:apliService
    ) {
    }

    @Get("/:id")
    @HttpCode(200)
    findOneById(
        @Param() params
    ){
        return this.apliService.findOneById(+params.id)
    }



    @Delete("/:id")
    @HttpCode(200)
    delete(@Param() params){
        return this.apliService.delete(+params.id)
    }

    @Put("/:id")
    @HttpCode(200)
    async update(
        @Param() params,
        @Body() bodyParams
    ) {
        const nuevoRegistro = new apliCreateDTO();
        nuevoRegistro.nombre = bodyParams.nombre;
        nuevoRegistro.esLibre = bodyParams.esLibre
        nuevoRegistro.version = bodyParams.version
        const arregloErrores = await validate(nuevoRegistro);
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw  new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.apliService.update(
            bodyParams, +params.id
        )
    }


    @Post("/")
    @HttpCode(201)
    async create(
        @Body() bodyParams
    ){

        return this.apliService.create(bodyParams)
    }

    @Get("/")
    @HttpCode(200)
    find(@Query() queryParams) {
        const consulta: FindManyOptions<aplicacionesEntity> ={
            relations:['so'],
            skip:queryParams.skip ? +queryParams.skip : 0,
            take:queryParams.take ? +queryParams.take : 10
        };
        const consultaWhere = [] as FindOptionsWhere<aplicacionesEntity>[]

        if (queryParams.nombre){
            consultaWhere.push({
                nombre:Like('%' + queryParams.nombre + '%'),
                version: queryParams.version ? queryParams.version:undefined,
            })
        }
        if (queryParams.appid){
            consultaWhere.push({
            })
        }
        if (queryParams.listaIds) {

            consulta.select = ['id']
            consulta.relationLoadStrategy='join'
        }

        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.apliService.find(consulta)
    }


}