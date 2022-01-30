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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/PublicController';

@ApiTags('Admin Panel / CRM Users / Admins')
@PublicController()
@Controller('/admin-panel/crm-users/admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @ApiCreatedResponse({ type: () => AdminModel })
    @ApiBody({ type: () => CreateAdminDTO })
    @Post()
    async create(@Body() createAdminDTO: CreateAdminDTO) {
        return await this.adminsService.create(createAdminDTO);
    }

    @ApiOkResponse({
        type: () => AdminModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.adminsService.get(limit, offset);
    }

    @ApiOkResponse({
        type: () => AdminModel
    })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.adminsService.getByID(id);
    }

    @ApiOkResponse({
        type: () => AdminModel
    })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateAdminDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateAdminDTO: UpdateAdminDTO
    ) {
        return await this.adminsService.update(id, updateAdminDTO);
    }

    @ApiOkResponse({
        type: () => AdminModel
    })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.adminsService.delete(id);
    }
}
