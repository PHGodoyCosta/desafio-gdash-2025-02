import { Controller, HttpCode, Post, Body, Res, HttpException } from '@nestjs/common';
//import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDTO, AuthResponseDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("logout")
    logout(@Res({ passthrough: true }) res) {
        try {
            res.clearCookie("access_token");
            return {
                status: "OK"
            }
        } catch {
            throw new HttpException("Erro no logout", 500)
        }
    }

    @HttpCode(200)
    @Post("/login")
    async signIn(
        @Body() credencials: AuthLoginDTO,
        @Res({ passthrough: true }) res
    ): Promise<AuthResponseDTO> {

        console.log(credencials)

        const token = await this.authService.signIn(credencials)

        if (token.token) {
            res.cookie('access_token', token.token, {
                httpOnly: true,
                secure: false, // producao = true
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24, // 1 dia
                path: "/"
            });
        }

        console.log("Login feito com sucesso!")
        
        return token
    }
}
