import { HttpException, Injectable } from '@nestjs/common';
import { AuthLoginDTO, AuthResponseDTO } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compareSync as bcryptCompare } from 'bcrypt';

@Injectable()
export class AuthService {
    private jwtExpiresIn: number

    constructor (
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {
        this.jwtExpiresIn = Number(configService.get<number>("JWT_EXPIRATION_TIME"))
    }


    async signIn(credencials: AuthLoginDTO): Promise<AuthResponseDTO> {
        if (await this.usersService.isRegistered(credencials.email)) {
            const user = await this.usersService.findUserByEmail(credencials.email)
            
            if (!user) {
                throw new HttpException("Usuário não existe", 404)
            }

            if (!bcryptCompare(credencials.password, user.password)) {
                throw new HttpException("Senha incorreta! Tente novamente", 401)
            }

            const token = this.jwtService.sign({
                sub: user.hash,
                username: user.name
            })

            return {
                token: token,
                expiresIn: this.jwtExpiresIn
            }

            
        } else {
            throw new HttpException("Usuário não existe", 404)
        }
    }
}
