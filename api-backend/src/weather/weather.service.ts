import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WeatherLogsDTO } from './dto/weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather, WeatherDocument } from './repositories/weather.schema';
import { WeatherDay, WeatherDayDocument } from './repositories/weatherDay.schema';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import * as ExcelJS from 'exceljs';
import { WeatherDayLogsDTO } from './dto/weatherDay.dto';
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { InsightDTO } from './dto/insight.dto';

@Injectable()
export class WeatherService {
    private client: OpenAI
    private gptModel: string

    constructor (
        @InjectModel(Weather.name)
        private weatherModel: Model<WeatherDocument>,
        @InjectModel(WeatherDay.name)
        private weatherDayModel: Model<WeatherDayDocument>,
        private readonly configService: ConfigService,
    ) {
        this.client = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY")
        })

        this.gptModel = "gpt-4.1"
}

    async insertLogs(logs: WeatherLogsDTO) {
        console.log("[Log] Inserindo novos WeatherLogs")
        for (let i=0;i<logs.hourly.time.length;i++) {
            const newRegister = new this.weatherModel({
                hash: v4(),
                latitude: logs.latitude,
                longitude: logs.longitude,
                timestamp: logs.hourly.time[i],
                city: "Nova Alvorada do Sul",
                temperature: logs.hourly.temperature_2m[i],
                humidity: logs.hourly.humidity[i],
                wind_speed: logs.hourly.wind_speed[i],
                weather_code: logs.hourly.weather_code[i],
                precipitation_probability: logs.hourly.precipitation_probability[i]
            })

            await newRegister.save()
        }

        return {
            status: "Query Saved"
        }
    }

    async insertDayLogs(logs: WeatherDayLogsDTO) {
        const { daily } = logs
        
        for (let i = 0;i<logs.daily.time.length;i++) {
            logs.daily.energiaProduzida[i] = this.energyCalculate(Number(logs.daily.shortwave_radiation[i]))
        }

        for (let i=0;i<logs.daily.time.length;i++) {
            const insights = await this.generateInsights({
                latitude: logs.latitude,
                longitude: logs.longitude,
                city: "Nova Alvorada do Sul",
                energiaProduzida: logs.daily.energiaProduzida[i],
                humidity: daily.humidity?.[i],
                precipitation_probability: daily.precipitation_probability?.[i],
                shortwave_radiation: logs.daily.shortwave_radiation[i],
                temperature: daily.temperature?.[i],
                time: daily.time[i],
                wind_speed: daily.wind_speed?.[i],
                weather_code: daily.weather_code[i]
            })

            await this.weatherDayModel.create({
                hash: v4(),
                city: logs.city,
                latitude: logs.latitude,
                longitude: logs.longitude,
                churrascometro: insights.churrascometro,
                insight: insights.insight,
                insightEnergia: insights.insightEnergia,
                energiaProduzida: Number(logs.daily.energiaProduzida[i]),
                timestamp: new Date(daily.time[i]),
                temperature: daily.temperature?.[i],
                humidity: daily.humidity?.[i],
                wind_speed: daily.wind_speed?.[i],
                weather_code: daily.weather_code?.[i],
                precipitation_probability: daily.precipitation_probability?.[i]
            })
        }

        return {
            status: "Query Saved"
        }
    }

    async getLogs(day?: string, mode: string = "oneDay") {
        try {
            if (day) {
                const start = new Date(day);
                const end = new Date(day);
                if (mode == "oneDay") {
                    end.setDate(end.getDate() + 1);
                } else if (mode == "week") {
                    end.setDate(end.getDate() + 7);
                }

                return await this.weatherModel
                    .find({
                        timestamp: { $gte: start, $lt: end }
                    })
                    .sort({ timestamp: 1 }) // Do antigo para o mais novo
                    .exec();
            }

            return await this.weatherModel.find().exec()
        } catch {
            throw new InternalServerErrorException("Erro ao buscar os registros")
        }
    }

    async getDayLogs(day?: string) {
        try {
            if (day) {
                const start = new Date(day);
                const end = new Date(day);
                end.setDate(end.getDate() + 1);

                return await this.weatherDayModel.findOne({
                    timestamp: { $gte: start, $lt: end }
                }).exec();
            }

            return await this.weatherDayModel.find().exec()
        } catch {
            throw new InternalServerErrorException("Erro ao buscar os registros")
        }
    }

    async generate_planilha() {
        const dateNow = new Date()
        dateNow.setUTCHours(0, 0, 0, 0)

        const data = await this.getLogs(dateNow.toISOString(), "week")

        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet('Tempo')

        const cabecalho: string[] = ["Dia", "Hora", "Cidade", "Latitude", "Longitude", "Temperatura (°C)", "Umidade do ar (%)", "Velocidade do Vento (Km/h)", "Probabilidade de Chuva (%)"]

        sheet.addRow(cabecalho)

        data.map(item => {
            const date = new Date(item.timestamp)

            sheet.addRow([
                date.toLocaleDateString("pt-BR"),
                date.toLocaleTimeString("pt-BR"),
                "Nova Alvorada do Sul",
                item.latitude,
                item.longitude,
                item.temperature ?? "",
                item.humidity ?? "",
                item.wind_speed ?? "",
                item.precipitation_probability ?? ""
            ])
        })

        return workbook
    }

    energyCalculate(irradiacao: number): number {
        // Placa Vertys 550 W -> https://vertysgroup.com/uploads/Datasheet%20Balfar%20550W.pdf
        const area = 2.584386 //m²
        const eficiencia = 0.21 //%
        const quantidade_de_placas = 4
        irradiacao *= 0.2778 // Converte MJ/m² do OpenMeteo em kWh

        return irradiacao * area * eficiencia * quantidade_de_placas
    }

    async generateInsights(dayLogs: InsightDTO) : Promise<{churrascometro: string, insight: string, insightEnergia: string}> {
        let prompt = fs.readFileSync(path.join(__dirname, "prompts", "insight-prompt.txt"), "utf-8")

        const dateNow = new Date()
        dateNow.setUTCHours(0, 0, 0, 0)

        prompt = prompt.replace("{{ weatherDayLog }}", JSON.stringify(dayLogs))

        //console.log(prompt)

        const completion = await this.client.chat.completions.create({
            model: this.gptModel,
            messages: [
                { role: "system", content: prompt }
            ]
        });

        const response = JSON.parse(String(completion.choices[0].message.content))

        return {
            "churrascometro": response.churrascometro,
            "insight": response.insight,
            "insightEnergia": response.insightEnergia
        };

    }
}
