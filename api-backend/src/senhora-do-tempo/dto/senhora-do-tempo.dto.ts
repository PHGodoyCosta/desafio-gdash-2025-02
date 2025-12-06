
import { Type } from "class-transformer";
import { IsString, MaxLength, IsArray, ValidateNested, IsEnum, IsOptional } from "class-validator";

export class MessagesSenhoradoTempoDTO {
    @IsEnum(["assistant", "user"], {
        message: "Role só pode ter 'assistant' e 'user' como valores!"
    })
    role: "assistant" | "user"

    @IsString()
    @MaxLength(500)
    content: string
}

export class SenhoraDoTempoDTO {
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessagesSenhoradoTempoDTO)
    messages?: MessagesSenhoradoTempoDTO[]

    @IsString()
    day: string;
}