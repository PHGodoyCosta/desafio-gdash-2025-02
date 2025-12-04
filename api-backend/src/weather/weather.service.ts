import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WeatherLogsDTO } from './dto/weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather, WeatherDocument } from './repositories/weather.schema';
import { WeatherDay, WeatherDayDocument } from './repositories/weatherDay.schema';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import * as ExcelJS from 'exceljs';
import { WeatherDayLogsDTO } from './dto/weatherDay.dto';

@Injectable()
export class WeatherService {
    constructor (
        @InjectModel(Weather.name)
        private weatherModel: Model<WeatherDocument>,
        @InjectModel(WeatherDay.name)
        private weatherDayModel: Model<WeatherDayDocument>
    ) {}

    async insertLogs(logs: WeatherLogsDTO) {
        for (let i=0;i<logs.hourly.time.length;i++) {
            const newRegister = new this.weatherModel({
                hash: v4(),
                latitude: logs.latitude,
                longitude: logs.longitude,
                timestamp: logs.hourly.time[i],
                city: "Nova Alvorada do Sul",
                temperature: logs.hourly.temperature_2m[i]
            })

            await newRegister.save()
        }

        return {
            status: "Query Saved"
        }
    }

    async insertDayLogs(logs: WeatherDayLogsDTO) {
        const { daily } = logs

        for (let i=0;i<logs.daily.time.length;i++) {
            await this.weatherDayModel.create({
                hash: v4(),
                city: logs.city,
                latitude: logs.latitude,
                longitude: logs.longitude,
                churrascometro: logs.churrascometro,
                insight: logs.insight,
                insightEnergia: logs.insightEnergia,
                energiaProduzida: logs.energiaProduzida,
                timestamp: new Date(daily.time[i]),
                temperature: daily.temperature?.[i],
                humidity: daily.humidity?.[i],
                wind_speed: daily.wind_speed?.[i],
                weather_code: daily.weather_code?.[i],
                preciptation_probability: daily.precipitation_probability?.[i]
            })
        }

        return {
            status: "Query Saved"
        }
    }

    async getLogs() {
        try {
            return await this.weatherModel.find().exec()
        } catch {
            throw new InternalServerErrorException("Erro ao buscar os registros")
        }
    }

    async getDayLogs() {
        try {
            return await this.weatherDayModel.find().exec()
        } catch {
            throw new InternalServerErrorException("Erro ao buscar os registros")
        }
    }

    async generate_planilha() {
        const data = await this.getLogs()

        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet('Tempo')

        const cabecalho: string[] = ["Dia", "Hora", "Cidade", "Latitude", "Longitude", "Previsão", "Temperatura", "Umidade do ar", "Velocidade do Vento", "Probabilidade de Chuva"]

        sheet.addRow(cabecalho)

        data.map(item => {
            const date = new Date(item.timestamp)

            sheet.addRow([
                date.toLocaleDateString("pt-BR"),
                date.toLocaleTimeString("pt-BR"),
                "Nova Alvorada do Sul",
                item.latitude,
                item.longitude,
                item.weather_code || "",
                item.temperature || "",
                item.humidity || "",
                item.wind_speed || "",
                item.preciptation_probability || ""
            ])
        })

        return workbook
    }
}
