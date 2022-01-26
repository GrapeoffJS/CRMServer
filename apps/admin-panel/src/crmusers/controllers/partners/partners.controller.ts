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
import { PartnerModel } from '../../models/Partner.model';
import { UpdatePartnerDTO } from '../../DTO/Partner/UpdatePartnerDTO';
import { PartnersService } from '../../services/partners/partners.service';
import { CreatePartnerDTO } from '../../DTO/Partner/CreatePartnerDTO';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Panel / CRM Users / Partners')
@Controller('/admin-panel/crm-users/partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) {}

    @ApiBody({ type: () => CreatePartnerDTO })
    @Post()
    async create(
        @Body() createPartnerDTO: CreatePartnerDTO
    ): Promise<PartnerModel> {
        return await this.partnersService.create(createPartnerDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: PartnerModel[]; count: number }> {
        return await this.partnersService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<PartnerModel> {
        return await this.partnersService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdatePartnerDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updatePartnerDTO: UpdatePartnerDTO
    ): Promise<PartnerModel> {
        return await this.partnersService.update(id, updatePartnerDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<PartnerModel> {
        return await this.partnersService.delete(id);
    }
}
