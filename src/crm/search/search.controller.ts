import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ActionPermissionsGuard } from 'src/admin-panel/roles/action-permissions.guard';
import { ActionPermissions } from 'src/admin-panel/roles/models/ActionPermissions';
import { path } from './path';
import { SearchService } from './search.service';

@Controller(path)
export class SearchController {
    constructor(private readonly SearchService: SearchService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanUseSearch))
    @Get('/autocompletion')
    public async search(
        @Query('query') searchQuery: string,
        @Query('tutorid') tutorId: string
    ) {
        return this.SearchService.search(searchQuery, tutorId);
    }
}
