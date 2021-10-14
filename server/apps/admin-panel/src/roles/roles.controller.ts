import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoleDTO } from './DTO/CreateRoleDTO';
import { path } from './path';
import { RolesService } from './roles.service';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';
import { MongoID } from '../../../DTO/MongoID';

@Controller(path)
export class RolesController {
    constructor(private readonly RolesService: RolesService) {
    }

    @Post()
    public async create(@Body() createRoleDTO: CreateRoleDTO) {
        return await this.RolesService.create(createRoleDTO);
    }

    @Get()
    public async findAll() {
        return await this.RolesService.findAll();
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID) {
        return await this.RolesService.delete(id);
    }

    @Patch(':id')
    public async update(
        @Param() { id }: MongoID,
        @Body() updateRoleDTO: UpdateRoleDTO
    ) {
        return await this.RolesService.edit(id, updateRoleDTO);
    }
}
