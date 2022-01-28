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
import { CreateStatusDTO } from './DTO/CreateStatusDTO';
import { UpdateStatusDTO } from './DTO/UpdateStatusDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
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

@ApiTags('CRM / Statuses')
@ApiBearerAuth()
@Controller('/crm/statuses')
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @ApiOkResponse({
        type: () => StatusModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.statusesService.get(limit, offset);
    }

    @ApiCreatedResponse({ type: () => StatusModel })
    @ApiBody({ type: () => CreateStatusDTO })
    @Post()
    async create(@Body() createStatusDTO: CreateStatusDTO) {
        return this.statusesService.create(createStatusDTO);
    }

    @ApiCreatedResponse({ type: () => StatusModel })
    @ApiBody({ type: () => UpdateStatusDTO })
    @ApiParam({ name: 'id', type: () => String })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStatusDTO: UpdateStatusDTO
    ) {
        return await this.statusesService.update(id, updateStatusDTO);
    }

    @ApiCreatedResponse({ type: () => StatusModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.statusesService.delete(id);
    }
}
