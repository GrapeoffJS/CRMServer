import { Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { PaymentService } from '../../services/payment/payment.service';
import { Request } from 'express';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller(path)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post(':id/Payment')
    public async createPayment(
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
