import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from './models/Student.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateStudentDTO } from './DTO/CreateStudentDTO';
import { UpdateStudentDTO } from './DTO/UpdateStudentDTO';
import { GroupModel } from '../groups/models/Group.model';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>,
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>
    ) {}

    async create(createStudentDTO: CreateStudentDTO) {
        return this.studentModel.create(createStudentDTO);
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.studentModel.countDocuments().exec(),
            docs: await this.studentModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.studentModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateStudentDTO: UpdateStudentDTO) {
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
        const candidate = await this.studentModel.findById(id);

        if (!candidate) {
            throw new NotFoundException();
        }

        await this.groupModel.updateMany(
            { students: { $all: [candidate.id] } },
            { $pull: { students: candidate.id } }
        );

        return this.studentModel.findByIdAndUpdate(id);
    }
}
