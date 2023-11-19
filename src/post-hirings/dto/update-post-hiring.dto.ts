import { IsNumber, IsString } from "class-validator";

export class UpdatePostHiringDto{
    @IsString({ message: 'El titulo de la publicacion es obligatorio' })
    title?: string;

    @IsString({ message: 'La descripcion de la publicacion es obligatoria' })
    description?: string;

    @IsNumber()
    contractorUserId?: number;

}