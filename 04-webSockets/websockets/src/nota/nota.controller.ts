import {Body, Controller, Get, HttpCode, Post} from "@nestjs/common";
import {NotaService} from "./nota.service";

@Controller('nota')
export class NotaController{
    constructor(private readonly NotaService:NotaService) {}



    @Post("/")
    @HttpCode(201)
    async create(
        @Body() bodyParams
    ){
        return this.NotaService.create(bodyParams)
    }


    @Get("/")
    @HttpCode(200)
    async find(){
        return this.NotaService.find({})
    }
}