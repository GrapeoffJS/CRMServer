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

import { CreatePartnerDto } from '../../dto/Partner/create-partner.dto';
import { UpdatePartnerDto } from '../../dto/Partner/update-partner.dto';
import { PartnerModel } from '../../models/partner.model';
import { PartnersService } from '../../services/partners/partners.service';

@ApiTags('CRM Users / Partners')
@Controller('/admin-panel/crm-users/partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) {}

    @ApiCreatedResponse({ type: () => PartnerModel })
    @ApiBody({ type: () => CreatePartnerDto })
    @Post()
    async create(@Body() createPartnerDto: CreatePartnerDto) {
        return await this.partnersService.create(createPartnerDto);
    }

    @ApiOkResponse({
        type: () => PartnerModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.partnersService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => PartnerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.partnersService.getByID(id);
    }

    @ApiOkResponse({ type: () => PartnerModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdatePartnerDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updatePartnerDto: UpdatePartnerDto
    ) {
        return await this.partnersService.update(id, updatePartnerDto);
    }

    @ApiOkResponse({ type: () => PartnerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.partnersService.delete(id);
    }
}
