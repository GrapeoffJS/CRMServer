import { AuthGuard } from 'src/auth/auth.guard';
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

@UseGuards(AuthGuard)
@Controller(path)
export class PupilManipulationController {
    constructor(
        private readonly pupilManipulationsService: PupilManipulationsService
    ) {}

    @Post(':id/Pupils')
    async addPupils(@Param('id') id: string, @Body() pupilsToAdd: string[]) {
        return await this.pupilManipulationsService.addPupils(id, pupilsToAdd);
    }

    @Delete(':id/Pupils/:pupilId')
    async deletePupil(
        @Param('id') id: string,
        @Param('pupilId') pupilId: string
    ) {
        return await this.pupilManipulationsService.deletePupil(id, pupilId);
    }
}
