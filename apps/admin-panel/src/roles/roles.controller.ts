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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleModel } from './models/Role.model';

@ApiTags('/admin-panel/roles')
@Controller('/admin-panel/roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiBody({ type: () => CreateRoleDTO })
    @Post()
    async create(@Body() createRoleDTO: CreateRoleDTO): Promise<RoleModel> {
        return await this.rolesService.create(createRoleDTO);
    }

    @Get()
    async get(): Promise<RoleModel[]> {
        return await this.rolesService.get();
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<RoleModel> {
        return await this.rolesService.delete(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateRoleDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateRoleDTO: UpdateRoleDTO
    ): Promise<RoleModel> {
        return await this.rolesService.edit(id, updateRoleDTO);
    }
}
