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

@Controller('/admin-panel/crm-users/admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Post()
    async create(@Body() createAdminDTO: CreateAdminDTO): Promise<AdminModel> {
        return await this.adminsService.create(createAdminDTO);
    }

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: AdminModel[]; count: number }> {
        const { count, docs } = await this.adminsService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<AdminModel> {
        return await this.adminsService.getByID(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateAdminDTO: UpdateAdminDTO
    ): Promise<AdminModel> {
        return await this.adminsService.update(id, updateAdminDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<AdminModel> {
        return await this.adminsService.delete(id);
    }
}
