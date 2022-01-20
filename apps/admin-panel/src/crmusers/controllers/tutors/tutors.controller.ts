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
import { Tutor } from '../../models/Tutor.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateTutorDTO } from '../../DTO/Tutor/UpdateTutorDTO';

@Controller('/admin-panel/crm-users/tutors')
export class TutorsController {
    constructor(private readonly tutorsService: TutorsService) {}

    @Post()
    async create(@Body() createTutorDTO: CreateTutorDTO): Promise<Tutor> {
        return await this.tutorsService.create(createTutorDTO);
    }

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: Tutor[]; count: number }> {
        const { count, docs } = await this.tutorsService.get(limit, offset);

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<Tutor> {
        return await this.tutorsService.getByID(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateTutorDTO: UpdateTutorDTO
    ): Promise<Tutor> {
        return await this.tutorsService.update(id, updateTutorDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<Tutor> {
        return await this.tutorsService.delete(id);
    }
}
