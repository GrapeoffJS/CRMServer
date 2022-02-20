import { Module } from '@nestjs/common';
import { CrudModule } from './crud/crud.module';
import { ImportFileModule } from './import-file/import-file.module';
import { NotesModule } from './notes/notes.module';
import { PaymentsModule } from './payments/payments.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';

@Module({
    imports: [
        CrudModule,
        NotesModule,
        PivotTableModule,
        ImportFileModule,
        PaymentsModule
    ],
    providers: [],
    controllers: []
})
export class StudentsModule {}
