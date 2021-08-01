import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import Pupil from './models/Pupil.model';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PupilsController } from './pupils.controller';
import { SearchIndexerModule } from '../../search-indexer/search-indexer.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImportFileController } from './controllers/import-file/import-file.controller';
import { ImportFileService } from './services/import-file/import-file.service';
import { CrudService } from './services/crud/crud.service';
import { NotesService } from './services/notes/notes.service';
import { PaymentService } from './services/payment/payment.service';
import { CrudController } from './controllers/crud/crud.controller';
import { PaymentController } from './controllers/payment/payment.controller';
import { NotesController } from './controllers/notes/notes.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Pupil,
                schemaOptions: { collection: 'Pupils' }
            },
            {
                typegooseClass: CRMUser,
                schemaOptions: { collection: 'CRMAccounts' }
            }
        ]),
        SearchIndexerModule,
        ConfigModule
    ],
    controllers: [
        PupilsController,
        ImportFileController,
        CrudController,
        PaymentController,
        NotesController
    ],
    providers: [ImportFileService, CrudService, NotesService, PaymentService]
})
export class PupilsModule {}
