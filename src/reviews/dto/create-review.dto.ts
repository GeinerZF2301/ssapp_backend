import { IsNotEmpty, IsInt, Min, Max, MinLength, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
  @IsString({ message: "La ubicación del evento debe estar en formato de texto" })
  @MinLength(3, { message: "La ubicación del evento no debe tener menos de 3 caracteres" })
  @IsNotEmpty({ message: "La ubicación del evento es obligatoria" })
  description: string;

  @IsNotEmpty({ message: "La calificación es obligatoria" })
  @IsInt({ message: "La calificación debe ser un número entero" })
  @Min(1, { message: "La calificación debe ser al menos 1" })
  @Max(5, { message: "La calificación debe ser como máximo 5" })
  review: number;
}