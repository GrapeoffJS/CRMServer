import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MongoId } from '@utils/dto/mongo-id';
import { PaginationDto } from '@utils/dto/pagination.dto';

import { CrmUserModel } from '../../models/crm-user.model';
import { AllStaffService } from '../../services/all-staff/all-staff.service';

@ApiTags('CRM Users')
@Controller('/admin-panel/crm-users')
export class AllStaffController {
    constructor(private readonly allStaffService: AllStaffService) {}

    @ApiOkResponse({
        type: () => CrmUserModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.allStaffService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => CrmUserModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.allStaffService.getByID(id);
    }

    @ApiOkResponse({ type: () => CrmUserModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.allStaffService.delete(id);
    }
}
