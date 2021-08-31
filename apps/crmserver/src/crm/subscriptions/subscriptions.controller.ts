import { Controller, Get, Param } from '@nestjs/common';
import { path } from './path';
import { SubscriptionsService } from '../../../../admin-panel/src/subscriptions/subscriptions.service';
import { AccountTypes } from '../../../../admin-panel/src/crmaccounts/models/AccountTypes';
import { MongoID } from '../../../../DTO/MongoID';

@Controller(path)
export class SubscriptionsController {
    constructor(private readonly SubscriptionsService: SubscriptionsService) {}

    @Get()
    public async find() {
        return await this.SubscriptionsService.findAll();
    }

    @Get(':id')
    public async findById(@Param() { id }: MongoID) {
        return await this.SubscriptionsService.findById(
            id,
            AccountTypes.Teacher
        );
    }
}
