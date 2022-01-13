import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';
import { WorkHoursService } from './work-hours.service';
import { MongoID } from '../../../DTO/MongoID';
import { path } from './path';

@Controller(path)
export class WorkHoursController {
    constructor(private readonly workHoursService: WorkHoursService) {}

    @Put(':id')
    async create(
        @Param() { id }: MongoID,
        @Body() createWorkHoursDTO: CreateWorkHoursDTO
    ) {
        return await this.workHoursService.create(id, createWorkHoursDTO);
    }
}
