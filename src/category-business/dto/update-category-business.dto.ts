import { IsInt, IsString, Max, Min, MinLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoryBusinessDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MinLength(3, { message: "El nombre no debe tener menos de 3 caracteres" })
  @IsOptional()
  name?: string;

 
}
