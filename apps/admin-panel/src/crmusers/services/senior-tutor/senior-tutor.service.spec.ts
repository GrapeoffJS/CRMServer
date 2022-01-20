import { Test, TestingModule } from '@nestjs/testing';
import { SeniorTutorService } from './senior-tutor.service';

describe('SeniorTutorService', () => {
  let service: SeniorTutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeniorTutorService],
    }).compile();

    service = module.get<SeniorTutorService>(SeniorTutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
