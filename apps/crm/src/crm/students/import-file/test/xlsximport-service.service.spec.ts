import { Test, TestingModule } from '@nestjs/testing';
import { XLSXImportServiceService } from '../services/xlsximport-service/xlsximport-service.service';

describe('XlsximportServiceService', () => {
  let service: XLSXImportServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XLSXImportServiceService],
    }).compile();

    service = module.get<XLSXImportServiceService>(XLSXImportServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
