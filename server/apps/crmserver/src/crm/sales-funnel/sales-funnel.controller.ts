import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { path } from './path';
import { SalesFunnelService } from './sales-funnel.service';
import { SalesFunnelLimitDTO } from './DTO/SalesFunnelLimitDTO';
import { MongoID } from '../../../../DTO/MongoID';
import { ActionPermissionsGuard } from '../../../../admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from '../../../../admin-panel/src/roles/models/ActionPermissions';
import { SalesFunnelPaginationDTO } from './DTO/SalesFunnelPaginationDTO';

@Controller(path)
export class SalesFunnelController {
    constructor(private readonly salesFunnelService: SalesFunnelService) {
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanUseSalesFunnel))
    @Get()
    public async findAll(@Query() { limit }: SalesFunnelLimitDTO) {
        return await this.salesFunnelService.findAll(limit);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanUseSalesFunnel))
    @Get(':id')
    public async findById(
        @Param() { id }: MongoID,
        @Query() { limit, offset }: SalesFunnelPaginationDTO
    ) {
        return await this.salesFunnelService.findById(id, limit, offset);
    }
}
