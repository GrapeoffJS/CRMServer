import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPaymentService } from '../services/subscription-payment/subscription-payment.service';

describe('SubscriptionPaymentService', () => {
  let service: SubscriptionPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionPaymentService],
    }).compile();

    service = module.get<SubscriptionPaymentService>(SubscriptionPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
