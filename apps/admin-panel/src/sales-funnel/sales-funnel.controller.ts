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
import { MongoID } from '../../../DTO/MongoID';
import { path } from './path';

@Controller(path)
export class SalesFunnelController {
    constructor(private readonly SalesFunnelService: SalesFunnelService) {}

    @Post()
    public async create(
        @Body() createSalesFunnelStepDTO: CreateSalesFunnelStepDTO
    ) {
        return await this.SalesFunnelService.create(createSalesFunnelStepDTO);
    }

    @Get()
    public async findAll() {
        return await this.SalesFunnelService.findAll();
    }

    @Get(':order')
    public async getByOrder(@Param('order', ParseIntPipe) order: number) {
        return await this.SalesFunnelService.findByOrder(order);
    }

    @Patch(':id')
    public async edit(
        @Param() { id }: MongoID,
        @Body() updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO
    ) {
        return await this.SalesFunnelService.edit(id, updateSalesFunnelStepDTO);
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID) {
        return await this.SalesFunnelService.delete(id);
    }

    @Put()
    public async changeOrders(@Body() changeOrderDTO: ChangeOrderDTO[]) {
        return await this.SalesFunnelService.changeOrders(changeOrderDTO);
    }
}
