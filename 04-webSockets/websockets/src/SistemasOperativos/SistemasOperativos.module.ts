import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SOEntity} from "./SistemasOperativos.entity";
import {SOService} from "./SistemasOperativos.service";
import {SOController} from "./SistemasOperativos.controller";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [SOEntity],
            'default'
        ),
    ],
    providers:[SOService],
    exports:[SOService],
    controllers:[SOController]
})

export class SOModule{

}