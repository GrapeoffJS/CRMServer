import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { Group } from '../../models/Group.model';
import { path } from '../../path';
import { TutorManipulationsService } from '../../services/tutor-manipulations/tutor-manipulations.service';
import { GroupID } from '../../../../../../DTO/GroupID';
import { TutorID } from '../../../../../../DTO/TutorID';

@Controller(path)
export class TutorManipulationsController {
    constructor(
        private readonly tutorManipulationsService: TutorManipulationsService
    ) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanAddTutor))
    @Post(':id/Teacher')
    public async addTutor(
        @Param() { id }: GroupID,
        @Query() { tutorID }: TutorID
    ): Promise<Group> {
        return await this.tutorManipulationsService.addTutor(id, tutorID);
    }
}
