import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { path } from './path';
import { StatusesService } from './statuses.service';
import { CreateStatusDTO } from './DTO/CreateStatusDTO';
import { UpdateStatusDTO } from './DTO/UpdateStatusDTO';
import { MongoID } from '../../../../../utils/DTO/MongoID';

@Controller(path)
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @Get()
    async findAll() {
        return await this.statusesService.findAll();
    }

    @Post()
    async create(@Body() createStatusDTO: CreateStatusDTO) {
        return this.statusesService.create(createStatusDTO);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStatusDTO: UpdateStatusDTO
    ) {
        return await this.statusesService.update(id, updateStatusDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.statusesService.delete(id);
    }
}
