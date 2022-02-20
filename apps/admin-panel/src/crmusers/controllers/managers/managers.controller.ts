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
import { PaginationDto } from '@utils/dto/pagination.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { CreateManagerDto } from '../../dto/Manager/create-manager.dto';
import { UpdateManagerDto } from '../../dto/Manager/update-manager.dto';
import { ManagerModel } from '../../models/manager.model';
import { ManagersService } from '../../services/managers/managers.service';

@ApiTags('CRM Users / Managers')
@Controller('/admin-panel/crm-users/managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @ApiCreatedResponse({ type: () => ManagerModel })
    @ApiBody({ type: () => CreateManagerDto })
    @Post()
    async create(@Body() createManagerDto: CreateManagerDto) {
        return await this.managersService.create(createManagerDto);
    }

    @ApiOkResponse({
        type: () => ManagerModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.managersService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.managersService.getByID(id);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateManagerDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateManagerDto: UpdateManagerDto
    ) {
        return await this.managersService.update(id, updateManagerDto);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.managersService.delete(id);
    }
}
