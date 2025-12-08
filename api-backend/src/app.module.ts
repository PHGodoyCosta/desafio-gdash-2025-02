import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';
import { SenhoraDoTempoModule } from './senhora-do-tempo/senhora-do-tempo.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const username = config.get<string>("MONGO_DB_USERNAME")
                const password = config.get<string>("MONGO_DB_PASSWORD")
                const name = config.get<string>("MONGO_DB_NAME")
                const port = config.get<string>("MONGO_DB_PORT")
                const type = config.get<string>("MONGO_DB_TYPE")

                return {
                    uri: `mongodb://${username}:${password}@${type}:${port}/${name}?authSource=admin`
                }
            }
        }),
        WeatherModule,

        AuthModule,

        UsersModule,

        RickAndMortyModule,

        SenhoraDoTempoModule,

        NewsletterModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
