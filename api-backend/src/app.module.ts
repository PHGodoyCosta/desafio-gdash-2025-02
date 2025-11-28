import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';

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

                return {
                    uri: `mongodb://${username}:${password}@localhost:${port}/${name}?authSource=admin`
                }

                
            }
        }),

        ApiModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
