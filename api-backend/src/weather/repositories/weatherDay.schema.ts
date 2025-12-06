import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class WeatherDay {
    @Prop({ required: true })
    hash: string

    @Prop({ required: true })
    city: string

    @Prop({ required: true, type: Number })
    latitude: number

    @Prop({ required: true, type: Number })
    longitude: number

    @Prop({ required: true })
    churrascometro: string

    @Prop({ required: true })
    insight: string

    @Prop({ required: true })
    insightEnergia: string

    @Prop({ required: true, type: Number })
    energiaProduzida: number

    @Prop({ required: true })
    timestamp: Date

    @Prop({ type: Number })
    temperature: number

    @Prop({ type: Number })
    humidity: number

    @Prop({ type: Number })
    wind_speed: number

    @Prop({ type: Number })
    weather_code: number
    
    @Prop({ type: Number })
    precipitation_probability: number
}

export type WeatherDayDocument = HydratedDocument<WeatherDay>
export const WeatherDaySchema = SchemaFactory.createForClass(WeatherDay)
