import { Test, TestingModule } from '@nestjs/testing';
import { RickAndMortyController } from './rick-and-morty.controller';

describe('RickAndMortyController', () => {
  let controller: RickAndMortyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RickAndMortyController],
    }).compile();

    controller = module.get<RickAndMortyController>(RickAndMortyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
