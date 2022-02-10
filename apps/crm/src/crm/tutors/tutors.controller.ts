import { Controller, Get } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { SetResponseTransformationType } from '../../authorization/set-response-transformation-type.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TutorModel } from '../../../../admin-panel/src/crmusers/models/tutor.model';
import { RightsNotNeeded } from '../../authorization/rights-not-needed.decorator';

@ApiTags('Tutors')
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
