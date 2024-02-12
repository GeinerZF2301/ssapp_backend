import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'
export class CreateSkillDto{
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsNotEmpty({message:"La skill es obligatoria"})
    @IsString({message: "La skill debe ser escrita en formato de texto"})
    @MinLength(3, {message: "La skill no debe tener menos de 3 caracteres"})
    name: string

    @IsNotEmpty({message:"La categoria es obligatoria"})
    @IsNumber()
    category: number
    
}
