import { IsString, IsStrongPassword, IsUUID, IsEmail } from "class-validator";

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
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}