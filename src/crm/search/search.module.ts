import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchIndexerModule } from '../../search-indexer/search-indexer.module';

@Module({
    imports: [ConfigModule, SearchIndexerModule],
    controllers: [SearchController],
    providers: []
})
export class SearchModule {}
