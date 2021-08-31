import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { Schedule } from '../../models/Schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { MongoID } from '../../../../../../DTO/MongoID';
import { GroupID } from '../../../../../../DTO/GroupID';
import { PupilID } from '../../../../../../DTO/PupilID';

@Controller(path)
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanSetGroupSchedule))
    @Post(':id/Schedule')
    public async addGlobalSchedule(
        @Param() { id }: MongoID,
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
    @Put(':id/Pupils/:pupilID/Schedule')
    public async updatePupilSchedule(
        @Param() { id }: GroupID,
        @Param() { pupilID }: PupilID,
        @Body() schedule: Schedule[]
    ) {
        return await this.scheduleService.updatePupilSchedule(
            id,
            pupilID,
            schedule
        );
    }
}
