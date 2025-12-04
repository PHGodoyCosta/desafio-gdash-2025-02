/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
    private jwtSecret: string

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtSecret = this.configService.get("JWT_SECRET") ?? ""
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const tokenBarier = this.extractTokenFromHeader(request)
        const tokenCookie = this.extractTokenFromCookies(request)
        
        if (!tokenBarier && !tokenCookie) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(tokenCookie ? String(tokenCookie) : String(tokenBarier), {
                    secret: this.jwtSecret
                })
            request['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? []
        return type == "Bearer" ? token : undefined
    }

    private extractTokenFromCookies(request: Request): string | null {
        const token = request.cookies?.access_token
        return token || null
    }
}
