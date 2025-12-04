import { IsString, IsStrongPassword, IsUUID, IsEmail, IsOptional, MaxLength } from "class-validator";

export class UserDTO {
    @IsUUID()
    hash: string

    @IsString()
    name: string

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1
    })
    password: string;

    @IsString()
    email: string;
}

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1
    },{
        message: "Senha Fraca! Tente novamente!"
    })
    password: string;  
}

export class UpdaterUserDTO {
    @IsString()
    @IsOptional()
    name: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1
    })
    @IsOptional()
    password: string
}