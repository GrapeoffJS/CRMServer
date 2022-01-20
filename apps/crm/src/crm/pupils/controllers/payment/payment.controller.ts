import { Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { PaymentService } from '../../services/payment/payment.service';
import { Request } from 'express';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/types/ActionPermissions';
import { CRMUser } from '../../../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { decode } from 'jsonwebtoken';
import { MongoID } from '../../../../../../../utils/DTO/MongoID';
import { PaymentDTO } from '../../DTO/PaymentDTO';

@Controller(path)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreatePayment))
    @Post(':id/Payment')
    async payment(
        @Param() { id }: MongoID,
        @Query() { amount, subscription }: PaymentDTO,
        @Req() req: Request
    ) {
        const { name, surname, midname }: CRMUser = decode(
            req.headers.authorization.split(' ')[1]
        ) as CRMUser;

        const issuer = `${surname} ${name} ${midname}`;

        if (!subscription) {
            return await this.paymentService.changeBalance(id, amount, issuer);
        }

        return await this.paymentService.createPayment(
            id,
            subscription,
            issuer
        );
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCancelPayment))
    @Post('/CancelPayment/:id')
    async cancelPayment(@Param() { id }: MongoID) {
        return await this.paymentService.cancelPayment(id);
    }
}
