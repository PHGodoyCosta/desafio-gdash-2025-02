import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Newsletter, NewsletterDocument } from './repositories/newsletter.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import fs from 'fs'
import path from 'path'
import { WeatherService } from '../weather/weather.service';
import { NewsletterConfirm, NewsletterConfirmDocument } from './repositories/newsletterConfirm.schema';
import { v4 } from 'uuid';

@Injectable()
export class NewsletterService {
    private transporter: nodemailer.Transporter;

    constructor (
        @InjectModel(Newsletter.name)
        private newsletterModel: Model<NewsletterDocument>,
        @InjectModel(NewsletterConfirm.name)
        private newsletterConfirmModel: Model<NewsletterConfirmDocument>,
        private readonly configService: ConfigService,
        private readonly weatherService: WeatherService
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>("SMTP_HOST"),
            port: Number(this.configService.get("SMTP_PORT")) || 587,
            secure: true,
            auth: {
                user: this.configService.get<string>("SMTP_USER"),
                pass: this.configService.get<string>("SMTP_PASS"),
            },
        });
    }

    async prepareNewsletter(): Promise<{ subject: string, html: string }> {
        const dateNow = new Date()
        dateNow.setUTCHours(0, 0, 0, 0)

        const dia = String(dateNow.getDate()).padStart(2, "0");
        const mes = String(dateNow.getMonth() + 1).padStart(2, "0");
        const ano = dateNow.getFullYear();

        const dayLog: any = await this.weatherService.getDayLogs(dateNow.toISOString())

        let newsletterAltered = fs.readFileSync(path.join(__dirname, "templates", "newsletter.html"), "utf-8")

        newsletterAltered = newsletterAltered.replace("{{temperature}}", String(Math.round(dayLog.temperature)))
        newsletterAltered = newsletterAltered.replace("{{churrascometro}}", String(dayLog.churrascometro))
        newsletterAltered = newsletterAltered.replace("{{insight}}", String(dayLog.insight))
        newsletterAltered = newsletterAltered.replace("{{insightEnergia}}", String(dayLog.insightEnergia))
        newsletterAltered = newsletterAltered.replace("{{energiaProduzida}}", String(Math.round(dayLog.energiaProduzida)))
        newsletterAltered = newsletterAltered.replace("{{humidity}}", String(Math.round(dayLog.humidity)))
        newsletterAltered = newsletterAltered.replace("{{wind_speed}}", String(Math.round(dayLog.wind_speed)))
        newsletterAltered = newsletterAltered.replace("{{preciptation_probability}}", String(Math.round(dayLog.precipitation_probability)))
        newsletterAltered = newsletterAltered.replace("{{data}}", `${dia}/${mes}/${ano}`)

        return {
            "subject": `Informe Diário - ${dia}/${mes}/${ano}`,
            "html": newsletterAltered
        }
    }

    async sendNewsletter(to: string) {
        console.log(`[Log] Enviando Email para ${to}`)
        const newNewsletter = await this.prepareNewsletter()

        const mailOptions = {
            from: `"Minha Newsletter" <${this.configService.get<string>("SMTP_USER")}>`,
            to,
            subject: newNewsletter.subject,
            html: newNewsletter.html,
            attachments: [
                {
                    filename: "normal_avatar.png",
                    path: path.join(__dirname, "templates", "images", "normal_avatar.png"),
                    cid: "avatar",
                },
            ]
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendAllNewsletter() {
        console.log("[Log] Inicio do envio da newsletter")
        const users = await this.newsletterModel.find().exec()
        
        users.map((user) => {
            void this.sendNewsletter(user.email)
        })
    }

    async sendConfirmationEmail(email: string, status?: string) {
        let hash = v4()

        // const confirm = await this.newsletterConfirmModel.findOne({
        //     email: email
        // })

        const realUser = await this.newsletterModel.findOne({
            email: email
        })

        //console.log(confirm)

        if (realUser) {
            throw new BadRequestException("Esse email já foi cadastrado!")
        }

        if (status != "confirm") {
            await this.newsletterConfirmModel.create({
                hash: hash,
                email: email
            })
        } else {
            const confirmUser = await this.newsletterConfirmModel.findOne({ email })
            hash = confirmUser?.hash ?? ""
        }

        let confirmationEmail = fs.readFileSync(path.join(__dirname, "templates", "confirmSub.html"), "utf-8")

        confirmationEmail = confirmationEmail.replace("{{confirm}}", `${this.configService.get<string>("FRONTEND_URL")}/confirm?token=${hash}`)

        const mailOptions = {
            from: `"Minha Newsletter" <${this.configService.get<string>("SMTP_USER")}>`,
            to: email,
            subject: "Confirme a sua inscrição na Newsletter!",
            html: confirmationEmail,
            attachments: [
                {
                    filename: "normal_avatar.png",
                    path: path.join(__dirname, "templates", "images", "normal_avatar.png"),
                    cid: "avatar",
                },
            ]
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async status(email: string) {
        const newsletterUser = await this.newsletterModel.findOne({ email })
        const newsletterUserConfirm = await this.newsletterConfirmModel.findOne({ email })

        if (newsletterUserConfirm) {
            return {
                ...newsletterUser?.toObject(),
                status: 'confirm',
            };
        }

        if (!newsletterUser) {
            throw new NotFoundException("Não foi possível encontrar sua inscrição")
        }

        return {
            ...newsletterUser.toObject(),
            status: 'ok',
        };
    }

    async cancelar_assinatura(email: string) {
        try {
            await this.newsletterModel.deleteOne({ email }).exec()


        } catch {
            throw new InternalServerErrorException("Não foi possível deletar o usuário")
        }

        return {
            statusCode: 200,
            message: "Assinatura Cancelada!"
        }

    }

    async welcomeEmail(email: string) {
        const welcomeEmailContent = fs.readFileSync(path.join(__dirname, "templates", "welcome-newsletter.html"), "utf-8")

        const mailOptions = {
            from: `"Minha Newsletter" <${this.configService.get<string>("SMTP_USER")}>`,
            to: email,
            subject: "Parabéns! Você assinou nossa newsletter!",
            html: welcomeEmailContent,
            attachments: [
                {
                    filename: "normal_avatar.png",
                    path: path.join(__dirname, "templates", "images", "normal_avatar.png"),
                    cid: "avatar",
                },
            ]
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async confirmSubscribe(token: string) {
        const confirm = await this.newsletterConfirmModel.findOne({
            hash: token
        })

        if (!confirm) {
            throw new NotFoundException("Não encontrei o usuário")
        }

        try {
            await this.newsletterConfirmModel.deleteMany({
                hash: token
            })

            await this.newsletterModel.create({
                hash: token,
                email: confirm.email
            })
        } catch {
            throw new InternalServerErrorException("Não consegui processar a inscrição!")
        }

        await this.welcomeEmail(confirm.email)
        await this.sendNewsletter(confirm.email)

        return {
            statusCode: 200,
            message: "Inscrição confirmada com sucesso!"
        }
    }
}
