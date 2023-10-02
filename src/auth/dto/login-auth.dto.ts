import {IsEmail, IsString, MinLength, IsNotEmpty} from 'class-validator'
import { Transform } from 'class-transformer'
export class LoginAuthDto{
  
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsNotEmpty({message:"El correo electrónico es obligatorio"})
    @IsEmail()

    email : string

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsNotEmpty({message:"La contraseña es obligatoria"})
    @IsString({message: "La contraseña debe contener números y letras"})
    @MinLength(8, {message: "La contraseña no debe tener menos de 8 caracteres"})
  
    password: string

}