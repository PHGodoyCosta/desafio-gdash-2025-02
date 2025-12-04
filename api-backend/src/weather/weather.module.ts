import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Weather, WeatherSchema } from './repositories/weather.schema';
import { WeatherDay, WeatherDaySchema } from './repositories/weatherDay.schema';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Weather.name, schema: WeatherSchema },
            { name: WeatherDay.name, schema: WeatherDaySchema }
        ])
    ],
    controllers: [WeatherController],
    providers: [WeatherService]
})
export class WeatherModule {}
