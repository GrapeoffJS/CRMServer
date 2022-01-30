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
import { SeniorTutorsService } from '../../services/senior-tutors/senior-tutors.service';
import { CreateSeniorTutorDTO } from '../../DTO/SeniorTutor/CreateSeniorTutorDTO';
import { SeniorTutorModel } from '../../models/SeniorTutor.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateSeniorTutorDTO } from '../../DTO/SeniorTutor/UpdateSeniorTutorDTO';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/PublicController';

@ApiTags('Admin Panel / CRM Users / Senior Tutors')
@PublicController()
@Controller('/admin-panel/crm-users/senior-tutors')
export class SeniorTutorsController {
    constructor(private readonly seniorTutorsService: SeniorTutorsService) {}

    @ApiCreatedResponse({ type: () => SeniorTutorModel })
    @ApiBody({ type: () => CreateSeniorTutorDTO })
    @Post()
    async create(@Body() createSeniorTutorDTO: CreateSeniorTutorDTO) {
        return await this.seniorTutorsService.create(createSeniorTutorDTO);
    }

    @ApiOkResponse({
        type: () => SeniorTutorModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.seniorTutorsService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => SeniorTutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.seniorTutorsService.getByID(id);
    }

    @ApiOkResponse({ type: () => SeniorTutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSeniorTutorDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSeniorTutorDTO: UpdateSeniorTutorDTO
    ) {
        return await this.seniorTutorsService.update(id, updateSeniorTutorDTO);
    }

    @ApiOkResponse({ type: () => SeniorTutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.seniorTutorsService.delete(id);
    }
}
