import {isString, isNotEmpty, IsNotEmpty, IsString, IsIn} from "class-validator";


export class UsuarioCreateDTO{
    @IsNotEmpty()
    @IsString()
    nombres:string;

    @IsNotEmpty()
    @IsString()
    apellidos:string;

    @IsNotEmpty()
    @IsIn(['U','A'])
    rol:string


}