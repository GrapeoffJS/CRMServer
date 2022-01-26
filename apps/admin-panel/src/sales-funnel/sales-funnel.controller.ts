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
import { CreateSalesFunnelStepDTO } from './DTO/CreateSalesFunnelStepDTO';
import { SalesFunnelService } from './sales-funnel.service';
import { UpdateSalesFunnelStepDTO } from './DTO/UpdateSalesFunnelStepDTO';
import { ChangeOrderDTO } from './DTO/ChangeOrderDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('/admin-panel/sales-funnel')
@Controller('/admin-panel/sales-funnel')
export class SalesFunnelController {
    constructor(private readonly salesFunnelService: SalesFunnelService) {}

    @ApiBody({ type: () => CreateSalesFunnelStepDTO })
    @Post()
    async create(@Body() createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return await this.salesFunnelService.create(createSalesFunnelStepDTO);
    }

    @Get()
    async get() {
        return await this.salesFunnelService.get();
    }

    @ApiParam({ name: 'order', type: () => Number })
    @Get(':order')
    async getByOrder(@Param('order', ParseIntPipe) order: number) {
        return await this.salesFunnelService.findByOrder(order);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO
    ) {
        return await this.salesFunnelService.update(
            id,
            updateSalesFunnelStepDTO
        );
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.salesFunnelService.delete(id);
    }

    @ApiBody({ type: () => ChangeOrderDTO })
    @Put()
    async changeOrders(@Body() changeOrderDTO: ChangeOrderDTO[]) {
        return await this.salesFunnelService.changeOrders(changeOrderDTO);
    }
}
