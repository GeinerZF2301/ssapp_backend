import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class removeSkillsToProfileDto{
    @IsNotEmpty({ message: "Las skills son obligatorias para crear un post" })
    @IsArray()
    skillsIds : number [];

    @IsNotEmpty({ message: "El id del post no puede ser nulo" })
    @IsNumber()
    profileId : number
}