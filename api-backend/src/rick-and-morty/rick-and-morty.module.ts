import { Module } from '@nestjs/common';
import { RickAndMortyController } from './rick-and-morty.controller';
import { RickAndMortyService } from './rick-and-morty.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [RickAndMortyController],
    providers: [RickAndMortyService]
})
export class RickAndMortyModule {}
