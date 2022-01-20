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
import { SeniorTutor } from '../../models/SeniorTutor.model';
import { PaginationDTO } from '../../../../../../utils/DTO/PaginationDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { UpdateSeniorTutorDTO } from '../../DTO/SeniorTutor/UpdateSeniorTutorDTO';

@Controller('/admin-panel/crm-users/senior-tutors')
export class SeniorTutorsController {
    constructor(private readonly seniorTutorsService: SeniorTutorsService) {}

    @Post()
    async create(
        @Body() createSeniorTutorDTO: CreateSeniorTutorDTO
    ): Promise<SeniorTutor> {
        return await this.seniorTutorsService.create(createSeniorTutorDTO);
    }

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: SeniorTutor[]; count: number }> {
        const { count, docs } = await this.seniorTutorsService.get(
            limit,
            offset
        );

        return {
            docs,
            count
        };
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<SeniorTutor> {
        return await this.seniorTutorsService.getByID(id);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSeniorTutorDTO: UpdateSeniorTutorDTO
    ): Promise<SeniorTutor> {
        return await this.seniorTutorsService.update(id, updateSeniorTutorDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<SeniorTutor> {
        return await this.seniorTutorsService.delete(id);
    }
}
