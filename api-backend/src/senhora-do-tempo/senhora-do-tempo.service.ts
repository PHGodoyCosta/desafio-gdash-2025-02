import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagesSenhoradoTempoDTO } from './dto/senhora-do-tempo.dto';
import { WeatherService } from '../weather/weather.service';
import OpenAI from 'openai';
import fs from 'fs'
import path from 'path'

@Injectable()
export class SenhoraDoTempoService {
    private client: OpenAI
    private prompt: string
    private gptModel: string

    constructor(
        private readonly configService: ConfigService,
        private readonly weatherService: WeatherService
    ) {
        this.client = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY")
        })

        this.prompt = fs.readFileSync(path.join(__dirname, "prompts", "senhora-do-tempo-prompt.txt"), "utf-8")

        this.gptModel = "gpt-4.1-mini"
    }

    async chat(messages: MessagesSenhoradoTempoDTO[] | undefined, name: string, day: string) {
        const conversation: MessagesSenhoradoTempoDTO[] = []

        const weatherLogs = await this.weatherService.getLogs(day)
        const weatherDay = await this.weatherService.getDayLogs(day)

        this.prompt = this.prompt.replace("{{ nome }}", name ?? "Sem usuário")
        this.prompt = this.prompt.replace("{{ weatherLogs }}", JSON.stringify(weatherLogs))
        this.prompt = this.prompt.replace("{{ weatherDay }}", JSON.stringify(weatherDay))

        if (messages) {
            messages.map(item => {
                conversation.push(item)                
            })
        }

        const completion = await this.client.chat.completions.create({
            model: this.gptModel,
            messages: [
                ...conversation,
                { role: "system", content: this.prompt }
            ]
        });

        return {
            "response": completion.choices[0].message.content ?? ""
        };
    }
}
