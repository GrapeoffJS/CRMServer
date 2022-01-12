import { Controller, Get, Param } from '@nestjs/common';
import { path } from './path';
import { MongoID } from '../../../../DTO/MongoID';
import { SubscriptionsService } from './subscriptions.service';

@Controller(path)
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Get()
    public async findAll() {
        return await this.subscriptionsService.findAll();
    }

    @Get(':id')
    public async findById(@Param() { id }: MongoID) {
        return await this.subscriptionsService.findById(id);
    }
}
