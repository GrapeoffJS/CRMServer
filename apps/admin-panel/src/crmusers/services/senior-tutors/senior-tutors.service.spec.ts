import { Test, TestingModule } from '@nestjs/testing';
import { SeniorTutorsService } from './senior-tutors.service';

describe('SeniorTutorService', () => {
  let service: SeniorTutorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeniorTutorsService],
    }).compile();

    service = module.get<SeniorTutorsService>(SeniorTutorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
