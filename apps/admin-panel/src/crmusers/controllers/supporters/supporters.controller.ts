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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { MongoId } from '@utils/dto/mongo-id';
import { PaginationDto } from '@utils/dto/pagination.dto';

import { CreateSupporterDto } from '../../dto/Supporter/create-supporter.dto';
import { UpdateSupporterDto } from '../../dto/Supporter/update-supporter.dto';
import { SupporterModel } from '../../models/supporter.model';
import { SupportersService } from '../../services/supporters/supporters.service';

@ApiTags('CRM Users / Supporters')
@Controller('/admin-panel/crm-users/supporters')
export class SupportersController {
    constructor(private readonly supportersService: SupportersService) {}

    @ApiCreatedResponse({ type: () => SupporterModel })
    @ApiBody({ type: () => CreateSupporterDto })
    @Post()
    async create(@Body() createSupporterDto: CreateSupporterDto) {
        return await this.supportersService.create(createSupporterDto);
    }

    @ApiOkResponse({
        type: () => SupporterModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.supportersService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => SupporterModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.supportersService.getByID(id);
    }

    @ApiOkResponse({ type: () => SupporterModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSupporterDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateSupporterDto: UpdateSupporterDto
    ) {
        return await this.supportersService.update(id, updateSupporterDto);
    }

    @ApiOkResponse({ type: () => SupporterModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.supportersService.delete(id);
    }
}
