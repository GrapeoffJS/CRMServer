import { Test, TestingModule } from '@nestjs/testing';
import { TypegooseHealthIndicatorService } from './typegoose-health-indicator.service';

describe('TypegooseHealthIndicatorService', () => {
  let service: TypegooseHealthIndicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypegooseHealthIndicatorService],
    }).compile();

    service = module.get<TypegooseHealthIndicatorService>(TypegooseHealthIndicatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
