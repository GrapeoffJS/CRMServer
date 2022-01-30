import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateRoleDTO } from './DTO/CreateRoleDTO';
import { RolesService } from './roles.service';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { RoleModel } from './models/Role.model';
import { PublicController } from '../../../crm/src/auth/authentication/PublicController';

@ApiTags('Admin Panel / Roles')
@PublicController()
@Controller('/admin-panel/roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiCreatedResponse({ type: () => RoleModel })
    @ApiBody({ type: () => CreateRoleDTO })
    @Post()
    async create(@Body() createRoleDTO: CreateRoleDTO) {
        return await this.rolesService.create(createRoleDTO);
    }

    @ApiOkResponse({ type: () => RoleModel, isArray: true })
    @Get()
    async get() {
        return await this.rolesService.get();
    }

    @ApiOkResponse({ type: () => RoleModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.rolesService.delete(id);
    }

    @ApiOkResponse({ type: () => RoleModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateRoleDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateRoleDTO: UpdateRoleDTO
    ) {
        return await this.rolesService.edit(id, updateRoleDTO);
    }
}
