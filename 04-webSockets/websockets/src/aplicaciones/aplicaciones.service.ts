import {InjectDataSource} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {DataSource, FindManyOptions} from "typeorm";
import {aplicacionesEntity} from "./aplicaciones.entity";
import {apliCreateDTO} from "./dto/create_update";



@Injectable()
export class apliService{
    constructor(
        @InjectDataSource()
        public datasource:DataSource
    ) {
    }

    public apliRepository = this.datasource.getRepository(aplicacionesEntity)

    find(opciones:FindManyOptions<aplicacionesEntity>){
        return this.apliRepository.find(opciones)
    }

    findOneById(id:number){

        return this.apliRepository.findOne({
            where:{
                id:id
            }
        })
    }


    create(datosCrear:apliCreateDTO){
        return this.apliRepository.save(datosCrear);
    }

    update(datosActualizar:apliCreateDTO,id:number){
        return this.apliRepository.save(
            {...datosActualizar,id});
    }

    delete(id:number){
        return this.apliRepository.delete(id)
    }


}