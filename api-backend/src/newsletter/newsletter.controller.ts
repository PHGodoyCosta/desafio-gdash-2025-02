import { Controller, Post, UseGuards, Get, Body, Query, Request, UnauthorizedException, HttpCode } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('newsletter')
export class NewsletterController {
    constructor (
        private readonly newsletterService: NewsletterService
    ) {}

    @Post()
    async subscribe(
        @Body("email") email: string,
        @Body("status") status: string
    ) {
        return await this.newsletterService.sendConfirmationEmail(email, status)
    }

    @UseGuards(AuthGuard)
    @Get("status")
    async get_status(@Request() req) {
        return await this.newsletterService.status(String(req.user.email))
    }

    @Get("confirm")
    async confirm(
        @Query("token") token: string
    ) {
        return await this.newsletterService.confirmSubscribe(token)
    }

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Post("cancel")
    async cancelar_assinatura(@Request() req) {
        console.log(`[Log] Cancelando a assinatura de: ${req?.user?.email}`)
        return await this.newsletterService.cancelar_assinatura(req?.user?.email)
    }

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Post("send")
    async send_newsletter(
        @Request() req
    ) {
        if (req.user.type != "admin") {
            console.log("[ERROR] Sem autenticação em Newsletter")
            throw new UnauthorizedException("Apenas ADMIN pode ativar essa rota")
        }

        console.log("[LOG] Iniciando o newletter send")

        void this.newsletterService.sendAllNewsletter()

        return {
            "status": "Running"
        }
    }
    
}
