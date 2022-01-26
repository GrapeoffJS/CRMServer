import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubscriptionDTO } from './DTO/CreateSubscriptionDTO';
import { SubscriptionStatus } from './models/Subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('/admin-panel/subscriptions')
@Controller('/admin-panel/subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @ApiBody({ type: () => CreateSubscriptionDTO })
    @Post()
    async create(
        @Body() createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.create(createSubscriptionDTO);
    }

    @Get()
    async get(): Promise<SubscriptionStatus[]> {
        return await this.subscriptionsService.get();
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSubscriptionDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSubscriptionDTO: UpdateSubscriptionDTO
    ): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.update(
            id,
            updateSubscriptionDTO
        );
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<SubscriptionStatus> {
        return await this.subscriptionsService.delete(id);
    }
}
