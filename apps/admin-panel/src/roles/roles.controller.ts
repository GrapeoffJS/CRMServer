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
import { path } from './path';
import { RolesService } from './roles.service';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';

@Controller(path)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    async create(@Body() createRoleDTO: CreateRoleDTO) {
        return await this.rolesService.create(createRoleDTO);
    }

    @Get()
    async findAll() {
        return await this.rolesService.findAll();
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.rolesService.delete(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateRoleDTO: UpdateRoleDTO
    ) {
        return await this.rolesService.edit(id, updateRoleDTO);
    }
}
