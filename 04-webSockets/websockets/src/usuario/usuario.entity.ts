import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Column} from "typeorm";
import {NotaEntity} from "../nota/nota.entity";

@Entity('epn_usuario')//nombre de la tabla
export class UsuarioEntity{
    //id autogenerado
    @PrimaryGeneratedColumn()
    id:number;
    //columna en la bdd
    @Column({
        name:'user_nombres',//nombre campo bdd
        type:'varchar',//tipo campo bdd
        length:60, //longitud campo bdd
        nullable:false//si es nullable
    })
    nombres:string//nombre objeto

    @Column({
        name:'user_apellidos',//nombre campo bdd
        type:'varchar',//tipo campo bdd
        length:60, //longitud campo bdd
        nullable:false//si es nullable
    })
    apellidos:string//nombre objeto

    @Column({
        name:'user_rol',//nombre campo bdd
        type:'varchar',//tipo campo bdd
        length:1, //longitud campo bdd
        nullable:false,//si es nullable
        default:'U',
        comment:'U = user y A=admin'
    })
    rol:string//nombre objeto


    @OneToMany(
        () => NotaEntity, //entidad hija
        (instanciaNotaEntity) => (instanciaNotaEntity.usuario))
    notas:NotaEntity[]
}