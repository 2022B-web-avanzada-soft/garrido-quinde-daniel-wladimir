import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {DataSource, FindManyOptions} from "typeorm";
import {UsuarioCreateDTO} from "./dto/usuario-create";
import {UsuarioUpdateDTO} from "./dto/usuario-update";


@Injectable()
export class UsuarioService{
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}

    public usuarioRepository = this.datasource.getRepository(UsuarioEntity);
    find(opciones: FindManyOptions<UsuarioEntity>) {
        return this.usuarioRepository.find(opciones)
    }
    findOneById(id: number) {
        return this.usuarioRepository.findOne({
            // select:{ },
            where: {
                id: id
            },
        })
    }
    create(datosCrear: UsuarioCreateDTO) {
        return this.usuarioRepository.save(datosCrear);
    }
    update(datosActualizar: UsuarioUpdateDTO, id: number) {
        return this.usuarioRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.usuarioRepository.delete(id);
    }



}