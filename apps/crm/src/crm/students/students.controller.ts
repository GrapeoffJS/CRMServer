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
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('CRM / Students')
@ApiBearerAuth()
@Controller('/crm/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @ApiCreatedResponse({ type: () => CreateStudentDTO })
    @ApiBody({ type: () => CreateStudentDTO })
    @Post()
    async create(@Body() createStudentDTO: CreateStudentDTO) {
        return await this.studentsService.create(createStudentDTO);
    }

    @ApiOkResponse({
        type: () => StudentModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDTO) {
        return await this.studentsService.get(limit, offset);
    }

    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.studentsService.getByID(id);
    }

    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateStudentDTO })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStudentDTO: UpdateStudentDTO
    ) {
        return await this.studentsService.update(id, updateStudentDTO);
    }

    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.studentsService.delete(id);
    }
}
