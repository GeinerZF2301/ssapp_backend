import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostHiringDto{
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: 'El titulo de la publicacion es obligatorio' })
    title: string;

    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: 'La descripcion de la publicacion es obligatoria' })
    description: string;

    @IsNotEmpty({ message: "El Id del usuario creador de la publicacion es obligatoria" })
    @IsNumber()
    contractorUserId: number;

}