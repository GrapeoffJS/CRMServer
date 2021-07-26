import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchIndexerModule } from '../../search-indexer/search-indexer.module';

@Module({
    imports: [SearchIndexerModule],
    controllers: [SearchController],
    providers: []
})
export class SearchModule {}
