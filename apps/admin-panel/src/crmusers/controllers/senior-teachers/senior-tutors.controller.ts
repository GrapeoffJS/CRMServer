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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PaginationDto } from '@utils/dto/pagination.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { CreateSeniorTutorDto } from '../../dto/SeniorTutor/create-senior-tutor.dto';
import { UpdateSeniorTutorDto } from '../../dto/SeniorTutor/update-senior-tutor.dto';
import { SeniorTutorModel } from '../../models/senior-tutor.model';
import { SeniorTutorsService } from '../../services/senior-tutors/senior-tutors.service';

@ApiTags('CRM Users / Senior Tutors')
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
    async getByID(@Param() { id }: MongoId) {
        return await this.seniorTutorsService.getByID(id);
    }

    @ApiOkResponse({ type: () => SeniorTutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSeniorTutorDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateSeniorTutorDto: UpdateSeniorTutorDto
    ) {
        return await this.seniorTutorsService.update(id, updateSeniorTutorDto);
    }

    @ApiOkResponse({ type: () => SeniorTutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.seniorTutorsService.delete(id);
    }
}
