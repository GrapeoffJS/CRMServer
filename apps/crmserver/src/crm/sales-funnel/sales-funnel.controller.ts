import { Controller, Get, Param, Query } from '@nestjs/common';
import { path } from './path';
import { SalesFunnelService } from './sales-funnel.service';
import { LimitDTO } from '../../../../DTO/LimitDTO';
import { PaginationDTO } from '../../../../DTO/PaginationDTO';
import { MongoID } from '../../../../DTO/MongoID';

@Controller(path)
export class SalesFunnelController {
    constructor(private readonly salesFunnelService: SalesFunnelService) {}

    @Get()
    public async findAll(@Query() { limit }: LimitDTO) {
        return await this.salesFunnelService.findAll(limit);
    }

    @Get(':id')
    public async findById(
        @Param() { id }: MongoID,
        @Query() { limit, offset }: PaginationDTO
    ) {
        return await this.salesFunnelService.findById(id, limit, offset);
    }
}
