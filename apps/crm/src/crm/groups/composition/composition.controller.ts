import { ActionRights } from '@apps/admin-panel/roles/rights/action-rights';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { MongoId } from '@utils/dto/mongo-id';

import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { GroupModel } from '../crud/models/group.model';
import { CompositionService } from './composition.service';
import { StudentsDto } from './dto/students.dto';

@ApiTags('Group / Composition')
@ApiBearerAuth()
@Controller('crm/groups')
export class CompositionController {
    constructor(private readonly compositionService: CompositionService) {}

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.MANAGE_GROUP_STUDENTS)
    @ApiBody({ type: () => StudentsDto })
    @ApiParam({ name: 'id', type: () => String })
    @ApiCreatedResponse({ type: () => GroupModel })
    @Post(':id/students')
    async addStudents(
        @Param() { id }: MongoId,
        @Body() { students }: StudentsDto
    ) {
        return await this.compositionService.addStudents(id, students);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.MANAGE_GROUP_STUDENTS)
    @ApiBody({ type: () => StudentsDto })
    @ApiParam({ name: 'id', type: () => String })
    @ApiOkResponse({ type: () => GroupModel })
    @Delete(':id/students')
    async removeStudents(
        @Param() { id }: MongoId,
        @Body() { students }: StudentsDto
    ) {
        return await this.compositionService.removeStudents(id, students);
    }
}
