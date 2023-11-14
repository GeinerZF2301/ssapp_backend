  import { IsString, IsInt, IsOptional, IsArray, ArrayMinSize,IsNotEmpty } from 'class-validator';

  export class CreateProfileBusinessDto {
    @IsString({ message: 'El nombre del propietario debe ser escrita en formato texto' })
    owner_name: string;

    @IsString({ message: 'El primer apellido del propietario debe ser escrita en formato texto' })
    owner_lastname1: string;

    @IsString({ message: 'El segundo apellido del propietario debe ser escrita en formato texto' })
    owner_lastname2: string;

    @IsString({ message: 'El nombre del negocio debe ser escrita en formato texto' })
    business_name: string;

    @IsInt({ message: 'El número de teléfono debe ser  números entero' })
    phone_number: number;

    @IsString({ message: 'El estado debe ser escrita en formato texto' })
    state: string;

    @IsString({ message: 'La ciudad debe ser escrita en formato texto' })
    city: string;

    @IsString({ message: 'La calle debe ser escrita en formato texto' })
    street: string;

    @IsString({ message: 'La dirección debe ser escrita en formato texto' })
    address: string;


    @IsArray({ message: 'Los días de la semana deben ser un arreglo' })
    days_of_the_week: string[];
    
  
    @IsString({ message: 'mal' })
    openingTime: string;

    @IsString({ message: 'eror' })
    closingTime: string;

    @IsOptional()
    @IsString({ message: 'mal' })
    avatar_route?: string;

    @IsOptional()
    @IsString({ message: 'mal' })
    avatar_filename?: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser escrita en formato texto' })
    about?: string;

    @IsOptional()
    @IsString({ message: 'El enlace de Facebook debe ser una cadena de caracteres' })
    facebook?: string;

    @IsOptional()
    @IsString({ message: 'El enlace de Instagram debe ser una cadena de caracteres' })
    instagram?: string;

    @IsNotEmpty({ message: "El nombre es obligatorio" })
  categoryId: number;

    // @IsInt({ message: 'El ID de usuario debe ser un número entero' })
    // userId: number;
  }
