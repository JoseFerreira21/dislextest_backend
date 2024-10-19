import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoEjercicioService } from './resultado_ejercicio.service'; 

describe('DiccionarioService', () => {
  let service: ResultadoEjercicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadoEjercicioService],
    }).compile();

    service = module.get<ResultadoEjercicioService>(ResultadoEjercicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
