import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import Pupil from 'src/crm/pupils/models/Pupil.model';
import { ConfigModule } from '@nestjs/config';
import { Group } from './models/Group.model';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SearchIndexerModule } from '../../search-indexer/search-indexer.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Pupil,
                schemaOptions: { collection: 'Pupils' }
            },
            {
                typegooseClass: Group,
                schemaOptions: { collection: 'Groups' }
            },
            {
                typegooseClass: CRMUser,
                schemaOptions: { collection: 'CRMAccounts' }
            }
        ]),
        ConfigModule,
        SearchIndexerModule
    ],
    controllers: [GroupsController],
    providers: [GroupsService]
})
export class GroupsModule {}
