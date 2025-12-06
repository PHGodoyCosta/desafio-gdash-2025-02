import { Controller, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { SenhoraDoTempoService } from './senhora-do-tempo.service';
import { SenhoraDoTempoDTO } from './dto/senhora-do-tempo.dto';
import { OptionalAuthGuard } from '../auth/guard/opcional-auth.guard';

@Controller('senhora-do-tempo')
export class SenhoraDoTempoController {
    constructor (private readonly senhoraDoTempoService: SenhoraDoTempoService) {}

    @UseGuards(OptionalAuthGuard)
    @HttpCode(200)
    @Post()
    async chat(
        @Body() data: SenhoraDoTempoDTO,
        @Request() req
    ) {
        return await this.senhoraDoTempoService.chat(data.messages, req.user ? req.user.name : undefined, data.day)
    }

}
