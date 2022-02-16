import { Module } from '@nestjs/common';
import { IndexerModule } from './indexer/indexer.module';
import { SearcherModule } from './searcher/searcher.module';

@Module({
    imports: [IndexerModule, SearcherModule],
    providers: [],
    controllers: []
})
export class SearchModule {}
