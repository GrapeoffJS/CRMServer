import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { path } from './path';
import { StatusesService } from './statuses.service';
import { CreateStatusDTO } from './DTO/CreateStatusDTO';
import { UpdateStatusDTO } from './DTO/UpdateStatusDTO';
import { MongoID } from '../../../../DTO/MongoID';

@Controller(path)
export class StatusesController {
    constructor(private readonly StatusesService: StatusesService) {
    }

    @Get()
    public async findAll() {
        return await this.StatusesService.findAll();
    }

    @Post()
    public async create(@Body() createStatusDTO: CreateStatusDTO) {
        return this.StatusesService.create(createStatusDTO);
    }

    @Patch(':id')
    public async update(
        @Param() { id }: MongoID,
        @Body() updateStatusDTO: UpdateStatusDTO
    ) {
        return await this.StatusesService.update(id, updateStatusDTO);
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID) {
        return await this.StatusesService.delete(id);
    }
}
