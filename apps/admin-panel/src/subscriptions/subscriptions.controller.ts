import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateSubscriptionDTO } from './DTO/CreateSubscriptionDTO';
import { SubscriptionStatus } from './models/Subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';

@Controller('/admin-panel/subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Post()
    async create(
        @Body() createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.create(createSubscriptionDTO);
    }

    @Get()
    async findAll(): Promise<SubscriptionStatus[]> {
        return await this.subscriptionsService.findAll();
    }

    @Get(':id')
    async findById(@Param() { id }: MongoID): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.findById(id);
    }

    @Patch(':id')
    async edit(
        @Param() { id }: MongoID,
        updateSubscriptionDTO: UpdateSubscriptionDTO
    ): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.edit(id, updateSubscriptionDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.delete(id);
    }
}
