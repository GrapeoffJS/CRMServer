import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { Schedule } from '../../models/Schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller(path)
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Post(':id/Schedule')
    public async addGlobalSchedule(
        @Param('id') id: string,
        @Body() schedule: Schedule[]
    ) {
        return await this.scheduleService.addGlobalSchedule(id, schedule);
    }

    @Put(':id/Pupils/:pupilId/Schedule')
    public async updatePupilSchedule(
        @Param('id') groupId: string,
        @Param('pupilId') pupilId: string,
        @Body() schedule: Schedule[]
    ) {
        return await this.scheduleService.updatePupilSchedule(
            groupId,
            pupilId,
            schedule
        );
    }
}
