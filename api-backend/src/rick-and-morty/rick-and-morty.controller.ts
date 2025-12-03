import { Controller, Get } from '@nestjs/common';
import { RickAndMortyService } from './rick-and-morty.service';
import { Param, Query } from '@nestjs/common';

@Controller('rick-and-morty')
export class RickAndMortyController {
    constructor (
        private readonly rickAndMortyService: RickAndMortyService
    ) {}

    @Get("/")
    home(
        @Query("name") name: string,
        @Query("page") page: string
    ) {
        return this.rickAndMortyService.getCaracters(name, page)
    }

    @Get("/caracter/:id")
    getCaracter(@Param("id") id: number) {
        const caracter = this.rickAndMortyService.getCaracter(id)

        return caracter
    }
}
