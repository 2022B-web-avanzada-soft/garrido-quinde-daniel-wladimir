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
import {validate} from "class-validator";
import {SOService} from "./SistemasOperativos.service";
import {SOCreateDTO} from "./dto/SO-create";
import {SOEntity} from "./SistemasOperativos.entity";
import {Equal, FindManyOptions, FindOneOptions, FindOptionsSelectProperty, FindOptionsWhere, Like} from "typeorm";
import path from "path";




@Controller('sisOpe')
export class SOController{
    constructor(
        private readonly SOService:SOService
    ) {
    }

    @Get("/:id")
    @HttpCode(200)
    findOneById(
        @Param() params
    ){
        return this.SOService.findOneById(+params.id)
    }


    @Delete("/:id")
    @HttpCode(200)
    delete(@Param() params){
        return this.SOService.delete(+params.id)
    }

    @Put("/:id")
    @HttpCode(200)
    async update(
        @Param() params,
        @Body() bodyParams
    ){
        const nuevoRegistro = new SOCreateDTO();
        nuevoRegistro.nombre = bodyParams.nombre;
        nuevoRegistro.esLibre = bodyParams.esLibre
        nuevoRegistro.fechaLanzamiento = bodyParams.fechaLanzamiento
        const arregloErrores = await validate(nuevoRegistro);
        if (arregloErrores.length>0){
            console.error({arregloErrores});
            throw  new BadRequestException({
                mensaje:'Envio mal datos'
            });
        }
        return this.SOService.update(
            bodyParams,+params.id
        )
    }



    @Post("/")
    @HttpCode(201)
    async create(
        @Body() bodyParams
    ){
        const nuevoRegistro = new SOCreateDTO();
        nuevoRegistro.nombre = bodyParams.nombre;
        nuevoRegistro.esLibre = bodyParams.esLibre
        nuevoRegistro.fechaLanzamiento = bodyParams.fechaLanzamiento
        const arregloErrores = await validate(nuevoRegistro);
        if (arregloErrores.length>0){
            console.error({arregloErrores});
            throw  new BadRequestException({
                mensaje:'Envio mal datos'
            });
        }
        return this.SOService.create(nuevoRegistro)
    }
    //

    @Get("/")
    @HttpCode(200)
    find(@Query() queryParams) {
        const consulta: FindManyOptions<SOEntity> ={
            //relations:['aplicaciones'],

            skip:queryParams.skip ? +queryParams.skip : 0,
            take:queryParams.take ? +queryParams.take : 10
        };
        const consultaWhere = [] as FindOptionsWhere<SOEntity>[]

        if (queryParams.nombre){
            consultaWhere.push({
                nombre:Like('%' + queryParams.nombre + '%'),
                fechaLanzamiento: queryParams.fechaLanzamiento ? queryParams.fechaLanzamiento:undefined,
            })
        }
        if (queryParams.soid){
            consultaWhere.push({
                id:Equal(queryParams.soid)
            })
        }

        if (queryParams.listaIds){
            consulta.select = ['id']
        }

        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.SOService.find(consulta)
    }

}