import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from './models/group.model';
import { StudentModel } from '../../students/crud/models/student.model';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: GroupModel
            },
            { typegooseClass: StudentModel }
        ])
    ],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {}
