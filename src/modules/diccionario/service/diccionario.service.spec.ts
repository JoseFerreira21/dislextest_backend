import { Test, TestingModule } from '@nestjs/testing';
import { DiccionarioService } from './diccionario.service'; 

describe('DiccionarioService', () => {
  let service: DiccionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiccionarioService],
    }).compile();

    service = module.get<DiccionarioService>(DiccionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
