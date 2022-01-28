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
import { UpdateManagerDTO } from '../../DTO/Manager/UpdateManagerDTO';
import { ManagerModel } from '../../models/Manager.model';
import { CreateManagerDTO } from '../../DTO/Manager/CreateManagerDTO';
import { ManagersService } from '../../services/managers/managers.service';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Admin Panel / CRM Users / Managers')
@Controller('/admin-panel/crm-users/managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @ApiCreatedResponse({ type: () => ManagerModel })
    @ApiBody({ type: () => CreateManagerDTO })
    @Post()
    async create(@Body() createManagerDTO: CreateManagerDTO) {
        return await this.managersService.create(createManagerDTO);
    }

    @ApiOkResponse({
        type: () => ManagerModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.managersService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.managersService.getByID(id);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateManagerDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateManagerDTO: UpdateManagerDTO
    ) {
        return await this.managersService.update(id, updateManagerDTO);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.managersService.delete(id);
    }
}
