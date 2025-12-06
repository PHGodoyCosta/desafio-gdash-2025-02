import { Module } from '@nestjs/common';
import { SenhoraDoTempoController } from './senhora-do-tempo.controller';
import { SenhoraDoTempoService } from './senhora-do-tempo.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
    imports: [WeatherModule],
    controllers: [SenhoraDoTempoController],
    providers: [SenhoraDoTempoService]
})
export class SenhoraDoTempoModule {}
