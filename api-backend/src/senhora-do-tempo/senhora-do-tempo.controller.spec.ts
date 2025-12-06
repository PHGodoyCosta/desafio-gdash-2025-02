import { Test, TestingModule } from '@nestjs/testing';
import { SenhoraDoTempoController } from './senhora-do-tempo.controller';

describe('SenhoraDoTempoController', () => {
    let controller: SenhoraDoTempoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [SenhoraDoTempoController],
        }).compile();

        controller = module.get<SenhoraDoTempoController>(SenhoraDoTempoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
