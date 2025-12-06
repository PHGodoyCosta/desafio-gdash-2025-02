import { Test, TestingModule } from '@nestjs/testing';
import { SenhoraDoTempoService } from './senhora-do-tempo.service';

describe('SenhoraDoTempoService', () => {
    let service: SenhoraDoTempoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SenhoraDoTempoService],
        }).compile();

        service = module.get<SenhoraDoTempoService>(SenhoraDoTempoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
