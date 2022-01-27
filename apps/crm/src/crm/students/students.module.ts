import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './models/Student.model';
import { StudentsController } from './students.controller';
import { NotesModule } from './notes/notes.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
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
