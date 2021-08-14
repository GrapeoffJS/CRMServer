import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import Pupil from './models/Pupil.model';
import { ConfigModule } from '@nestjs/config';
import { CrudController } from './controllers/crud/crud.controller';
import { CrudService } from './services/crud/crud.service';
import { ImportFileController } from './controllers/import-file/import-file.controller';
import { ImportFileService } from './services/import-file/import-file.service';
import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes/notes.controller';
import { NotesService } from './services/notes/notes.service';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';
import { TypegooseModule } from 'nestjs-typegoose';

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
        ConfigModule
    ],
    controllers: [
        ImportFileController,
        CrudController,
        PaymentController,
        NotesController
    ],
    providers: [ImportFileService, CrudService, NotesService, PaymentService]
})
export class PupilsModule {}
