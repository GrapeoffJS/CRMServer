import { Test, TestingModule } from '@nestjs/testing';
import { BasicPaymentService } from '../services/basic-payment/basic-payment.service';

describe('BasicPaymentService', () => {
  let service: BasicPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicPaymentService],
    }).compile();

    service = module.get<BasicPaymentService>(BasicPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
