import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StudentsService } from '../../services/students/students.service';
import { CreateStudentDTO } from '../../DTO/CreateStudentDTO';
import { PaginationDTO } from '../../../../../../../utils/DTO/PaginationDTO';
import { StudentModel } from '../../models/Student.model';
import { MongoID } from '../../../../../../../utils/DTO/MongoID';
import { UpdateStudentDTO } from '../../DTO/UpdateStudentDTO';

@Controller('/crm/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async create(@Body() createStudentDTO: CreateStudentDTO) {
        return await this.studentsService.create(createStudentDTO);
    }

    @Get()
    async get({
        limit,
        offset
    }: PaginationDTO): Promise<{ count: number; docs: StudentModel[] }> {
        return await this.studentsService.get(limit, offset);
    }

    @Get(':id')
    async getByID({ id }: MongoID) {
        return await this.studentsService.getByID(id);
    }

    @Patch(':id')
    async update({ id }: MongoID, updateStudentDTO: UpdateStudentDTO) {
        return await this.studentsService.update(id, updateStudentDTO);
    }

    @Delete(':id')
    async delete({ id }: MongoID) {
        return await this.studentsService.delete(id);
    }
}
