import { Test, TestingModule } from '@nestjs/testing';
import { DiccionarioController } from './diccionario.controller'; 

describe('DiccionarioController', () => {
  let controller: DiccionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiccionarioController],
    }).compile();

    controller = module.get<DiccionarioController>(DiccionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
