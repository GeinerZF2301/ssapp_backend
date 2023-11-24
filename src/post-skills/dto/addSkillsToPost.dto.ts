import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class addSkillsToPostDto{
    @IsNotEmpty({ message: "Las skills son obligatorias para crear un post" })
    @IsArray()
    skillsIds : number [];

    @IsNotEmpty({ message: "El id del post no puede ser nulo" })
    @IsNumber()
    postHiringId : number
}