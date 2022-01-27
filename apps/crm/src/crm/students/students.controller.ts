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
import { StudentsService } from './students.service';
import { CreateStudentDTO } from './DTO/CreateStudentDTO';
import { PaginationDTO } from '../../../../../utils/DTO/PaginationDTO';
import { StudentModel } from './models/Student.model';
import { MongoID } from '../../../../../utils/DTO/MongoID';
import { UpdateStudentDTO } from './DTO/UpdateStudentDTO';
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('/crm/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @ApiBody({ type: () => CreateStudentDTO })
    @Post()
    async create(
        @Body() createStudentDTO: CreateStudentDTO
    ): Promise<StudentModel> {
        return await this.studentsService.create(createStudentDTO);
    }

    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO
    ): Promise<{ count: number; docs: StudentModel[] }> {
        return await this.studentsService.get(limit, offset);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID): Promise<StudentModel> {
        return await this.studentsService.getByID(id);
    }

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateStudentDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStudentDTO: UpdateStudentDTO
    ): Promise<StudentModel> {
        return await this.studentsService.update(id, updateStudentDTO);
    }

    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID): Promise<StudentModel> {
        return await this.studentsService.delete(id);
    }
}
