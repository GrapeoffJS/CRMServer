import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { MongoId } from '../../../../utils/dto/mongo-id';
import { CreateWorkHoursDto } from './dto/create-work-hours.dto';
import { WorkHoursService } from './work-hours.service';

@ApiTags('Work Hours')
@Controller('/admin-panel/work-hours')
export class WorkHoursController {
    constructor(private readonly workHoursService: WorkHoursService) {}

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateWorkHoursDto })
    @Put(':id')
    async create(
        @Param() { id }: MongoId,
        @Body() createWorkHoursDto: CreateWorkHoursDto
    ) {
        return await this.workHoursService.create(id, createWorkHoursDto);
    }
}
