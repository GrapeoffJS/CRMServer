import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from './models/student.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { GroupModel } from '../../groups/crud/models/group.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StudentCreatedOrUpdatedEvent } from '../../search/indexer/services/student-indexer/types/student-created-or-updated-event';
import { StudentDeletedEvent } from '../../search/indexer/services/student-indexer/types/student-deleted-event';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>,
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createStudentDto: CreateStudentDto) {
        const student = await this.studentModel.create(createStudentDto);

        this.eventEmitter.emit(
            'student.created',
            new StudentCreatedOrUpdatedEvent({
                id: student.id,
                name: student.name,
                surname: student.surname,
                middleName: student.middleName,
                phone: student.phone.phone,
                parentPhone: student.parentPhone.phone,
                discord: student.discord
            })
        );

        return this.studentModel
            .findById(student.id)
            .populate([
                { path: 'salesFunnelStep groups statuses' },
                {
                    path: 'notes',
                    populate: {
                        path: 'author'
                    }
                }
            ])
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
                .populate([
                    { path: 'salesFunnelStep groups statuses' },
                    {
                        path: 'notes',
                        populate: {
                            path: 'author'
                        }
                    }
                ])
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.studentModel
            .findById(id)
            .populate([
                { path: 'salesFunnelStep groups statuses tasks' },
                {
                    path: 'notes',
                    populate: {
                        path: 'author'
                    }
                }
            ])
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

        const student = await this.studentModel
            .findById(id)
            .populate([
                { path: 'salesFunnelStep groups statuses' },
                {
                    path: 'notes',
                    populate: {
                        path: 'author'
                    }
                }
            ])
            .lean()
            .exec();

        this.eventEmitter.emit(
            'student.updated',
            new StudentCreatedOrUpdatedEvent({
                id,
                name: student.name,
                surname: student.surname,
                middleName: student.middleName,
                phone: student.phone.phone,
                parentPhone: student.parentPhone.phone,
                discord: student.discord
            })
        );

        return student;
    }

    async delete(id: string) {
        const candidate = await this.studentModel.findById(id).exec();

        if (!candidate) {
            throw new NotFoundException();
        }

        this.eventEmitter.emit(
            'student.deleted',
            new StudentDeletedEvent(candidate.id)
        );

        await this.groupModel
            .updateMany(
                { students: { $all: [candidate.id] } },
                { $pull: { students: candidate.id } }
            )
            .exec();

        return this.studentModel
            .findByIdAndUpdate(id)
            .populate([
                { path: 'salesFunnelStep groups statuses' },
                {
                    path: 'notes',
                    populate: {
                        path: 'author'
                    }
                }
            ])
            .lean()
            .exec();
    }
}
