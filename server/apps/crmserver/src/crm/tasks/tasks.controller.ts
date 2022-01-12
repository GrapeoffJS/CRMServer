import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { path } from './path';
import { CreateTaskDTO } from './DTO/CreateTaskDTO';
import { TasksService } from './tasks.service';
import { MongoID } from '../../../../DTO/MongoID';
import { UpdateTaskDTO } from './DTO/UpdateTaskDTO';

@Controller(path)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    public async create(@Body() createTaskDTO: CreateTaskDTO) {
        return await this.tasksService.create(createTaskDTO);
    }

    @Delete(':id')
    public async delete(@Param() { id }: MongoID) {
        return await this.tasksService.delete(id);
    }

    @Patch(':id')
    public async update(
        @Param() { id }: MongoID,
        @Body() updateTaskDTO: UpdateTaskDTO
    ) {
        return await this.tasksService.update(id, updateTaskDTO);
    }
}
