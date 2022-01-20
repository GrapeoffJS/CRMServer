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
import { Manager } from '../../models/Manager.model';
import { CreateManagerDTO } from '../../DTO/Manager/CreateManagerDTO';
import { ManagersService } from '../../services/managers/managers.service';

@Controller('/admin-panel/crm-users/managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @Post()
    async create(@Body() createManagerDTO: CreateManagerDTO): Promise<Manager> {
        return await this.managersService.create(createManagerDTO);
    }

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: Manager[]; count: number }> {
        const { count, docs } = await this.managersService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<Manager> {
        return await this.managersService.getByID(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateManagerDTO: UpdateManagerDTO
    ): Promise<Manager> {
        return await this.managersService.update(id, updateManagerDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<Manager> {
        return await this.managersService.delete(id);
    }
}
