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
    UsePipes
} from '@nestjs/common';
import { CreateGroupDTO } from '../../DTO/CreateGroupDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { UpdateGroupDTO } from '../../DTO/UpdateGroupDTO';
import { Group } from '../../models/Group.model';
import { path } from '../../path';
import { CreateGroupValidationPipe } from '../../pipes/create-group-validation.pipe';
import { CrudService } from '../../services/crud/crud.service';
import { Response } from 'express';

@Controller(path)
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @UsePipes(CreateGroupValidationPipe)
    @Post()
    async create(@Body() createGroupDTO: CreateGroupDTO): Promise<Group> {
        return await this.crudService.create(createGroupDTO);
    }

    @Post('/getByIds')
    async findByIds(@Body() ids: string[]): Promise<Group[]> {
        return await this.crudService.findByIds(ids);
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
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Group> {
        return await this.crudService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Group> {
        return await this.crudService.delete(id);
    }
    @Patch(':id')
    async edit(
        @Param('id') id: string,
        @Body() updateGroupDTO: UpdateGroupDTO
    ): Promise<Group> {
        return await this.crudService.edit(id, updateGroupDTO);
    }
}
