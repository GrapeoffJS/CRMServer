import { Controller, Param, Put } from '@nestjs/common';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';
import { WorkHoursService } from './work-hours.service';
import { MongoID } from '../../../DTO/MongoID';
import { path } from './path';

@Controller(path)
export class WorkHoursController {
    constructor(private readonly WorkHoursService: WorkHoursService) {}

    @Put(':id')
    public async create(
        @Param() { id }: MongoID,
        createWorkHoursDTO: CreateWorkHoursDTO
    ) {
        return await this.WorkHoursService.create(id, createWorkHoursDTO);
    }
}
