import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put
} from '@nestjs/common';
import { CreateSalesFunnelStepDTO } from './DTO/CreateSalesFunnelStepDTO';
import { SalesFunnelService } from './sales-funnel.service';
import { UpdateSalesFunnelStepDTO } from './DTO/UpdateSalesFunnelStepDTO';
import { ChangeOrderDTO } from './DTO/ChangeOrderDTO';
import { MongoID } from '../../../DTO/MongoID';

@Controller('/AdminPanel/SalesFunnel')
export class SalesFunnelController {
    constructor(private readonly SalesFunnelService: SalesFunnelService) {}

    @Post()
    public async create(createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return await this.SalesFunnelService.create(createSalesFunnelStepDTO);
    }

    @Get()
    public async get() {
        return await this.SalesFunnelService.get();
    }

    @Patch(':id')
    public async edit(
        @Param() { id }: MongoID,
        updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO
    ) {
        return await this.SalesFunnelService.edit(id, updateSalesFunnelStepDTO);
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID) {
        return await this.SalesFunnelService.delete(id);
    }

    @Put()
    public async changeOrders(changeOrderDTO: ChangeOrderDTO[]) {
        return await this.SalesFunnelService.changeOrders(changeOrderDTO);
    }
}
