import { Controller, Post, Body } from '@nestjs/common';
import { WeatherLogsDTO } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
    @Post("logs")
    register_logs(@Body() logs: WeatherLogsDTO) {
        console.log(logs)
        return {
            everthing_is_gonnabe: "Alright"
        }
    }
}
