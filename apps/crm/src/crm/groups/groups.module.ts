import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from './models/Group.model';
import { StudentModel } from '../students/models/Student.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: GroupModel
            },
            { typegooseClass: StudentModel }
        ])
    ],
    providers: [GroupService]
})
export class GroupsModule {}
