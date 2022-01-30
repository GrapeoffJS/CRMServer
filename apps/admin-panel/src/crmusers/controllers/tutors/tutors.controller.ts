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
import { CreateTutorDTO } from '../../DTO/Tutor/CreateTutorDTO';
import { TutorModel } from '../../models/Tutor.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateTutorDTO } from '../../DTO/Tutor/UpdateTutorDTO';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { PublicController } from '../../../../../crm/src/authorization/PublicController';

@ApiTags('Admin Panel / CRM Users / Tutors')
@PublicController()
@Controller('/admin-panel/crm-users/tutors')
export class TutorsController {
    constructor(private readonly tutorsService: TutorsService) {}

    @ApiCreatedResponse({ type: () => TutorModel })
    @ApiBody({ type: () => CreateTutorDTO })
    @Post()
    async create(@Body() createTutorDTO: CreateTutorDTO) {
        return await this.tutorsService.create(createTutorDTO);
    }

    @ApiOkResponse({
        type: () => TutorModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
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
    @ApiBody({ type: () => UpdateTutorDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateTutorDTO: UpdateTutorDTO
    ) {
        return await this.tutorsService.update(id, updateTutorDTO);
    }

    @ApiOkResponse({ type: () => TutorModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.tutorsService.delete(id);
    }
}
