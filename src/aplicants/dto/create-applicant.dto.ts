import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateApplicantDto{
   
    @IsNotEmpty({ message: "El Aplicante es obligatorio" })
    @IsNumber()
    postId: number;

    @IsNotEmpty({ message: "El Id del usuario creador de la publicacion es obligatoria" })
    @IsNumber()
    applicantMusicianId: number;

    status?: string;
}