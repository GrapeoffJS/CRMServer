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
import { CreateGroupDto } from './dto/CreateGroupDto';
import { PaginationDto } from '../../../../../utils/dto/PaginationDto';
import { MongoID } from '../../../../../utils/dto/MongoID';
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

@ApiTags('CRM / Groups')
@ApiBearerAuth()
@Controller('/crm/groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}

    @ApiCreatedResponse({ type: () => GroupModel })
    @ApiBody({ type: () => CreateGroupDto })
    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupsService.create(createGroupDto);
    }

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

    @ApiOkResponse({ type: () => GroupModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.groupsService.getByID(id);
    }

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

    @ApiOkResponse({ type: () => GroupModel })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.groupsService.delete(id);
    }
}
