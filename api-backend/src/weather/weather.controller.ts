import { Controller, Post, Body, UseGuards, Request, Get, UnauthorizedException, Response } from '@nestjs/common';
import { WeatherLogsDTO } from './dto/weather.dto';
import { AuthGuard } from '../auth/auth.guard';
import { WeatherService } from './weather.service';

@Controller('api/weather')
export class WeatherController {
    constructor (private readonly weatherService: WeatherService) {}

    @UseGuards(AuthGuard)
    @Post("logs")
    register_logs(@Body() logs: WeatherLogsDTO, @Request() req) {
        if (req.user.type != "admin") {
            throw new UnauthorizedException("Apenas admin podem acessar essa rota")
        }
    
        console.log(logs)

        return this.weatherService.insertLogs(logs)
    }

    @Get("logs")
    get_logs() {
        return this.weatherService.getLogs()
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
