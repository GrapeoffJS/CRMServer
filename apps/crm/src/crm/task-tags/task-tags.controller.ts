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
    constructor(private readonly taskTagsService: TaskTagsService) {}

    @Get()
    async findAll() {
        return await this.taskTagsService.findAll();
    }

    @Post()
    async create(@Body() createTaskTagDTO: CreateTaskTagDTO) {
        return this.taskTagsService.create(createTaskTagDTO);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateTaskTagDTO: UpdateTaskTagDTO
    ) {
        return await this.taskTagsService.update(id, updateTaskTagDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.taskTagsService.delete(id);
    }
}
