import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoItemController } from './resultado_item.controller';

describe('ResultadoItemController', () => {
  let controller: ResultadoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultadoItemController],
    }).compile();

    controller = module.get<ResultadoItemController>(ResultadoItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
