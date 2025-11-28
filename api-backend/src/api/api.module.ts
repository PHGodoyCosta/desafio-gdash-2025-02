import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';

@Module({
    controllers: [WeatherController],
})
export class ApiModule {}
