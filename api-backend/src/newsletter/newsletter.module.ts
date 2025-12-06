import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Newsletter, NewsletterSchema } from './repositories/newsletter.schema';
import { WeatherModule } from '../weather/weather.module';
import { NewsletterConfirm, NewsletterConfirmSchema } from './repositories/newsletterConfirm.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Newsletter.name, schema: NewsletterSchema },
            { name: NewsletterConfirm.name, schema: NewsletterConfirmSchema }
        ]),
        WeatherModule
    ],
    controllers: [NewsletterController],
    providers: [NewsletterService]
})
export class NewsletterModule {}
