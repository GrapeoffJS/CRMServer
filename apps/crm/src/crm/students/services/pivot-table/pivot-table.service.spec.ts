import { Test, TestingModule } from '@nestjs/testing';
import { PivotTableService } from './pivot-table.service';

describe('PivotTableService', () => {
  let service: PivotTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PivotTableService],
    }).compile();

    service = module.get<PivotTableService>(PivotTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
