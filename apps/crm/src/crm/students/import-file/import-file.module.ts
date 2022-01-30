import { Module } from '@nestjs/common';
import { XlsxImportServiceService } from './services/xlsx-import-service/xlsx-import-service.service';
import { ImportFileController } from './import-file.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from '../models/Student.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            }
        ])
    ],
    providers: [XlsxImportServiceService],
    controllers: [ImportFileController]
})
export class ImportFileModule {}
