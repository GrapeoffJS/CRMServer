import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModel } from './models/task.model';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: TaskModel }])],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {}
