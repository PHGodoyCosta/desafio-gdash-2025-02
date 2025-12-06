import { Controller, Post, Body, UseGuards, Request, Get, UnauthorizedException, Response, Query } from '@nestjs/common';
import { WeatherLogsDTO } from './dto/weather.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { WeatherService } from './weather.service';
import { WeatherDayLogsDTO } from './dto/weatherDay.dto';
import { WeatherDocument } from './repositories/weather.schema';

@Controller('weather')
export class WeatherController {
    constructor (private readonly weatherService: WeatherService) {}

    @UseGuards(AuthGuard)
    @Post("logs")
    register_logs(@Body() logs: WeatherLogsDTO, @Request() req) {
        if (req.user.type != "admin") {
            throw new UnauthorizedException("Apenas admin podem inserir dados!")
        }
    
        //console.log(logs)

        return this.weatherService.insertLogs(logs)
    }

    @Get("logs")
    async get_logs(@Query("day") day: string) {
        const logs: WeatherDocument[] = await this.weatherService.getLogs(day)

        const newLogs: WeatherDocument[] = logs.filter((item) => {
            const time = new Date(item.timestamp).getHours()
            return time % 2 === 0
        })

        return newLogs
        
    }

    @UseGuards(AuthGuard)
    @Post("day/logs")
    register_day_logs(@Body() logs: WeatherDayLogsDTO, @Request() req) {
        if (req.user.type != "admin") {
            throw new UnauthorizedException("Apenas admin podem inserir dados!")
        }
    
        //console.log(logs)

        return this.weatherService.insertDayLogs(logs)
    }

    @Get("day/logs")
    get_day_logs(@Query("day") day: string) {
        return this.weatherService.getDayLogs(day)
    }

    @Get("export.xlsx")
    async get_planilha(@Response() res) {

        const workbook = await this.weatherService.generate_planilha()

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="weather-logs.xlsx"',
        );

        await workbook.xlsx.write(res);
        res.end();
    }

    @Get("export.csv")
    async get_planilha_csv(@Response() res) {
        const workbook = await this.weatherService.generate_planilha();

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="weather-logs.csv"');

        const buffer = await workbook.csv.writeBuffer()

        res.send("\uFEFF" + Buffer.from(buffer).toString("utf-8"));
    }

}
