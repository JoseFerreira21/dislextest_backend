import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoTestController } from './resultado_test.controller';

describe('ResultadoTestController', () => {
  let controller: ResultadoTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultadoTestController],
    }).compile();

    controller = module.get<ResultadoTestController>(ResultadoTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
