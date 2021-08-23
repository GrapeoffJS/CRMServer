import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import { CreateGroupDTO } from '../../DTO/CreateGroupDTO';
import { CreateGroupValidationPipe } from '../../pipes/create-group-validation.pipe';
import { CrudService } from '../../services/crud/crud.service';
import { FilterDTO } from '../../DTO/FilterDTO';
import { Group } from '../../models/Group.model';
import { path } from '../../path';
import { Response } from 'express';
import { UpdateGroupDTO } from '../../DTO/UpdateGroupDTO';
import { ActionPermissionsGuard } from '../../../../../../admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { GetDataPermissions } from '../../../../../../admin-panel/src/roles/GetDataPermissions.decorator';
import { DataPermissions } from '../../../../../../admin-panel/src/roles/models/DataPermissions';

@Controller(path)
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreateGroup))
    @UsePipes(CreateGroupValidationPipe)
    @Post()
    public async create(
        @Body() createGroupDTO: CreateGroupDTO
    ): Promise<Group> {
        return await this.crudService.create(createGroupDTO);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanGetGroupsList))
    @Post('/getByIds')
    public async findByIds(
        @Body() ids: string[],
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Group[]> {
        return await this.crudService.findByIds(ids, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanGetGroupsList))
    @Post('/find')
    public async findAll(
        @Query('limit') limit,
        @Query('offset') offset,
        @Body('filters') filters: FilterDTO,
        @Res() response: Response,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ) {
        return await this.crudService.findAll(
            Number(limit) || 0,
            Number(offset) || 0,
            filters,
            response,
            dataPermissions
        );
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanSeeGroupPage))
    @Get(':id')
    public async findById(
        @Param('id') id: string,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Group> {
        return await this.crudService.findById(id, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanDeleteGroup))
    @Delete(':id')
    public async delete(
        @Param('id') id: string,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Group> {
        return await this.crudService.delete(id, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanEditGroup))
    @Patch(':id')
    public async edit(
        @Param('id') id: string,
        @Body() updateGroupDTO: UpdateGroupDTO,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Group> {
        return await this.crudService.edit(id, updateGroupDTO, dataPermissions);
    }
}
