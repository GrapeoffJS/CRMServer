import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { AllStaffService } from '../../services/all-staff/all-staff.service';
import { CRMUserModel } from '../../models/CRMUser.model';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Panel / CRM Users')
@Controller('/admin-panel/crm-users')
export class AllStaffController {
    constructor(private readonly allStaffService: AllStaffService) {}

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: CRMUserModel[]; count: number }> {
        return await this.allStaffService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.allStaffService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<CRMUserModel> {
        return await this.allStaffService.delete(id);
    }
}
