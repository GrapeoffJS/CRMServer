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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('/admin-panel/crm-users/tutors')
@Controller('/admin-panel/crm-users/tutors')
export class TutorsController {
    constructor(private readonly tutorsService: TutorsService) {}

    @ApiBody({ type: () => CreateTutorDTO })
    @Post()
    async create(@Body() createTutorDTO: CreateTutorDTO): Promise<TutorModel> {
        return await this.tutorsService.create(createTutorDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: TutorModel[]; count: number }> {
        const { count, docs } = await this.tutorsService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<TutorModel> {
        return await this.tutorsService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateTutorDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateTutorDTO: UpdateTutorDTO
    ): Promise<TutorModel> {
        return await this.tutorsService.update(id, updateTutorDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<TutorModel> {
        return await this.tutorsService.delete(id);
    }
}
