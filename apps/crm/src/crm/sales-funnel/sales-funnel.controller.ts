import { Controller, Get, Param, Query } from '@nestjs/common';
import { path } from './path';
import { SalesFunnelService } from './sales-funnel.service';
import { SalesFunnelLimitDTO } from './DTO/SalesFunnelLimitDTO';
import { MongoID } from '../../../../../utils/DTO/MongoID';
import { SalesFunnelPaginationDTO } from './DTO/SalesFunnelPaginationDTO';

@Controller(path)
export class SalesFunnelController {
    constructor(private readonly salesFunnelService: SalesFunnelService) {}

    @Get()
    async findAll(@Query() { limit }: SalesFunnelLimitDTO) {
        return await this.salesFunnelService.findAll(limit);
    }

    @Get(':id')
    async findById(
        @Param() { id }: MongoID,
        @Query() { limit, offset }: SalesFunnelPaginationDTO
    ) {
        return await this.salesFunnelService.findById(id, limit, offset);
    }
}
