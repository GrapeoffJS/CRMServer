import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PivotTableService } from './pivot-table.service';
import { StudentsPivotTableDTO } from './DTO/StudentsPivotTableDTO';
import { StudentModel } from '../models/Student.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';

@ApiTags('CRM / Students / Pivot Table')
@ApiBearerAuth()
@Controller('/crm/students/pivot-table')
export class PivotTableController {
    constructor(private readonly pivotTableService: PivotTableService) {}

    @ApiOkResponse({ type: () => StudentModel, isArray: true })
    @ApiBody({ type: () => StudentsPivotTableDTO })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @HttpCode(200)
    @Post()
    async filter(
        @Query() { limit, offset }: PaginationDTO,
        @Body() studentsPivotTableDTO: StudentsPivotTableDTO
    ) {
        return await this.pivotTableService.filter(
            limit,
            offset,
            studentsPivotTableDTO
        );
    }
}
