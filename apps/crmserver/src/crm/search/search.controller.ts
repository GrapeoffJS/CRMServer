import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { path } from './path';
import { SearchService } from './search.service';
import { TutorID } from '../../../../DTO/TutorID';

@Controller(path)
export class SearchController {
    constructor(private readonly SearchService: SearchService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanUseSearch))
    @Get('/autocompletion')
    public async search(
        @Query('query') searchQuery: string,
        @Query() { tutorID }: TutorID
    ) {
        return this.SearchService.search(searchQuery, tutorID);
    }
}
