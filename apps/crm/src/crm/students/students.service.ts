import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from './models/Student.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateStudentDTO } from './DTO/CreateStudentDTO';
import { UpdateStudentDTO } from './DTO/UpdateStudentDTO';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>
    ) {}

    async create(createStudentDTO: CreateStudentDTO): Promise<StudentModel> {
        return this.studentModel.create(createStudentDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: StudentModel[] }> {
        return {
            count: await this.studentModel.countDocuments().exec(),
            docs: await this.studentModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<StudentModel> {
        const found = await this.studentModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(
        id: string,
        updateStudentDTO: UpdateStudentDTO
    ): Promise<StudentModel> {
        const updated = await this.studentModel.findByIdAndUpdate(
            id,
            updateStudentDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.studentModel.findById(id);
    }

    async delete(id: string) {
        const deleted = await this.studentModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
