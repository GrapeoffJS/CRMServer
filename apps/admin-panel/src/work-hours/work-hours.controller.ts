import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateWorkHoursDto } from './dto/CreateWorkHoursDto';
import { WorkHoursService } from './work-hours.service';
import { MongoID } from '../../../../utils/dto/MongoID';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicController } from '../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / Work Hours')
@PublicController()
@Controller('/admin-panel/work-hours')
export class WorkHoursController {
    constructor(private readonly workHoursService: WorkHoursService) {}

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateWorkHoursDto })
    @Put(':id')
    async create(
        @Param() { id }: MongoID,
        @Body() createWorkHoursDto: CreateWorkHoursDto
    ) {
        return await this.workHoursService.create(id, createWorkHoursDto);
    }
}
