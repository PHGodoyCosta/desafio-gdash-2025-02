import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class OptionalAuthGuard implements CanActivate {

    private readonly jwtSecret: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtSecret = this.configService.get('JWT_SECRET') ?? '';
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        
        const tokenBarier = this.extractTokenFromHeader(request);
        const tokenCookie = this.extractTokenFromCookies(request);

        const token = tokenCookie || tokenBarier;

        if (!token) {
            request['user'] = null;
            return true;
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.jwtSecret,
            });

            request['user'] = payload;

        } catch {
            request['user'] = null;
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookies(request: Request): string | null {
        return request.cookies?.access_token ?? null;
    }
}
