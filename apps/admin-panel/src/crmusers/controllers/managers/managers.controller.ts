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
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { UpdateManagerDto } from '../../dto/Manager/UpdateManagerDto';
import { ManagerModel } from '../../models/Manager.model';
import { CreateManagerDto } from '../../dto/Manager/CreateManagerDto';
import { ManagersService } from '../../services/managers/managers.service';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / CRM Users / Managers')
@PublicController()
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
    async getByID(@Param() { id }: MongoID) {
        return await this.managersService.getByID(id);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateManagerDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateManagerDto: UpdateManagerDto
    ) {
        return await this.managersService.update(id, updateManagerDto);
    }

    @ApiOkResponse({ type: () => ManagerModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.managersService.delete(id);
    }
}
