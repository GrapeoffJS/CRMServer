import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { path } from './path';
import { SearchService } from './search.service';

@Controller(path)
export class SearchController {
    constructor(private readonly SearchService: SearchService) {}

    @Get('/autocompletion')
    public async search(
        @Query('query') searchQuery: string,
        @Query('tutorid') tutorId: string
    ) {
        return this.SearchService.search(searchQuery, tutorId);
    }
}
