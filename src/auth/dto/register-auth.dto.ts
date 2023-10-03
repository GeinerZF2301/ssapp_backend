import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate} from 'class-validator';
export class RegisterAuthDto {

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({message:"El nombre de usuario es obligatorio"})
  @IsString({message: "El nombre de usuario debe ser escrito en formato de texto"})
  @MinLength(5, {message: "El nombre de usuario no debe tener menos de 3 caracteres"})

  username: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({message:"El correo electrónico es obligatorio"})
  @IsEmail()
  email: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(8,{message: "La contraseña no debe tener menos de 8 caracteres"})
  password: string;
  
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(8, {message: "La contraseña no debe tener menos de 8 caracteres"})
  @IsString()
  confirmPassword: string;

  @Validate((object: RegisterAuthDto) => {
    if (object.password !== object.confirmPassword) {
      return { message: 'Las contraseñas no coinciden' };
    }
  })
  confirmPasswordMatches: string;
}


