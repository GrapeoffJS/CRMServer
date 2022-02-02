import { Module } from '@nestjs/common';
import { CrudService } from './crud/crud.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from './crud/models/Group.model';
import { StudentModel } from '../students/crud/models/Student.model';
import { CrudController } from './crud/crud.controller';
import { CompositionModule } from './composition/composition.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: GroupModel
            },
            { typegooseClass: StudentModel }
        ]),
        CompositionModule
    ],
    providers: [CrudService],
    controllers: [CrudController]
})
export class GroupsModule {}
