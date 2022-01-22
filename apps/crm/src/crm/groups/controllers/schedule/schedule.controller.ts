import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { path } from '../../path';
import { Schedule } from '../../models/Schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/types/ActionPermissions';
import { MongoID } from '../../../../../../../utils/DTO/MongoID';
import { GroupID } from '../../../../../../../utils/DTO/GroupID';
import { PupilID } from '../../../../../../../utils/DTO/PupilID';

@Controller(path)
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanSetGroupSchedule))
    @Post(':id/Schedule')
    async addGlobalSchedule(
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
    async updatePupilSchedule(
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