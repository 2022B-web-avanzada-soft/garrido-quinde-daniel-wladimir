import {IsBoolean, IsDate, IsNotEmpty, IsString} from "class-validator";

export class SOCreateDTO{
    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsBoolean()
    esLibre:boolean;

    @IsNotEmpty()
    //IsDate()
    fechaLanzamiento:Date

}