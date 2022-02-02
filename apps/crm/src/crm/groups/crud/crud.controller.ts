import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateGroupDto } from './dto/CreateGroupDto';
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { UpdateGroupDto } from './dto/UpdateGroupDto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { GroupModel } from './models/Group.model';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/ActionRights';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { PaginatedResponseDto } from './dto/PaginatedResponseDto';

@ApiTags('CRM / Groups')
@ApiBearerAuth()
@Controller('/crm/groups')
export class CrudController {
    constructor(private readonly groupsService: CrudService) {}

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(
        ActionRights.CREATE_GROUP,
        ActionRights.MANAGE_GROUP_STUDENTS
    )
    @ApiCreatedResponse({ type: () => GroupModel })
    @ApiBody({ type: () => CreateGroupDto })
    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupsService.create(createGroupDto);
    }

    @SetResponseTransformationType(PaginatedResponseDto)
    @RequiredActionRights(ActionRights.SEE_GROUP)
    @ApiOkResponse({
        type: () => GroupModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.groupsService.get(limit, offset);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.SEE_GROUP)
    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.groupsService.getByID(id);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.EDIT_GROUP)
    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateGroupDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateGroupDto: UpdateGroupDto
    ) {
        return await this.groupsService.update(id, updateGroupDto);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.DELETE_GROUP)
    @ApiOkResponse({ type: () => GroupModel })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.groupsService.delete(id);
    }
}
