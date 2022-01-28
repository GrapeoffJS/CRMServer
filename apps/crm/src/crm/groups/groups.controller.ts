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
import { GroupsService } from './groups.service';
import { CreateGroupDTO } from './DTO/CreateGroupDTO';
import { PaginationDTO } from '../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../utils/DTO/MongoID';
import { UpdateGroupDTO } from './DTO/UpdateGroupDTO';
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

@ApiTags('CRM / Groups')
@ApiBearerAuth()
@Controller('/crm/groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}

    @ApiCreatedResponse({ type: () => GroupModel })
    @ApiBody({ type: () => CreateGroupDTO })
    @Post()
    async create(@Body() createGroupDTO: CreateGroupDTO) {
        return await this.groupsService.create(createGroupDTO);
    }

    @ApiOkResponse({
        type: () => GroupModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.groupsService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.groupsService.getByID(id);
    }

    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateGroupDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateGroupDTO: UpdateGroupDTO
    ) {
        return await this.groupsService.update(id, updateGroupDTO);
    }

    @ApiOkResponse({ type: () => GroupModel })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.groupsService.delete(id);
    }
}
