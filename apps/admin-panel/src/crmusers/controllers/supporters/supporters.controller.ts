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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Panel / CRM Users / Supporters')
@Controller('/admin-panel/crm-users/supporters')
export class SupportersController {
    constructor(private readonly supportersService: SupportersService) {}

    @ApiBody({ type: () => CreateSupporterDTO })
    @Post()
    async create(
        @Body() createSupporterDTO: CreateSupporterDTO
    ): Promise<SupporterModel> {
        return await this.supportersService.create(createSupporterDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: SupporterModel[]; count: number }> {
        return await this.supportersService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<SupporterModel> {
        return await this.supportersService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSupporterDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSupporterDTO: UpdateSupporterDTO
    ): Promise<SupporterModel> {
        return await this.supportersService.update(id, updateSupporterDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<SupporterModel> {
        return await this.supportersService.delete(id);
    }
}
