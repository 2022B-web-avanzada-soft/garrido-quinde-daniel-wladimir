import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {aplicacionesEntity} from "./aplicaciones.entity";
import {apliService} from "./aplicaciones.service";
import {apliController} from "./aplicaciones.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [aplicacionesEntity],
            'default'
        ),
    ],
    providers:[apliService],
    exports:[apliService],
    controllers:[apliController]
})

export class apliModule{

}