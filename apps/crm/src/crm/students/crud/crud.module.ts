import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './models/student.model';
import { GroupModel } from '../../groups/crud/models/group.model';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: GroupModel
            }
        ])
    ],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {}
