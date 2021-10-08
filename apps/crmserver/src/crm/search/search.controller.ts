import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { path } from './path';
import { SearchService } from './search.service';
import { TutorID } from '../../../../DTO/TutorID';

@UseGuards(ActionPermissionsGuard(ActionPermissions.CanUseSearch))
@Controller(path)
export class SearchController {
    constructor(private readonly SearchService: SearchService) {}

    @Get('/autocompletion')
    public async search(
        @Query('query') searchQuery: string,
        @Query() { tutorID }: TutorID
    ) {
        return this.SearchService.search(searchQuery, tutorID);
    }

    @Get('/CRMUsers')
    public async searchCRMUsers(@Query('query') searchQuery: string) {
        return this.SearchService.searchCRMUsers(searchQuery);
    }
}
