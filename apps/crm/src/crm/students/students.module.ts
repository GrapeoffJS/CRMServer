import { Module } from '@nestjs/common';
import { StudentsService } from './services/students/students.service';
import { PivotTableService } from './services/pivot-table/pivot-table.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './models/Student.model';
import { StudentsController } from './controllers/students/students.controller';
import { NotesService } from './services/notes/notes.service';
import { NoteModel } from './models/Note.model';
import { NotesController } from './controllers/notes/notes.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: NoteModel
            }
        ])
    ],
    providers: [StudentsService, PivotTableService, NotesService],
    controllers: [StudentsController, NotesController]
})
export class StudentsModule {}
