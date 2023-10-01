import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength, Validate} from 'class-validator';
export class RegisterAuthDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(5)
  username: string;

  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;
  
  @Transform(({ value }) => value.trim())
  @MinLength(8)
  @IsString()
  confirmPassword: string;

  @Validate((object: RegisterAuthDto) => {
    if (object.password !== object.confirmPassword) {
      return { message: 'Las contraseñas no coinciden' };
    }
  })
  confirmPasswordMatches: string;
}
