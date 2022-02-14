import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/action-rights';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PaginationDto } from '../../../../../../utils/dto/pagination.dto';
import { PaginatedResponseDto } from '../crud/dto/paginated-response.dto';
import { PivotTableService } from './pivot-table.service';
import { GroupModel } from '../crud/models/group.model';
import { GroupsPivotTableDto } from './dto/groups-pivot-table.dto';

@ApiTags('Groups / Pivot Table')
@ApiBearerAuth()
@Controller('/crm/groups/pivot-table')
export class PivotTableController {
    constructor(private readonly pivotTableService: PivotTableService) {}

    @SetResponseTransformationType(PaginatedResponseDto)
    @RequiredActionRights(ActionRights.SEE_GROUP)
    @ApiOkResponse({ type: () => GroupModel, isArray: true })
    @ApiBody({ type: () => GroupsPivotTableDto })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @HttpCode(200)
    @Post()
    async filter(
        @Query() { limit, offset }: PaginationDto,
        @Body() groupsPivotTableDto: GroupsPivotTableDto
    ) {
        return await this.pivotTableService.filter(
            limit,
            offset,
            groupsPivotTableDto
        );
    }
}
