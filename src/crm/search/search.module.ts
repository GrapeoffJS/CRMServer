import Pupil from '../pupils/models/Pupil.model';
import { ConfigModule } from '@nestjs/config';
import { Group } from '../groups/models/Group.model';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypegooseModule } from 'nestjs-typegoose';

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
            }
        ]),
        ConfigModule
    ],
    controllers: [SearchController],
    providers: [SearchService]
})
export class SearchModule {}
