import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Weather, WeatherSchema } from './repositories/weather.schema';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Weather.name, schema: WeatherSchema }
        ])
    ],
    controllers: [WeatherController],
    providers: [WeatherService]
})
export class WeatherModule {}
