import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';
import { WorkHoursService } from './work-hours.service';
import { MongoID } from '../../../../utils/DTO/MongoID';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicController } from '../../../crm/src/auth/authentication/PublicController';

@ApiTags('Admin Panel / Work Hours')
@PublicController()
@Controller('/admin-panel/work-hours')
export class WorkHoursController {
    constructor(private readonly workHoursService: WorkHoursService) {}

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateWorkHoursDTO })
    @Put(':id')
    async create(
        @Param() { id }: MongoID,
        @Body() createWorkHoursDTO: CreateWorkHoursDTO
    ) {
        return await this.workHoursService.create(id, createWorkHoursDTO);
    }
}
