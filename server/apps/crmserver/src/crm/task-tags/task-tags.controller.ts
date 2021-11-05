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
import { MongoID } from '../../../../DTO/MongoID';
import { TaskTagsService } from './task-tags.service';
import { CreateTaskTagDTO } from './DTO/CreateTaskTagDTO';
import { UpdateTaskTagDTO } from './DTO/UpdateTaskTagDTO';

@Controller(path)
export class TaskTagsController {
    constructor(private readonly TaskTagsService: TaskTagsService) {}

    @Get()
    public async findAll() {
        return await this.TaskTagsService.findAll();
    }

    @Post()
    public async create(@Body() createTaskTagDTO: CreateTaskTagDTO) {
        return this.TaskTagsService.create(createTaskTagDTO);
    }

    @Patch(':id')
    public async update(
        @Param() { id }: MongoID,
        @Body() updateTaskTagDTO: UpdateTaskTagDTO
    ) {
        return await this.TaskTagsService.update(id, updateTaskTagDTO);
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID) {
        return await this.TaskTagsService.delete(id);
    }
}
