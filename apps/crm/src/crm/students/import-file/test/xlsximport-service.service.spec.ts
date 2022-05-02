import { Test, TestingModule } from '@nestjs/testing';
import { XlsxImportServiceService } from '../services/xlsx-import-service/xlsx-import-service.service';

describe('XlsximportServiceService', () => {
  let service: XlsxImportServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XlsxImportServiceService],
    }).compile();

    service = module.get<XlsxImportServiceService>(XlsxImportServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
