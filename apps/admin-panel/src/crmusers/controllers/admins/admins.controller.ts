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
import { AdminModel } from '../../models/admin.model';
import { CreateAdminDto } from '../../dto/Admin/create-admin.dto';
import { PaginationDto } from '../../../../../../utils/dto/pagination.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { UpdateAdminDto } from '../../dto/Admin/update-admin.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / CRM Users / Admins')
@PublicController()
@Controller('/admin-panel/crm-users/admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @ApiCreatedResponse({ type: () => AdminModel })
    @ApiBody({ type: () => CreateAdminDto })
    @Post()
    async create(@Body() createAdminDto: CreateAdminDto) {
        return await this.adminsService.create(createAdminDto);
    }

    @ApiOkResponse({
        type: () => AdminModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.adminsService.get(limit, offset);
    }

    @ApiOkResponse({
        type: () => AdminModel
    })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.adminsService.getByID(id);
    }

    @ApiOkResponse({
        type: () => AdminModel
    })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateAdminDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateAdminDto: UpdateAdminDto
    ) {
        return await this.adminsService.update(id, updateAdminDto);
    }

    @ApiOkResponse({
        type: () => AdminModel
    })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.adminsService.delete(id);
    }
}
