import Pupil from '../../models/Pupil.model';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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
import { PaginationDTO } from '../../../../../../DTO/PaginationDTO';
import { MongoID } from '../../../../../../DTO/MongoID';

@Controller(path)
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreatePupil))
    @Post()
    async create(@Body() data: CreatePupilDTO): Promise<Pupil> {
        return await this.crudService.create(data);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanGetPupilsList))
    @HttpCode(HttpStatus.OK)
    @Post('/find')
    async findAll(
        @Query() { limit, offset }: PaginationDTO,
        @Body('filters') filters: FilterDTO,
        @GetDataPermissions() dataPermissions: DataPermissions,
        @Res() response: Response
    ) {
        const { count, pupils } = await this.crudService.findAll(
            limit,
            offset,
            filters,
            dataPermissions
        );

        return response.header('Count', count || '0').json(pupils);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanSeePupilPage))
    @Get('/:id')
    async findById(
        @Param() { id }: MongoID,
        @GetDataPermissions() dataPermissions: DataPermissions
    ): Promise<Pupil> {
        return await this.crudService.findById(id, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanDeletePupil))
    @Delete('/:id')
    async delete(
        @Param() { id }: MongoID,
        @GetDataPermissions() dataPermissions: DataPermissions
    ): Promise<Pupil> {
        return await this.crudService.delete(id, dataPermissions);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanEditPupil))
    @Patch('/:id')
    async edit(
        @Param() { id }: MongoID,
        @Body() updatePupilDTO: UpdatePupilDTO,
        @GetDataPermissions() dataPermissions: DataPermissions
    ): Promise<Pupil> {
        return await this.crudService.edit(id, updatePupilDTO, dataPermissions);
    }
}
