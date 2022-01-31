import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/CreateSubscriptionDto';
import { SubscriptionModel } from './models/Subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { UpdateSubscriptionDto } from './dto/UpdateSubscriptionDto';
import { MongoID } from '../../../../utils/dto/MongoID';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / Subscriptions')
@PublicController()
@Controller('/admin-panel/subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @ApiCreatedResponse({ type: () => SubscriptionModel })
    @ApiBody({ type: () => CreateSubscriptionDto })
    @Post()
    async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return await this.subscriptionsService.create(createSubscriptionDto);
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
    @ApiBody({ type: () => UpdateSubscriptionDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSubscriptionDto: UpdateSubscriptionDto
    ) {
        return await this.subscriptionsService.update(
            id,
            updateSubscriptionDto
        );
    }

    @ApiOkResponse({ type: () => SubscriptionModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.subscriptionsService.delete(id);
    }
}
