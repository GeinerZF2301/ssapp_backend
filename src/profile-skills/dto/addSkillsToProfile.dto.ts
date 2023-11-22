import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class addSkillsToProfileDto{
    @IsNotEmpty({ message: "Las skills son obligatorias para el perfil" })
    @IsArray()
    skillsIds : number [];

    @IsNotEmpty({ message: "El id del post no puede ser nulo" })
    @IsNumber()
    profileId : number
}