import { Controller, Param, Put } from '@nestjs/common';
import { path } from '../path';
import { MongoID } from '../../../../../DTO/MongoID';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';
import { WorkHoursService } from './work-hours.service';

@Controller(path)
export class WorkHoursController {
    constructor(private readonly WorkHoursService: WorkHoursService) {}

    @Put(':id/WorkHours')
    public async create(
        @Param() { id }: MongoID,
        createWorkHoursDTO: CreateWorkHoursDTO
    ) {
        return await this.WorkHoursService.create(id, createWorkHoursDTO);
    }
}
