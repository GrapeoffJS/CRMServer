import { ActionRights } from '@apps/admin-panel/roles/rights/action-rights';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { SkipResponseTransformation } from '../../../authorization/skip-response-transformation.decorator';
import { SearchDto } from './dto/search.dto';
import { SearcherInterceptor } from './searcher.interceptor';
import { SearcherService } from './searcher.service';

@ApiBearerAuth()
@UseInterceptors(SearcherInterceptor)
@Controller('/crm/search')
export class SearcherController {
    constructor(private readonly searcherService: SearcherService) {}

    @RequiredActionRights(ActionRights.USE_SEARCH)
    @SkipResponseTransformation()
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @ApiQuery({ name: 'indices', type: () => String })
    @ApiQuery({ name: 'query_string', type: () => String })
    @Get()
    async search(@Query() { limit, offset, indices, query_string }: SearchDto) {
        return this.searcherService.search(
            limit,
            offset,
            indices,
            query_string
        );
    }
}
