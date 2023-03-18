import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventosModule} from "./eventos/eventos.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {NotaEntity} from "./nota/nota.entity";
import {NotaModule} from "./nota/nota.module";
import {SOEntity} from "./SistemasOperativos/SistemasOperativos.entity";
import {SOModule} from "./SistemasOperativos/SistemasOperativos.module";
import {aplicacionesEntity} from "./aplicaciones/aplicaciones.entity";
import {apliModule} from "./aplicaciones/aplicaciones.module";

@Module({
  imports: [ ///importamos otrso modulos
      EventosModule,
      TypeOrmModule.forRoot({
          type:'sqlite',
          database:'./bdd/bdd.sqlite',
          entities: [
            UsuarioEntity,
              NotaEntity,
              SOEntity,
              aplicacionesEntity
          ],//emtidades de todo el aplicativo
          synchronize:true,//true edita columnas y tablas
          dropSchema:false, // true borra toda la base de datos
      }),
      UsuarioModule,
      NotaModule,
      SOModule,
      apliModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
