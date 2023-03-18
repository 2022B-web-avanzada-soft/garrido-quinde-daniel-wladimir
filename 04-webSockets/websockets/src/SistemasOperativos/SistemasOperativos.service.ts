import {Injectable} from "@nestjs/common";
import {DataSource, FindManyOptions} from "typeorm";
import {InjectDataSource} from "@nestjs/typeorm";
import {SOEntity} from "./SistemasOperativos.entity";
import {SOCreateDTO} from "./dto/SO-create";

@Injectable()
export class SOService{
    constructor(
        @InjectDataSource()
        public datasource:DataSource
    ) {}

    public soRepository = this.datasource.getRepository(SOEntity);

    find(opciones:FindManyOptions<SOEntity>){
        return this.soRepository.find(opciones)
    }

    findOneById(id:number){
        return this.soRepository.findOne({
            relations:['aplicaciones'],
            where:{
                id:id
            }
        })
    }


    create(datosCrear:SOCreateDTO){
        return this.soRepository.save(datosCrear);
    }

    update(datosActualizar:SOCreateDTO,id:number){
        return this.soRepository.save(
            {...datosActualizar,id});
    }

    delete(id:number){
        return this.soRepository.delete(id)
    }
}