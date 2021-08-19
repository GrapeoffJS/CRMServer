import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { ActionPermissionsGuard } from 'src/admin-panel/roles/action-permissions.guard';
import { path } from '../../path';
import { PupilManipulationsService } from '../../services/pupil-manipulations/pupil-manipulations.service';
import { ActionPermissions } from '../../../../admin-panel/roles/models/ActionPermissions';

@Controller(path)
export class PupilManipulationController {
    constructor(
        private readonly pupilManipulationsService: PupilManipulationsService
    ) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanAddPupilsToGroup))
    @Post(':id/Pupils')
    public async addPupils(
        @Param('id') id: string,
        @Body() pupilsToAdd: string[]
    ) {
        return await this.pupilManipulationsService.addPupils(id, pupilsToAdd);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanDeleteGroupPupils))
    @Delete(':id/Pupils/:pupilId')
    public async deletePupil(
        @Param('id') id: string,
        @Param('pupilId') pupilId: string
    ) {
        return await this.pupilManipulationsService.deletePupil(id, pupilId);
    }
}
