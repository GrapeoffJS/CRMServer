import { TutorModel } from '@apps/admin-panel/crmusers/models/tutor.model';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RightsNotNeeded } from '../../authorization/rights-not-needed.decorator';
import { SetResponseTransformationType } from '../../authorization/set-response-transformation-type.decorator';
import { TutorsService } from './tutors.service';

@ApiTags('Tutors')
@ApiBearerAuth()
@Controller('/crm/tutors')
export class TutorsController {
    constructor(private readonly tutorsService: TutorsService) {}

    @RightsNotNeeded()
    @SetResponseTransformationType(TutorModel)
    @ApiOkResponse({ type: () => TutorModel, isArray: true })
    @Get()
    async get() {
        return this.tutorsService.get();
    }
}
