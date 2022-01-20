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
import { Supporter } from '../../models/Supporter.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateSupporterDTO } from '../../DTO/Supporter/UpdateSupporterDTO';

@Controller('/admin-panel/crm-users/supporters')
export class SupportersController {
    constructor(private readonly supportersService: SupportersService) {}

    @Post()
    async create(
        @Body() createSupporterDTO: CreateSupporterDTO
    ): Promise<Supporter> {
        return await this.supportersService.create(createSupporterDTO);
    }

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: Supporter[]; count: number }> {
        const { count, docs } = await this.supportersService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<Supporter> {
        return await this.supportersService.getByID(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSupporterDTO: UpdateSupporterDTO
    ): Promise<Supporter> {
        return await this.supportersService.update(id, updateSupporterDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<Supporter> {
        return await this.supportersService.delete(id);
    }
}
