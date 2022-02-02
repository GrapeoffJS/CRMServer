import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from './models/Student.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateStudentDto } from './dto/CreateStudentDto';
import { UpdateStudentDto } from './dto/UpdateStudentDto';
import { GroupModel } from '../../groups/crud/models/Group.model';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>,
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>
    ) {}

    async create(createStudentDto: CreateStudentDto) {
        const created = await this.studentModel.create(createStudentDto);

        return this.studentModel
            .findById(created.id)
            .populate('salesFunnelStep groups statuses notes')
            .lean()
            .exec();
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.studentModel.countDocuments().exec(),
            docs: await this.studentModel
                .find()
                .skip(offset)
                .limit(limit)
                .populate('salesFunnelStep groups statuses notes')
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.studentModel
            .findById(id)
            .populate('salesFunnelStep groups statuses notes')
            .lean()
            .exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateStudentDto: UpdateStudentDto) {
        const updated = await this.studentModel
            .findByIdAndUpdate(id, updateStudentDto)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.studentModel
            .findById(id)
            .populate('salesFunnelStep groups statuses notes')
            .lean()
            .exec();
    }

    async delete(id: string) {
        const candidate = await this.studentModel.findById(id).exec();

        if (!candidate) {
            throw new NotFoundException();
        }

        await this.groupModel
            .updateMany(
                { students: { $all: [candidate.id] } },
                { $pull: { students: candidate.id } }
            )
            .exec();

        return this.studentModel
            .findByIdAndUpdate(id)
            .populate('salesFunnelStep groups statuses notes')
            .lean()
            .exec();
    }
}
