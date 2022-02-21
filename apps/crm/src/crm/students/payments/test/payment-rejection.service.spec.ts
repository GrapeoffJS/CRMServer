import { Test, TestingModule } from '@nestjs/testing';
import { фнpaymentRejectionService } from './фнpayment-rejection.service';

describe('фнpaymentRejectionService', () => {
  let service: фнpaymentRejectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [фнpaymentRejectionService],
    }).compile();

    service = module.get<фнpaymentRejectionService>(фнpaymentRejectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
