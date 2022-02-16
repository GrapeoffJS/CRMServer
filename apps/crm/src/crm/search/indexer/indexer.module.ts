import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getESConnectionUri from '../../../../../../config/getESConnectionUri';
import { StudentIndexerService } from './services/student-indexer/student-indexer.service';
import { GroupIndexerService } from './services/group-indexer/group-indexer.service';
import { studentsIndexName } from './services/student-indexer/students-index-name';
import { groupsIndexName } from './services/group-indexer/groups-index-name';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    node: getESConnectionUri(
                        configService.get('ELASTIC_SEARCH_PROTOCOL'),
                        configService.get('ELASTIC_SEARCH_HOST'),
                        configService.get('ELASTIC_SEARCH_PORT')
                    ),
                    auth: {
                        username: configService.get('ELASTIC_SEARCH_USERNAME'),
                        password: configService.get('ELASTIC_SEARCH_PASSWORD')
                    }
                };
            }
        })
    ],
    providers: [
        StudentIndexerService,
        GroupIndexerService,
        { provide: 'STUDENTS_INDEX_NAME', useValue: studentsIndexName },
        { provide: 'GROUPS_INDEX_NAME', useValue: groupsIndexName }
    ],
    controllers: []
})
export class IndexerModule {}
