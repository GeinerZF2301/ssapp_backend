import { IsNotEmpty, IsInt, Min, Max, MinLength, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: "La descripción es obligatoria" })
  @IsString({ message: "La descripción debe ser escrita en formato de texto" })
  @MinLength(3, { message: "La descripción no debe tener menos de 3 caracteres" })
  description: string;

  @IsNotEmpty({ message: "La calificación es obligatoria" })
  @IsInt({ message: "La calificación debe ser un número entero" })
  @Min(1, { message: "La calificación debe ser al menos 1" })
  @Max(5, { message: "La calificación debe ser como máximo 5" })
  review: number;
}