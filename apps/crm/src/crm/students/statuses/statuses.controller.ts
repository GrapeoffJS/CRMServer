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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('CRM / Statuses')
@Controller('/crm/statuses')
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: StatusModel[]; count: number }> {
        return await this.statusesService.get(limit, offset);
    }

    @ApiBody({ type: () => CreateStatusDTO })
    @Post()
    async create(
        @Body() createStatusDTO: CreateStatusDTO
    ): Promise<StatusModel> {
        return this.statusesService.create(createStatusDTO);
    }

    @ApiBody({ type: () => UpdateStatusDTO })
    @ApiParam({ name: 'id', type: () => String })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStatusDTO: UpdateStatusDTO
    ): Promise<StatusModel> {
        return await this.statusesService.update(id, updateStatusDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<StatusModel> {
        return await this.statusesService.delete(id);
    }
}
