import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { path } from '../../path';
import { Schedule } from '../../models/Schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Controller(path)
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Post(':id/Schedule')
    async addGlobalSchedule(
        @Param('id') id: string,
        @Body() schedule: Schedule[]
    ) {
        return await this.scheduleService.addGlobalSchedule(id, schedule);
    }

    @Put(':id/Pupils/:pupilId/Schedule')
    async updatePupilSchedule(
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
