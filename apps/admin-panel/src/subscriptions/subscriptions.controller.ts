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
import { MongoID } from '../../../DTO/MongoID';

@Controller(path)
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Post()
    public async create(
        @Body() createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<Subscription> {
        return await this.subscriptionsService.create(createSubscriptionDTO);
    }

    @Get()
    public async findAll(): Promise<Subscription[]> {
        return await this.subscriptionsService.findAll();
    }

    @Get(':id')
    public async findById(@Param() { id }: MongoID): Promise<Subscription> {
        return await this.subscriptionsService.findById(id);
    }

    @Patch(':id')
    public async edit(
        @Param() { id }: MongoID,
        updateSubscriptionDTO: UpdateSubscriptionDTO
    ): Promise<Subscription> {
        return await this.subscriptionsService.edit(id, updateSubscriptionDTO);
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID): Promise<Subscription> {
        return await this.subscriptionsService.delete(id);
    }
}
