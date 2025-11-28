import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [JwtModule.registerAsync({
        global: true,
        imports: [],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            secret: config.get<string>("JWT_SECRET"),
            signOptions: {
                expiresIn: Number(config.get<string>("JWT_EXPIRATION_TIME"))
            }
        })
    }),
    UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
