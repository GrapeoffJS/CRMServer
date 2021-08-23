import { Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { PaymentService } from '../../services/payment/payment.service';
import { Request } from 'express';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';

@Controller(path)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreatePayment))
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