import { ActionRights } from '@apps/admin-panel/roles/rights/action-rights';
import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PaginationDto } from '@utils/dto/pagination.dto';

import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { PaginatedResponseDto } from '../crud/dto/paginated-response.dto';
import { StudentModel } from '../crud/models/student.model';
import { StudentsPivotTableDto } from './dto/students-pivot-table.dto';
import { PivotTableService } from './pivot-table.service';

@ApiTags('Students / Pivot Table')
@ApiBearerAuth()
@Controller('/crm/students/pivot-table')
export class PivotTableController {
    constructor(private readonly pivotTableService: PivotTableService) {}

    @SetResponseTransformationType(PaginatedResponseDto)
    @RequiredActionRights(ActionRights.SEE_STUDENT)
    @ApiOkResponse({ type: () => StudentModel, isArray: true })
    @ApiBody({ type: () => StudentsPivotTableDto })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @HttpCode(200)
    @Post()
    async filter(
        @Query() { limit, offset }: PaginationDto,
        @Body() studentsPivotTableDto: StudentsPivotTableDto
    ) {
        return await this.pivotTableService.filter(
            limit,
            offset,
            studentsPivotTableDto
        );
    }
}
