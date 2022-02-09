import { Module } from '@nestjs/common';
import { CrudController } from './crud/crud.controller';
import { CrudService } from './crud/crud.service';
import { TagsModule } from './tags/tags.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModel } from './crud/models/task.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TaskModel
            }
        ]),
        TagsModule
    ],
    controllers: [CrudController],
    providers: [CrudService]
})
export class TasksModule {}
