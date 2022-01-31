import { Module } from '@nestjs/common';
import { CrudService } from './crud/crud.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './crud/models/Student.model';
import { CrudController } from './crud/crud.controller';
import { NotesModule } from './notes/notes.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';
import { GroupModel } from '../groups/models/Group.model';
import { ImportFileModule } from './import-file/import-file.module';

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
        ImportFileModule
    ],
    providers: [CrudService],
    controllers: [CrudController]
})
export class StudentsModule {}
