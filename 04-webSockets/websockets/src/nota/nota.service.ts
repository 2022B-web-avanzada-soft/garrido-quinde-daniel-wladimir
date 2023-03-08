import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {NotaEntity} from "./nota.entity";
import {DataSource, FindManyOptions} from "typeorm";
@Injectable()
export class NotaService {
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {
    }

    public notaRepository = this.datasource.getRepository(NotaEntity)

    find(opciones: FindManyOptions<NotaEntity>) {
        return this.notaRepository.find(opciones)
    }
    findOneById(id: number) {
        return this.notaRepository.findOne({
            // select:{ },
            where: {
                id: id
            },
        })
    }
    create(datosCrear: any) {
        return this.notaRepository.save(datosCrear);
    }
    update(datosActualizar: any, id: number) {
        return this.notaRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.notaRepository.delete(id);
    }

}