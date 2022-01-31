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
import { CreateSeniorTutorDto } from '../../dto/SeniorTutor/CreateSeniorTutorDto';
import { SeniorTutorModel } from '../../models/SeniorTutor.model';
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { UpdateSeniorTutorDto } from '../../dto/SeniorTutor/UpdateSeniorTutorDto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / CRM Users / Senior Tutors')
@PublicController()
@Controller('/admin-panel/crm-users/senior-tutors')
export class SeniorTutorsController {
    constructor(private readonly seniorTutorsService: SeniorTutorsService) {}

    @ApiCreatedResponse({ type: () => SeniorTutorModel })
    @ApiBody({ type: () => CreateSeniorTutorDto })
    @Post()
    async create(@Body() createSeniorTutorDto: CreateSeniorTutorDto) {
        return await this.seniorTutorsService.create(createSeniorTutorDto);
    }

    @ApiOkResponse({
        type: () => SeniorTutorModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
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
    @ApiBody({ type: () => UpdateSeniorTutorDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSeniorTutorDto: UpdateSeniorTutorDto
    ) {
        return await this.seniorTutorsService.update(id, updateSeniorTutorDto);
    }

    @ApiOkResponse({ type: () => SeniorTutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.seniorTutorsService.delete(id);
    }
}
