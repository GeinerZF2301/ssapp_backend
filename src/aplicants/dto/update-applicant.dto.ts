
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateApplicantDto{
   
    @IsNotEmpty({ message: "El estado de la solicitud es obligatorio" })
    @IsString({ message: 'El estado de la solicitud es un texto' })
    status?: string;
}