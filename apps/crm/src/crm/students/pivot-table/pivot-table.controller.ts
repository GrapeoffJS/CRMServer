import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PivotTableService } from './pivot-table.service';
import { StudentsPivotTableDto } from './dto/StudentsPivotTableDto';
import { StudentModel } from '../crud/models/Student.model';
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/ActionRights';
import { SetTransformationType } from '../../../authorization/set-transformation-type.decorator';
import { PaginatedResponseDto } from '../crud/dto/PaginatedResponseDto';

@ApiTags('CRM / Students / Pivot Table')
@ApiBearerAuth()
@Controller('/crm/students/pivot-table')
export class PivotTableController {
    constructor(private readonly pivotTableService: PivotTableService) {}

    @SetTransformationType(PaginatedResponseDto)
    @RequiredActionRights(ActionRights.CAN_SEE_STUDENT)
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
