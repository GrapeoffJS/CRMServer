import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/CreateStatusDto';
import { UpdateStatusDto } from './dto/UpdateStatusDto';
import { MongoID } from '../../../../../utils/dto/MongoID';
import { PaginationDto } from '../../../../../utils/dto/PaginationDto';
import { StatusModel } from './models/Status.model';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { RequiredActionRights } from '../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../admin-panel/src/roles/rights/ActionRights';

@ApiTags('CRM / Statuses')
@ApiBearerAuth()
@Controller('/crm/statuses')
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @RequiredActionRights(ActionRights.CREATE_STUDENT_STATUS)
    @ApiCreatedResponse({ type: () => StatusModel })
    @ApiBody({ type: () => CreateStatusDto })
    @Post()
    async create(@Body() createStatusDto: CreateStatusDto) {
        return this.statusesService.create(createStatusDto);
    }

    @RequiredActionRights(ActionRights.SEE_STUDENT_STATUSES)
    @ApiOkResponse({
        type: () => StatusModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.statusesService.get(limit, offset);
    }

    @RequiredActionRights(ActionRights.EDIT_STUDENT_STATUS)
    @ApiCreatedResponse({ type: () => StatusModel })
    @ApiBody({ type: () => UpdateStatusDto })
    @ApiParam({ name: 'id', type: () => String })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStatusDto: UpdateStatusDto
    ) {
        return await this.statusesService.update(id, updateStatusDto);
    }

    @RequiredActionRights(ActionRights.DELETE_STUDENT_STATUS)
    @ApiCreatedResponse({ type: () => StatusModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.statusesService.delete(id);
    }
}
