import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { Schedule } from '../../models/Schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';

@Controller(path)
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanSetGroupSchedule))
    @Post(':id/Schedule')
    public async addGlobalSchedule(
        @Param('id') id: string,
        @Body() schedule: Schedule[]
    ) {
        return await this.scheduleService.addGlobalSchedule(id, schedule);
    }

    @UseGuards(
        ActionPermissionsGuard(
            ActionPermissions.CanUpdatePupilSchedule,
            ActionPermissions.CanCreatePayment
        )
    )
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
