import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { AllStaffService } from '../../services/all-staff/all-staff.service';
import { CRMUserModel } from '../../models/CRMUser.model';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/PublicController';

@ApiTags('Admin Panel / CRM Users')
@PublicController()
@Controller('/admin-panel/crm-users')
export class AllStaffController {
    constructor(private readonly allStaffService: AllStaffService) {}

    @ApiOkResponse({
        type: () => CRMUserModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.allStaffService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => CRMUserModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.allStaffService.getByID(id);
    }

    @ApiOkResponse({ type: () => CRMUserModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.allStaffService.delete(id);
    }
}
