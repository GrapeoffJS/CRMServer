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

@Controller('/admin-panel/sales-funnel')
export class SalesFunnelController {
    constructor(private readonly salesFunnelService: SalesFunnelService) {}

    @Post()
    async create(@Body() createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return await this.salesFunnelService.create(createSalesFunnelStepDTO);
    }

    @Get()
    async findAll() {
        return await this.salesFunnelService.findAll();
    }

    @Get(':order')
    async getByOrder(@Param('order', ParseIntPipe) order: number) {
        return await this.salesFunnelService.findByOrder(order);
    }

    @Patch(':id')
    async edit(
        @Param() { id }: MongoID,
        @Body() updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO
    ) {
        return await this.salesFunnelService.edit(id, updateSalesFunnelStepDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.salesFunnelService.delete(id);
    }

    @Put()
    async changeOrders(@Body() changeOrderDTO: ChangeOrderDTO[]) {
        return await this.salesFunnelService.changeOrders(changeOrderDTO);
    }
}
