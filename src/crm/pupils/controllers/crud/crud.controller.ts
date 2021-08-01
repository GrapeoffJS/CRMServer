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
    Res
} from '@nestjs/common';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { CrudService } from '../../services/crud/crud.service';
import { FilterDTO } from '../../DTO/FilterDTO';
import { path } from '../../path';
import { Response } from 'express';
import { UpdatePupilDTO } from '../../DTO/UpdatePupilDTO';

@Controller(path)
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @Post()
    async create(@Body() data: CreatePupilDTO): Promise<Pupil> {
        return await this.crudService.create(data);
    }

    @Post('/find')
    async findAll(
        @Query('limit') limit = 0,
        @Query('offset') offset = 0,
        @Body('filters') filters: FilterDTO,
        @Res() response: Response
    ) {
        return await this.crudService.findAll(
            Number(limit) || 0,
            Number(offset) || 0,
            filters,
            response
        );
    }

    @Get('/:id')
    async findById(@Param('id') id: string): Promise<Pupil> {
        return await this.crudService.findById(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<Pupil> {
        return await this.crudService.delete(id);
    }

    @Patch('/:id')
    async edit(
        @Param('id') id: string,
        @Body() updatePupilDTO: UpdatePupilDTO
    ): Promise<Pupil> {
        return await this.crudService.edit(id, updatePupilDTO);
    }
}