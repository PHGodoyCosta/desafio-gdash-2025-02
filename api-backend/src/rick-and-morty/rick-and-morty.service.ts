import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RickAndMortyService {
    constructor (
        private readonly http: HttpService
    ) {}

    async getCaracters(name: string = "", page: string = "") {
        try {
            const url = new URL("https://rickandmortyapi.com/api/character")

            if (name) {
                url.searchParams.set("name", name)
            }

            if (page) {
                url.searchParams.set("page", page)
            }

            const response = await firstValueFrom(
                this.http.get(url.href)
            );

            return response.data;
        } catch {
            throw new HttpException("Erro no servidor", 500)
        }
    }

    async getCaracter(id: number){
        try {
            const response = await firstValueFrom(
                this.http.get(`https://rickandmortyapi.com/api/character/${id}`)
            );

            return response.data;
        } catch {
            throw new HttpException("Erro no servidor", 500)
        }
        
    }

    async getLocation(id: number){
        try {
            const response = await firstValueFrom(
                this.http.get(`https://rickandmortyapi.com/api/location/${id}`)
            );

            return response.data;
        } catch {
            throw new HttpException("Erro no servidor", 500)
        }
    }
}
