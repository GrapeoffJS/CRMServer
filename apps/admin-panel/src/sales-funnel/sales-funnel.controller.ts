import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put
} from '@nestjs/common';
import { CreateSalesFunnelStepDto } from './dto/CreateSalesFunnelStepDto';
import { SalesFunnelService } from './sales-funnel.service';
import { UpdateSalesFunnelStepDto } from './dto/UpdateSalesFunnelStepDto';
import { ChangeOrderDto } from './dto/ChangeOrderDto';
import { MongoID } from '../../../../utils/dto/MongoID';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { SalesFunnelStepModel } from './models/SalesFunnelStep.model';
import { PublicController } from '../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / Sales Funnel')
@PublicController()
@Controller('/admin-panel/sales-funnel')
export class SalesFunnelController {
    constructor(private readonly salesFunnelService: SalesFunnelService) {}

    @ApiCreatedResponse({ type: () => SalesFunnelStepModel })
    @ApiBody({ type: () => CreateSalesFunnelStepDto })
    @Post()
    async create(@Body() createSalesFunnelStepDto: CreateSalesFunnelStepDto) {
        return await this.salesFunnelService.create(createSalesFunnelStepDto);
    }

    @ApiOkResponse({ type: () => SalesFunnelStepModel, isArray: true })
    @Get()
    async get() {
        return await this.salesFunnelService.get();
    }

    @ApiOkResponse({ type: () => SalesFunnelStepModel })
    @ApiParam({ name: 'order', type: () => Number })
    @Get(':order')
    async getByOrder(@Param('order', ParseIntPipe) order: number) {
        return await this.salesFunnelService.findByOrder(order);
    }

    @ApiOkResponse({ type: () => SalesFunnelStepModel })
    @ApiParam({ name: 'id', type: () => String })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSalesFunnelStepDto: UpdateSalesFunnelStepDto
    ) {
        return await this.salesFunnelService.update(
            id,
            updateSalesFunnelStepDto
        );
    }

    @ApiOkResponse({ type: () => SalesFunnelStepModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.salesFunnelService.delete(id);
    }

    @ApiOkResponse({ type: () => SalesFunnelStepModel, isArray: true })
    @ApiBody({ type: () => ChangeOrderDto })
    @Put()
    async changeOrders(@Body() changeOrderDto: ChangeOrderDto[]) {
        return await this.salesFunnelService.changeOrders(changeOrderDto);
    }
}
