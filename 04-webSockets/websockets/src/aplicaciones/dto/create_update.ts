import {IsBoolean, IsNotEmpty, IsNumber, IsString, isString} from "class-validator";


export class apliCreateDTO{

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsBoolean()
    esLibre:boolean

    @IsNumber()
    version:number
}