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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Panel / CRM Users / Senior Tutors')
@Controller('/admin-panel/crm-users/senior-tutors')
export class SeniorTutorsController {
    constructor(private readonly seniorTutorsService: SeniorTutorsService) {}

    @ApiBody({ type: () => CreateSeniorTutorDTO })
    @Post()
    async create(
        @Body() createSeniorTutorDTO: CreateSeniorTutorDTO
    ): Promise<SeniorTutorModel> {
        return await this.seniorTutorsService.create(createSeniorTutorDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ docs: SeniorTutorModel[]; count: number }> {
        return await this.seniorTutorsService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<SeniorTutorModel> {
        return await this.seniorTutorsService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateSeniorTutorDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateSeniorTutorDTO: UpdateSeniorTutorDTO
    ): Promise<SeniorTutorModel> {
        return await this.seniorTutorsService.update(id, updateSeniorTutorDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<SeniorTutorModel> {
        return await this.seniorTutorsService.delete(id);
    }
}
