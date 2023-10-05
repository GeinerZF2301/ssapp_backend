import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateProfileBusinessDto {
  @IsOptional()
  @IsString({ message: 'El nombre del propietario debe estar en formato de texto' })
  owner_name?: string;

  @IsOptional()
  @IsString({ message: 'El primer apellido del propietario debe estar en formato de texto' })
  owner_lastname1?: string;

  @IsOptional()
  @IsString({ message: 'El segundo apellido del propietario debe estar en formato de texto' })
  owner_lastname2?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del negocio debe estar en formato de texto' })
  business_name?: string;

  @IsOptional()
  @IsInt({ message: 'El número de teléfono debe ser un número entero' })
  phone_number?: number;

  @IsOptional()
  @IsString({ message: 'El estado debe estar en formato de texto' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'La ciudad debe estar en formato de texto' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'La calle debe estar en formato de texto' })
  street?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe estar en formato de texto' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Los días de la semana deben estar en formato de texto' })
  days_of_the_week?: string;

  @IsOptional()
  @IsString({ message: 'La hora de apertura debe estar en formato de texto' })
  openingTime?: string;

  @IsOptional()
  @IsString({ message: 'La hora de cierre debe estar en formato de texto' })
  closingTime?: string;

  @IsOptional()
  @IsString({ message: 'La ruta del avatar debe estar en formato de texto' })
  avatar_route?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del archivo del avatar debe estar en formato de texto' })
  avatar_filename?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe estar en formato de texto' })
  about?: string;

  @IsOptional()
  @IsString({ message: 'El enlace de Facebook debe estar en formato de texto' })
  facebook?: string;

  @IsOptional()
  @IsString({ message: 'El enlace de Instagram debe estar en formato de texto' })
  instagram?: string;

  @IsOptional()
  @IsString({ message: 'El enlace de Twitter debe estar en formato de texto' })
  twitter?: string;
}
