import { Controller, HttpCode, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO, AuthResponseDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Get() 
    home() {
        return "temp"
    }

    @HttpCode(200)
    @Post("/login")
    signIn(@Body() credencials: AuthLoginDTO): Promise<AuthResponseDTO> {
        return this.authService.signIn(credencials)
    }
}
