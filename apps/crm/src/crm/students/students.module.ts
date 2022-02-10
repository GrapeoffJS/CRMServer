import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';
import { ImportFileModule } from './import-file/import-file.module';
import { CrudModule } from './crud/crud.module';

@Module({
    imports: [CrudModule, NotesModule, PivotTableModule, ImportFileModule],
    providers: [],
    controllers: []
})
export class StudentsModule {}
