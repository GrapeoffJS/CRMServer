import { Test, TestingModule } from '@nestjs/testing';
import { WorkHoursService } from './work-hours.service';

describe('WorkHoursService', () => {
  let service: WorkHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkHoursService],
    }).compile();

    service = module.get<WorkHoursService>(WorkHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
