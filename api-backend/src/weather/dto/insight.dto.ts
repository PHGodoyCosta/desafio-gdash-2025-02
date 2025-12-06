import { IsNumber, IsString } from 'class-validator'

export class InsightDTO {
    @IsNumber()
    latitude: number

    @IsNumber()
    longitude: number

    @IsString()
    city: string

    @IsString()
    time: string

    @IsNumber()
    temperature: number

    @IsNumber()
    humidity: number

    @IsNumber()
    wind_speed: number

    @IsNumber()
    weather_code: number
    
    @IsNumber()
    precipitation_probability: number

    @IsNumber()
    shortwave_radiation: number

    @IsNumber()
    energiaProduzida: number
}
