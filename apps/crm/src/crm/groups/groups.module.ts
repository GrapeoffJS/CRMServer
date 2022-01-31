import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from './models/Group.model';
import { StudentModel } from '../students/crud/models/Student.model';
import { GroupsController } from './groups.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: GroupModel
            },
            { typegooseClass: StudentModel }
        ])
    ],
    providers: [GroupsService],
    controllers: [GroupsController]
})
export class GroupsModule {}
