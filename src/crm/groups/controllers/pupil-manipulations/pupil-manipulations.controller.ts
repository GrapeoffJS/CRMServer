import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { path } from '../../path';
import { PupilManipulationsService } from '../../services/pupil-manipulations/pupil-manipulations.service';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller(path)
export class PupilManipulationController {
    constructor(
        private readonly pupilManipulationsService: PupilManipulationsService
    ) {}

    @Post(':id/Pupils')
    public async addPupils(
        @Param('id') id: string,
        @Body() pupilsToAdd: string[]
    ) {
        return await this.pupilManipulationsService.addPupils(id, pupilsToAdd);
    }

    @Delete(':id/Pupils/:pupilId')
    public async deletePupil(
        @Param('id') id: string,
        @Param('pupilId') pupilId: string
    ) {
        return await this.pupilManipulationsService.deletePupil(id, pupilId);
    }
}
