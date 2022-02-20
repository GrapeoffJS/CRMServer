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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { MongoId } from '@utils/dto/mongo-id';
import { PaginationDto } from '@utils/dto/pagination.dto';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleModel } from './models/role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('/admin-panel/roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiBody({ type: () => RoleModel })
    @ApiCreatedResponse({ type: () => RoleModel })
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        return await this.rolesService.create(createRoleDto);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @ApiOkResponse({ type: () => RoleModel, isArray: true })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.rolesService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiOkResponse({ type: () => RoleModel })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.rolesService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiOkResponse({ type: () => RoleModel })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateRoleDto: UpdateRoleDto
    ) {
        return await this.rolesService.update(id, updateRoleDto);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiOkResponse({ type: () => RoleModel })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.rolesService.delete(id);
    }
}
