import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateProfileDto {
    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    name?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    lastname1?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    lastname2?: string;

    @IsDateString({ strict: true }, { message: "La fecha de contratación debe ser una fecha válida en formato YYYY-MM-DD" })
    @IsNotEmpty({ message: "La fecha de contratación es obligatoria" })
    birthDate?: string;

    @IsInt({ message: 'El número de teléfono debe ser  números entero' })
    phone_number: number;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    state: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    city?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    street: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    address?: string;

    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsNumber()
    postalCode: number;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    avatarRoute?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    avatarFilename?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    occupation?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    interest?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    facebook?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsOptional()
    instagram?: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @IsOptional()
    tiktok?: string;

    @IsNotEmpty({ message: "El id del usuario dueño del perfil es obligatorio" })
    @IsInt({ message: 'El ID de usuario debe ser un número entero' })
    userId: number;
    

}