import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateManagerDTO } from '../../DTO/Manager/UpdateManagerDTO';
import { ManagerModel } from '../../models/Manager.model';
import { CreateManagerDTO } from '../../DTO/Manager/CreateManagerDTO';
import { ManagersService } from '../../services/managers/managers.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('/admin-panel/crm-users/managers')
@Controller('/admin-panel/crm-users/managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @ApiBody({ type: () => CreateManagerDTO })
    @Post()
    async create(
        @Body() createManagerDTO: CreateManagerDTO
    ): Promise<ManagerModel> {
        return await this.managersService.create(createManagerDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: ManagerModel[]; count: number }> {
        return await this.managersService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<ManagerModel> {
        return await this.managersService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateManagerDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateManagerDTO: UpdateManagerDTO
    ): Promise<ManagerModel> {
        return await this.managersService.update(id, updateManagerDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<ManagerModel> {
        return await this.managersService.delete(id);
    }
}
