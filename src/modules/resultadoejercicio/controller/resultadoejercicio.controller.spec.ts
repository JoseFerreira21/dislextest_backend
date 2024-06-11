import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoEjercicioController } from './resultadoejercicio.controller';

describe('DiccionarioController', () => {
  let controller: ResultadoEjercicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultadoEjercicioController],
    }).compile();

    controller = module.get<ResultadoEjercicioController>(ResultadoEjercicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
