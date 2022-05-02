import { Test, TestingModule } from '@nestjs/testing';
import { StudentIndexerService } from '../student-indexer.service';

describe('StudentIndexerService', () => {
  let service: StudentIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentIndexerService],
    }).compile();

    service = module.get<StudentIndexerService>(StudentIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
