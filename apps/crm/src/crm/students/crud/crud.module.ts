import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from '../../groups/crud/models/group.model';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { StudentModel } from './models/student.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: GroupModel
            },
            {
                typegooseClass: StudentModel
            }
        ])
    ],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {}
