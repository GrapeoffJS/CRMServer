import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { TaskModel } from './models/task.model';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: TaskModel }])],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {}
