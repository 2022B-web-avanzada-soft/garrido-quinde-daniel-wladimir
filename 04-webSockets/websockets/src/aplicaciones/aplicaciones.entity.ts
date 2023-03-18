import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SOEntity} from "../SistemasOperativos/SistemasOperativos.entity";

@Entity('epn_aplicaciones')
export class aplicacionesEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name:'apli_nombre',//nombre campo bdd
        type:'varchar',//tipo campo bdd
        length:60, //longitud campo bdd
        nullable:false//si es nullable
    })
    nombre:string//nombre objeto

    @Column({
        name:'esSoftwareLibre',
        type:'boolean',
        default:false,
        nullable:false
    })
    esLibre:boolean

    @Column({
        name:'version',
        type:'double',
        nullable:true
    })
    version:number

    @ManyToOne(
        ()=>SOEntity,
        (instanciaSOEntity) =>
            instanciaSOEntity.aplicaciones,{
            nullable:true
        }
    )
    so:SOEntity
}