import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { path } from '../../path';
import { GroupCompositionService } from '../../services/group-composition/group-composition.service';
import { ActionPermissions } from '../../../../../../admin-panel/src/roles/models/ActionPermissions';
import { MongoID } from '../../../../../../DTO/MongoID';
import { MongoIDs } from '../../../../../../DTO/MongoIDs';
import { GroupID } from '../../../../../../DTO/GroupID';
import { PupilID } from '../../../../../../DTO/PupilID';

@Controller(path)
export class GroupCompositionController {
    constructor(
        private readonly pupilManipulationsService: GroupCompositionService
    ) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanAddPupilsToGroup))
    @Post(':id/Pupils')
    public async addPupils(
        @Param() { id }: MongoID,
        @Body() { ids }: MongoIDs
    ) {
        return await this.pupilManipulationsService.addPupils(id, ids);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanDeleteGroupPupils))
    @Delete(':id/Pupils/:pupilID')
    public async deletePupil(
        @Param() { id }: GroupID,
        @Param() { pupilID }: PupilID
    ) {
        return await this.pupilManipulationsService.deletePupil(id, pupilID);
    }
}
