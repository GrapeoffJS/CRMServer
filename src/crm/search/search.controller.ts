import { AuthGuard } from '../../auth/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';

@UseGuards(AuthGuard)
@Controller('CRM/Search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('/autocompletion')
    async searchAutocomplete(@Query('query') searchQuery: string) {
        return await this.searchService.searchAutocompletion(searchQuery);
    }

    @Get()
    async fullSearch(@Query('query') searchQuery: string) {
        return await this.searchService.fullSearch(searchQuery);
    }
}
