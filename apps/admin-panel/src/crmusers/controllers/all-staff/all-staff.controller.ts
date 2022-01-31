import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { AllStaffService } from '../../services/all-staff/all-staff.service';
import { CRMUserModel } from '../../models/CRMUser.model';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/public-controller.decorator';

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
    async get(@Query() { limit, offset }: PaginationDto) {
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
