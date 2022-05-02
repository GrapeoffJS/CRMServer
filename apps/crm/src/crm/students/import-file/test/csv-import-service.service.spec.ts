import { Test, TestingModule } from '@nestjs/testing';
import { CsvImportServiceService } from '../services/csv-import-service/csv-import-service.service';

describe('CsvImportServiceService', () => {
  let service: CsvImportServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvImportServiceService],
    }).compile();

    service = module.get<CsvImportServiceService>(CsvImportServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
