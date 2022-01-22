import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { AllStaffService } from '../../services/all-staff/all-staff.service';
import { CRMUserModel } from '../../models/CRMUser.model';

@Controller('/admins-panel/crm-users')
export class AllStaffController {
    constructor(private readonly allStaffService: AllStaffService) {}

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: CRMUserModel[]; count: number }> {
        const { count, docs } = await this.allStaffService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.allStaffService.getByID(id);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<CRMUserModel> {
        return await this.allStaffService.delete(id);
    }
}
