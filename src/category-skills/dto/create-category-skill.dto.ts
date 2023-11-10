import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateCategorySkillDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  name: string;


  
}
