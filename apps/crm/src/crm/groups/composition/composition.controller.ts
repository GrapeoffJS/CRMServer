import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { StudentsDto } from './dto/StudentsDto';
import { GroupModel } from '../crud/models/Group.model';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/ActionRights';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';

@ApiTags('CRM / Groups / {id} / Students')
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
        @Param() { id }: MongoID,
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
        @Param() { id }: MongoID,
        @Body() { students }: StudentsDto
    ) {
        return await this.compositionService.removeStudents(id, students);
    }
}
