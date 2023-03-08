import {Module} from "@nestjs/common";
import {NotaController} from "./nota.controller";
import {NotaService} from "./nota.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotaEntity} from "./nota.entity";

@Module({
    controllers:[NotaController],
    providers:[NotaService],
    exports:[NotaService],
    imports: [TypeOrmModule.forFeature(
        [NotaEntity]
    )]
})
export class NotaModule{

}