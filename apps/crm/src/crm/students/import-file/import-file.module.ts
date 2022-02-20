import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from '../crud/models/student.model';
import { ImportFileController } from './import-file.controller';
import { CsvImportServiceService } from './services/csv-import-service/csv-import-service.service';
import { XlsxImportServiceService } from './services/xlsx-import-service/xlsx-import-service.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            }
        ])
    ],
    providers: [XlsxImportServiceService, CsvImportServiceService],
    controllers: [ImportFileController]
})
export class ImportFileModule {}
