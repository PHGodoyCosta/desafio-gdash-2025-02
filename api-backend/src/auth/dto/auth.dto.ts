import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class AuthResponseDTO {
    @IsString()
    token: string;

    @IsNumber()
    expiresIn: number;
}

export class AuthLoginDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1
    },{
        message: "Sua senha deve ter no mínimo: 8 caracteres, 1 letra maiúscula, 1 número!"
    })
    password: string;    
}