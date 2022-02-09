import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModel } from './crud/models/task.model';
import { CrudModule } from './crud/crud.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TaskModel
            }
        ]),
        TagsModule,
        CrudModule
    ],
    controllers: [],
    providers: []
})
export class TasksModule {}
