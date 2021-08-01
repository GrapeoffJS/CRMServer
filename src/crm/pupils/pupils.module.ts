import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import Pupil from './models/Pupil.model';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PupilsController } from './pupils.controller';
import { PupilsService } from './pupils.service';
import { SearchIndexerModule } from '../../search-indexer/search-indexer.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImportFileController } from './import-file.controller';

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
    controllers: [PupilsController, ImportFileController],
    providers: [PupilsService]
})
export class PupilsModule {}
