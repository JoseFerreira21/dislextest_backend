import { Test, TestingModule } from '@nestjs/testing';
import { ResultadotestService } from './resultadotest.service';

describe('ResultadotestService', () => {
  let service: ResultadotestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadotestService],
    }).compile();

    service = module.get<ResultadotestService>(ResultadotestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
