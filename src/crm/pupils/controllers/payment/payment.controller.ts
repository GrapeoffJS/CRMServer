import { Controller, Param, Post, Query, Req } from '@nestjs/common';
import { path } from '../../path';
import { PaymentService } from '../../services/payment/payment.service';
import { Request } from 'express';

@Controller(path)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post(':id/Payment')
    async createPayment(
        @Param('id') id: string,
        @Query('amount') amount: string,
        @Query('subscription') sub: string,
        @Req() req: Request
    ) {
        return await this.paymentService.createPayment(
            id,
            Number(amount),
            sub,
            req
        );
    }
}
