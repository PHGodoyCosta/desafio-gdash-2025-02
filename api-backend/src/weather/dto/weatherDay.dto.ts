import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';

export class DailyDTO {
    @IsArray()
    @IsString({ each: true })
    time: string[];

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
    precipitation_probability: number[]

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    shortwave_radiation: number[]
}

export class WeatherDayLogsDTO {
    @IsNumber()
    latitude: number

    @IsNumber()
    longitude: number

    @IsString()
    @IsOptional()
    city: string

    @IsString()
    churrascometro: string

    @IsString()
    insight: string

    @IsString()
    insightEnergia: string

    @IsString()
    energiaProduzida: string

    @ValidateNested({ each: true })
    @Type(() => DailyDTO)
    daily: DailyDTO
}
