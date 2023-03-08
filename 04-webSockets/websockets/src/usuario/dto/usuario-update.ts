import {IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UsuarioUpdateDTO{
    @IsOptional()
    @IsString()
    nombres:string;

    @IsOptional()
    @IsString()
    apellidos:string;

    @IsOptional()
    @IsIn(['U','A'])
    rol:string


}