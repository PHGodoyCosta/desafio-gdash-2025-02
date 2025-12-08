import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true }
        })
    );

    const port = process.env.PORT ?? 3001;
    app.setGlobalPrefix("api")
    app.enableCors({
        origin: [process.env.FRONTEND_URL],
        credentials: true
    })
    await app.listen(port);
    console.log(`Servidor Desafio GDASH -> http://localhost:${port}/`);
}
bootstrap();
