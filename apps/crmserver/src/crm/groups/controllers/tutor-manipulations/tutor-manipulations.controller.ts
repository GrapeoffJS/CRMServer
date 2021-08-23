import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { Group } from '../../models/Group.model';
import { path } from '../../path';
import { TutorManipulationsService } from '../../services/tutor-manipulations/tutor-manipulations.service';

@Controller(path)
export class TutorManipulationsController {
    constructor(
        private readonly tutorManipulationsService: TutorManipulationsService
    ) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanAddTutor))
    @Post(':id/Teacher')
    public async addTutor(
        @Param('id') groupId: string,
        @Query('tutor_id') tutorId: string
    ): Promise<Group> {
        return await this.tutorManipulationsService.addTutor(groupId, tutorId);
    }
}
