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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Admin Panel / CRM Users / Partners')
@Controller('/admin-panel/crm-users/partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) {}

    @ApiCreatedResponse({ type: () => PartnerModel })
    @ApiBody({ type: () => CreatePartnerDTO })
    @Post()
    async create(@Body() createPartnerDTO: CreatePartnerDTO) {
        return await this.partnersService.create(createPartnerDTO);
    }
    @ApiOkResponse({
        type: () => PartnerModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.partnersService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => PartnerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.partnersService.getByID(id);
    }

    @ApiOkResponse({ type: () => PartnerModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdatePartnerDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updatePartnerDTO: UpdatePartnerDTO
    ) {
        return await this.partnersService.update(id, updatePartnerDTO);
    }

    @ApiOkResponse({ type: () => PartnerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.partnersService.delete(id);
    }
}
