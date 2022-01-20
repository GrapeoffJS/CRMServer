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
import { Subscription } from './models/Subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';
import { path } from './path';
import { MongoID } from '../../../../utils/DTO/MongoID';

@Controller(path)
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Post()
    async create(
        @Body() createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<Subscription> {
        return await this.subscriptionsService.create(createSubscriptionDTO);
    }

    @Get()
    async findAll(): Promise<Subscription[]> {
        return await this.subscriptionsService.findAll();
    }

    @Get(':id')
    async findById(@Param() { id }: MongoID): Promise<Subscription> {
        return await this.subscriptionsService.findById(id);
    }

    @Patch(':id')
    async edit(
        @Param() { id }: MongoID,
        updateSubscriptionDTO: UpdateSubscriptionDTO
    ): Promise<Subscription> {
        return await this.subscriptionsService.edit(id, updateSubscriptionDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<Subscription> {
        return await this.subscriptionsService.delete(id);
    }
}
