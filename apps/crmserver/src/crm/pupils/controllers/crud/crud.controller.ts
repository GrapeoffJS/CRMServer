import Pupil from '../../models/Pupil.model';
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
    UseGuards
} from '@nestjs/common';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { CrudService } from '../../services/crud/crud.service';
import { FilterDTO } from '../../DTO/FilterDTO';
import { path } from '../../path';
import { Response } from 'express';
import { UpdatePupilDTO } from '../../DTO/UpdatePupilDTO';
import { ActionPermissions } from '../../../../../../admin-panel/src/roles/models/ActionPermissions';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { GetDataPermissions } from 'apps/admin-panel/src/roles/GetDataPermissions.decorator';
import { DataPermissions } from '../../../../../../admin-panel/src/roles/models/DataPermissions';

@Controller(path)
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreatePupil))
    @Post()
    public async create(@Body() data: CreatePupilDTO): Promise<Pupil> {
        return await this.crudService.create(data);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanGetPupilsList))
    @Post('/find')
    public async findAll(
        @Query('limit') limit,
        @Query('offset') offset,
        @Body('filters') filters: FilterDTO,
        @Res() response: Response,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ) {
        return await this.crudService.findAll(
            Number(limit),
            Number(offset),
            filters,
            response,
            dataPermissions
        );
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanSeePupilPage))
    @Get('/:id')
    public async findById(
        @Param('id') id: string,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Pupil> {
        return await this.crudService.findById(id, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanDeletePupil))
    @Delete('/:id')
    public async delete(
        @Param('id') id: string,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Pupil> {
        return await this.crudService.delete(id, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanEditPupil))
    @Patch('/:id')
    public async edit(
        @Param('id') id: string,
        @Body() updatePupilDTO: UpdatePupilDTO,
        @GetDataPermissions() dataPermissions: DataPermissions[]
    ): Promise<Pupil> {
        return await this.crudService.edit(id, updatePupilDTO, dataPermissions);
    }
}
