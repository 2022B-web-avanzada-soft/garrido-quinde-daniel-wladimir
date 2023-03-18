import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {aplicacionesEntity} from "../aplicaciones/aplicaciones.entity";

@Entity('epn_so')
export class SOEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name:'nombres',
        type:'varchar',
        length:60,
        nullable:true
    })
    nombre:string

    @Column({
        name:'esSoftwareLibre',
        type:'boolean',
        default:false,
        nullable:false
    })
    esLibre:boolean

    @Column({
        name:'fechaLanzamiento',
        type:'date',
        nullable:false
    })
    fechaLanzamiento:Date

    @OneToMany(
        ()=>aplicacionesEntity,
        (instanciaAplicacionEntity)=>(instanciaAplicacionEntity.so)
    )
    aplicaciones:aplicacionesEntity[]

}