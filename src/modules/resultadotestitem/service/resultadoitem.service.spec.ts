import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoItemService } from './resultadoitem.service';

describe('ResultadoItemService', () => {
  let service: ResultadoItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadoItemService],
    }).compile();

    service = module.get<ResultadoItemService>(ResultadoItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
