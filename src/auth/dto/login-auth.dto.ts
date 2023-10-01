import {IsEmail, IsString, MinLength} from 'class-validator'
export class LoginAuthDto{
    @IsString()
    @MinLength(8)
    password: string
    @IsEmail()
    email : string
}