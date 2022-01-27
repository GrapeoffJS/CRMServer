import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './models/Student.model';
import { StudentsController } from './students.controller';
import { NotesModule } from './notes/notes.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';
import { StatusesModule } from './statuses/statuses.module';
import { GroupModel } from '../groups/models/Group.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: GroupModel
            }
        ]),
        NotesModule,
        PivotTableModule,
        StatusesModule
    ],
    providers: [StudentsService],
    controllers: [StudentsController]
})
export class StudentsModule {}
