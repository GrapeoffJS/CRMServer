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
import { TutorsService } from '../../services/tutors/tutors.service';
import { CreateTutorDto } from '../../dto/Tutor/CreateTutorDto';
import { TutorModel } from '../../models/Tutor.model';
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { UpdateTutorDto } from '../../dto/Tutor/UpdateTutorDto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/public-controller.decorator';

@ApiTags('Admin Panel / CRM Users / Tutors')
@PublicController()
@Controller('/admin-panel/crm-users/tutors')
export class TutorsController {
    constructor(private readonly tutorsService: TutorsService) {}

    @ApiCreatedResponse({ type: () => TutorModel })
    @ApiBody({ type: () => CreateTutorDto })
    @Post()
    async create(@Body() createTutorDto: CreateTutorDto) {
        return await this.tutorsService.create(createTutorDto);
    }

    @ApiOkResponse({
        type: () => TutorModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        const { count, docs } = await this.tutorsService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @ApiOkResponse({ type: () => TutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.tutorsService.getByID(id);
    }

    @ApiOkResponse({ type: () => TutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateTutorDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateTutorDto: UpdateTutorDto
    ) {
        return await this.tutorsService.update(id, updateTutorDto);
    }

    @ApiOkResponse({ type: () => TutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.tutorsService.delete(id);
    }
}
