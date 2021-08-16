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
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller(path)
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @Post()
    public async create(@Body() data: CreatePupilDTO): Promise<Pupil> {
        return await this.crudService.create(data);
    }

    @Post('/find')
    public async findAll(
        @Query('limit') limit,
        @Query('offset') offset,
        @Body('filters') filters: FilterDTO,
        @Res() response: Response
    ) {
        return await this.crudService.findAll(
            Number(limit),
            Number(offset),
            filters,
            response
        );
    }

    @Get('/:id')
    public async findById(@Param('id') id: string): Promise<Pupil> {
        return await this.crudService.findById(id);
    }

    @Delete('/:id')
    public async delete(@Param('id') id: string): Promise<Pupil> {
        return await this.crudService.delete(id);
    }

    @Patch('/:id')
    public async edit(
        @Param('id') id: string,
        @Body() updatePupilDTO: UpdatePupilDTO
    ): Promise<Pupil> {
        return await this.crudService.edit(id, updatePupilDTO);
    }
}
