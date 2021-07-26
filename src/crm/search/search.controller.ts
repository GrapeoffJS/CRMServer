import { AuthGuard } from '../../auth/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchIndexerService } from '../../search-indexer/search-indexer.service';

@UseGuards(AuthGuard)
@Controller('CRM/Search')
export class SearchController {
    constructor(private readonly searchIndexer: SearchIndexerService) {}

    @Get('/autocompletion')
    async searchAutocomplete(@Query('query') searchQuery: string) {}
}
