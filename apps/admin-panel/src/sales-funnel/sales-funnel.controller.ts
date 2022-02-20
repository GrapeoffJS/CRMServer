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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { MongoId } from '../../../../utils/dto/mongo-id';
import { ChangeOrderDto } from './dto/change-order.dto';
import { CreateSalesFunnelStepDto } from './dto/create-sales-funnel-step.dto';
import { UpdateSalesFunnelStepDto } from './dto/update-sales-funnel-step.dto';
import { SalesFunnelStepModel } from './models/sales-funnel-step.model';
import { SalesFunnelService } from './sales-funnel.service';

@ApiTags('Sales Funnel')
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
        @Param() { id }: MongoId,
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
    async delete(@Param() { id }: MongoId) {
        return await this.salesFunnelService.delete(id);
    }

    @ApiOkResponse({ type: () => SalesFunnelStepModel, isArray: true })
    @ApiBody({ type: () => ChangeOrderDto })
    @Put()
    async changeOrders(@Body() changeOrderDto: ChangeOrderDto[]) {
        return await this.salesFunnelService.changeOrders(changeOrderDto);
    }
}
