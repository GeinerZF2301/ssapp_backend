import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Double } from "typeorm";

export class UpdatePostHiringDto{
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: 'El titulo de la publicacion es obligatorio' })
    title: string;

    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: 'La descripcion de la publicacion es obligatoria' })
    description: string;


    @IsDateString({ strict: true }, { message: "La fecha de contratación debe ser una fecha válida en formato YYYY-MM-DD" })
    @IsNotEmpty({ message: "La fecha de la posible contratacion es obligatoria" })
    date: Date;

    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: 'El titulo de la publicacion es obligatorio' })
    type_event: string;

    @IsNumber()
    monto: number

    @IsNotEmpty({ message: "El Id del usuario creador de la publicacion es obligatoria" })
    @IsNumber()
    contractorUserId: number;

}

