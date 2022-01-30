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
import { SubscriptionModel } from './models/Subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../crm/src/auth/authentication/PublicController';

@ApiTags('Admin Panel / Subscriptions')
@PublicController()
@Controller('/admin-panel/subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @ApiCreatedResponse({ type: () => SubscriptionModel })
    @ApiBody({ type: () => CreateSubscriptionDTO })
    @Post()
    async create(@Body() createSubscriptionDTO: CreateSubscriptionDTO) {
        return await this.subscriptionsService.create(createSubscriptionDTO);
    }

    @ApiOkResponse({ type: () => SubscriptionModel, isArray: true })
    @Get()
    async get() {
        return await this.subscriptionsService.get();
    }

    @ApiOkResponse({ type: () => SubscriptionModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.subscriptionsService.getByID(id);
    }

    @ApiOkResponse({ type: () => SubscriptionModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSubscriptionDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSubscriptionDTO: UpdateSubscriptionDTO
    ) {
        return await this.subscriptionsService.update(
            id,
            updateSubscriptionDTO
        );
    }

    @ApiOkResponse({ type: () => SubscriptionModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.subscriptionsService.delete(id);
    }
}
