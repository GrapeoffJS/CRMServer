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
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../../../../../../utils/dto/pagination.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { GroupModel } from './models/group.model';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/action-rights';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { MongoIds } from '../../../../../../utils/dto/mongo-ids';

@ApiTags('Groups')
@ApiBearerAuth()
@Controller('/crm/groups')
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(
        ActionRights.CREATE_GROUP,
        ActionRights.MANAGE_GROUP_STUDENTS
    )
    @ApiCreatedResponse({ type: () => GroupModel })
    @ApiBody({ type: () => CreateGroupDto })
    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.crudService.create(createGroupDto);
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
        return await this.crudService.get(limit, offset);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.SEE_GROUP)
    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.crudService.getByID(id);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.EDIT_GROUP)
    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateGroupDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateGroupDto: UpdateGroupDto
    ) {
        return await this.crudService.update(id, updateGroupDto);
    }

    @SetResponseTransformationType(GroupModel)
    @RequiredActionRights(ActionRights.DELETE_GROUP)
    @ApiOkResponse({ type: () => GroupModel })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.crudService.delete(id);
    }

    @RequiredActionRights(ActionRights.DELETE_GROUP)
    @Delete()
    async deleteMany(@Body() { ids }: MongoIds) {
        return await this.crudService.deleteMany(ids);
    }
}
