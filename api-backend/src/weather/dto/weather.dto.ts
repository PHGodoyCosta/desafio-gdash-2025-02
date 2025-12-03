import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
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
    @IsOptional()
    @IsNumber({}, { each: true })
    temperature_2m: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    temperature: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    humidity: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    wind_speed: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    weather_code: number[]
    
    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    preciptation_probability: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    direct_radiation: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    shortwave_radiation: number[]
}

export class WeatherLogsDTO {
    @IsNumber()
    latitude: number

    @IsNumber()
    longitude: number

    @IsString()
    @IsOptional()
    city: string

    @ValidateNested({ each: true })
    @Type(() => HourlyUnitsDTO)
    hourly_units: HourlyUnitsDTO

    @ValidateNested({ each: true })
    @Type(() => HourlyDTO)
    hourly: HourlyDTO
}
