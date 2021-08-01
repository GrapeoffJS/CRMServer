import { Controller, Param, Post, Query } from '@nestjs/common';
import { Group } from '../../models/Group.model';
import { path } from '../../path';
import { TutorManipulationsService } from '../../services/tutor-manipulations/tutor-manipulations.service';

@Controller(path)
export class TutorManipulationsController {
    constructor(
        private readonly tutorManipulationsService: TutorManipulationsService
    ) {}

    @Post(':id/Teacher')
    async addTutor(
        @Param('id') groupId: string,
        @Query('tutor_id') tutorId: string
    ): Promise<Group> {
        return await this.tutorManipulationsService.addTutor(groupId, tutorId);
    }
}
