import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { PaymentModel } from './models/payment.model';
import { PaymentsController } from './payments.controller';
import { BasicPaymentService } from './services/basic-payment/basic-payment.service';
import { PaymentRejectionService } from './services/payment-rejection/payment-rejection.service';
import { SubscriptionPaymentService } from './services/subscription-payment/subscription-payment.service';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: PaymentModel }])],
    providers: [
        BasicPaymentService,
        PaymentRejectionService,
        SubscriptionPaymentService
    ],
    controllers: [PaymentsController]
})
export class PaymentsModule {}
