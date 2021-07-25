import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes
} from '@nestjs/common';
import { createSubscriptionDTO } from './DTO/createSubscriptionDTO';
import { Subscription } from './models/Subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionValidationPipe } from './create-subscription-validation.pipe';

@Controller('/CRM/Subscriptions')
export class SubscriptionsController {
    constructor(private readonly SubscriptionsService: SubscriptionsService) {}

    @UsePipes(CreateSubscriptionValidationPipe)
    @Post()
    async create(
        @Body() createSubscriptionDTO: createSubscriptionDTO
    ): Promise<Subscription> {
        return await this.SubscriptionsService.create(createSubscriptionDTO);
    }

    @Get()
    async findAll(): Promise<Subscription[]> {
        return await this.SubscriptionsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Subscription> {
        return await this.SubscriptionsService.findById(id);
    }

    @Patch(':id')
    async edit(
        @Param('id') id: string,
        createSubscriptionDTO: createSubscriptionDTO
    ): Promise<Subscription> {
        return await this.SubscriptionsService.edit(id, createSubscriptionDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Subscription> {
        return await this.SubscriptionsService.delete(id);
    }
}
