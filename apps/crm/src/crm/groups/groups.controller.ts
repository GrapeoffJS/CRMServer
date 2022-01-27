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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GroupModel } from './models/Group.model';

@ApiTags('CRM / Groups')
@Controller('/crm/groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}

    @ApiBody({ type: () => CreateGroupDTO })
    @Post()
    async create(@Body() createGroupDTO: CreateGroupDTO): Promise<GroupModel> {
        return await this.groupsService.create(createGroupDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: GroupModel[]; count: number }> {
        return await this.groupsService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<GroupModel> {
        return await this.groupsService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateGroupDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateGroupDTO: UpdateGroupDTO
    ): Promise<GroupModel> {
        return await this.groupsService.update(id, updateGroupDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<GroupModel> {
        return await this.groupsService.delete(id);
    }
}
