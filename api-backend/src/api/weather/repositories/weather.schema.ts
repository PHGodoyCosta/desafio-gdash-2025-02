import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Weather {
    @Prop({ required: true })
    hash: string

    @Prop({ required: true })
    city: string

    @Prop({ required: true })
    latitude: number

    @Prop({ required: true })
    longitude: number

    @Prop({ required: true })
    timestamp: Date

    @Prop()
    temperature: number

    @Prop()
    humidity: number

    @Prop()
    wind_speed: number

    @Prop()
    weather_code: number
    
    @Prop()
    preciptation_probability: number

}

export type WeatherDocument = HydratedDocument<Weather> //Para tipagens em users.service
export const WeatherSchema = SchemaFactory.createForClass(Weather)
