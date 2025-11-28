import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';

export class HourlyUnitsDTO {
    @IsString()
    time: string;

    @IsString()
    temperature_2m: string;
}

export class HourlyDTO {
    @IsArray()
    @IsString({ each: true })
    time: string[];

    @IsArray()
    @IsNumber({}, { each: true })
    temperature_2m: number[]
}

export class WeatherLogsDTO {
    @IsUUID()
    @IsOptional()
    id: string;
    
    @IsNumber()
    latitude: number

    @IsNumber()
    longitude: number

    @ValidateNested()
    @Type(() => HourlyUnitsDTO)
    hourly_units: HourlyUnitsDTO[]

    @ValidateNested()
    @Type(() => HourlyDTO)
    hourly: HourlyDTO[]
}