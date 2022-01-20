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
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { Partner } from '../../models/Partner.model';
import { UpdatePartnerDTO } from '../../DTO/Partner/UpdatePartnerDTO';
import { PartnersService } from '../../services/partners/partners.service';
import { CreatePartnerDTO } from '../../DTO/Partner/CreatePartnerDTO';

@Controller('/admin-panel/crm-users/partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) {}

    @Post()
    async create(@Body() createPartnerDTO: CreatePartnerDTO): Promise<Partner> {
        return await this.partnersService.create(createPartnerDTO);
    }

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: Partner[]; count: number }> {
        const { count, docs } = await this.partnersService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<Partner> {
        return await this.partnersService.getByID(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updatePartnerDTO: UpdatePartnerDTO
    ): Promise<Partner> {
        return await this.partnersService.update(id, updatePartnerDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<Partner> {
        return await this.partnersService.delete(id);
    }
}
