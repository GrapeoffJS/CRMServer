import { AuthGuard } from '../../auth/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { path } from './path';
import { SearchService } from './search.service';

@UseGuards(AuthGuard)
@Controller(path)
export class SearchController {
    constructor(private readonly SearchService: SearchService) {}

    @Get('/autocompletion')
    async search(
        @Query('query') searchQuery: string,
        @Query('tutorId') tutorId: string
    ) {
        return this.SearchService.search(searchQuery, tutorId);
    }
}
