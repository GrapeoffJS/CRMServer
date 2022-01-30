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
import { SupportersService } from '../../services/supporters/supporters.service';
import { CreateSupporterDTO } from '../../DTO/Supporter/CreateSupporterDTO';
import { SupporterModel } from '../../models/Supporter.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateSupporterDTO } from '../../DTO/Supporter/UpdateSupporterDTO';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/PublicController';

@ApiTags('Admin Panel / CRM Users / Supporters')
@PublicController()
@Controller('/admin-panel/crm-users/supporters')
export class SupportersController {
    constructor(private readonly supportersService: SupportersService) {}

    @ApiCreatedResponse({ type: () => SupporterModel })
    @ApiBody({ type: () => CreateSupporterDTO })
    @Post()
    async create(@Body() createSupporterDTO: CreateSupporterDTO) {
        return await this.supportersService.create(createSupporterDTO);
    }

    @ApiOkResponse({
        type: () => SupporterModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.supportersService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => SupporterModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.supportersService.getByID(id);
    }

    @ApiOkResponse({ type: () => SupporterModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSupporterDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSupporterDTO: UpdateSupporterDTO
    ) {
        return await this.supportersService.update(id, updateSupporterDTO);
    }

    @ApiOkResponse({ type: () => SupporterModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.supportersService.delete(id);
    }
}
