import { Module } from '@nestjs/common';
import { CrudService } from './crud/crud.service';
import { CrudController } from './crud/crud.controller';
import { NotesModule } from './notes/notes.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';
import { ImportFileModule } from './import-file/import-file.module';
import { CrudModule } from './crud/crud.module';

@Module({
    imports: [CrudModule, NotesModule, PivotTableModule, ImportFileModule],
    providers: [CrudService],
    controllers: [CrudController]
})
export class StudentsModule {}
