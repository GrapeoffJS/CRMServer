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
import { AdminsService } from '../../services/admins/admins.service';
import { AdminModel } from '../../models/Admin.model';
import { CreateAdminDTO } from '../../DTO/Admin/CreateAdminDTO';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateAdminDTO } from '../../DTO/Admin/UpdateAdminDTO';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('/admin-panel/crm-users/admins')
@Controller('/admin-panel/crm-users/admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @ApiBody({ type: () => CreateAdminDTO })
    @Post()
    async create(@Body() createAdminDTO: CreateAdminDTO): Promise<AdminModel> {
        return await this.adminsService.create(createAdminDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: AdminModel[]; count: number }> {
        return await this.adminsService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<AdminModel> {
        return await this.adminsService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateAdminDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateAdminDTO: UpdateAdminDTO
    ): Promise<AdminModel> {
        return await this.adminsService.update(id, updateAdminDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<AdminModel> {
        return await this.adminsService.delete(id);
    }
}
