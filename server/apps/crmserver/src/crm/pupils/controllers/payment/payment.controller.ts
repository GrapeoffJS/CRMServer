import { Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { PaymentService } from '../../services/payment/payment.service';
import { Request } from 'express';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import CRMUser from '../../../../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { decode } from 'jsonwebtoken';
import { MongoID } from '../../../../../../DTO/MongoID';
import { PaymentDTO } from '../../DTO/PaymentDTO';

@Controller(path)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreatePayment))
    @Post(':id/Payment')
    public async Payment(
        @Param() { id }: MongoID,
        @Query() { amount, subscription }: PaymentDTO,
        @Req() req: Request
    ) {
        const { name, surname, midname }: CRMUser = decode(
            req.headers.authorization.split(' ')[1]
        ) as CRMUser;

        const issuer = `${surname} ${name} ${midname}`;

        if (!subscription) {
            return await this.paymentService.addBalance(id, amount, issuer);
        }

        return await this.paymentService.createPayment(
            id,
            subscription,
            issuer
        );
    }
}
