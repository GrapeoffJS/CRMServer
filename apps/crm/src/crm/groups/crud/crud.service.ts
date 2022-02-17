import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from '../../students/crud/models/student.model';
import { GroupModel } from './models/group.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GroupCreatedOrUpdatedEvent } from '../../search/indexer/services/group-indexer/types/group-created-or-updated-event';
import { GroupDeletedEvent } from '../../search/indexer/services/group-indexer/types/group-deleted-event';
import { GroupDeletedManyEvent } from '../../search/indexer/services/group-indexer/types/group-deleted-many-event';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>,
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createGroupDto: CreateGroupDto) {
        if (createGroupDto.students.length > createGroupDto.places) {
            throw new BadRequestException(
                "Students' length is more than places"
            );
        }

        const created = await this.groupModel.create(createGroupDto);

        this.eventEmitter.emit(
            'group.created',
            new GroupCreatedOrUpdatedEvent({
                id: created.id,
                name: created.name
            })
        );

        return await this.groupModel
            .findById(created.id)
            .populate('students tutor')
            .lean()
            .exec();
    }

    async get(limit: number, offset: number) {
        return {
            docs: await this.groupModel
                .find()
                .skip(offset)
                .limit(limit)
                .populate('students tutor')
                .lean()
                .exec(),
            count: await this.groupModel.countDocuments().exec()
        };
    }

    async getByID(id: string) {
        const found = await this.groupModel
            .findById(id)
            .lean()
            .populate('students tutor')
            .exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateGroupDto: UpdateGroupDto) {
        const updated = await this.groupModel
            .findByIdAndUpdate(id, updateGroupDto)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const group = await this.groupModel
            .findById(id)
            .populate('students tutor')
            .lean()
            .exec();

        this.eventEmitter.emit(
            'group.updated',
            new GroupCreatedOrUpdatedEvent({ id, name: group.name })
        );

        return group;
    }

    async delete(id: string) {
        const deleted = await this.groupModel
            .findByIdAndDelete(id)
            .populate('students tutor')
            .lean()
            .exec();

        if (!deleted) {
            throw new BadRequestException();
        }

        this.eventEmitter.emit(
            'group.deleted',
            new GroupDeletedEvent(deleted.id)
        );

        return deleted;
    }

    async deleteMany(ids: string[]) {
        for (const id of ids) {
            if (!(await this.groupModel.exists({ _id: id }))) {
                throw new BadRequestException();
            }
        }

        this.eventEmitter.emit(
            'group.deletedMany',
            new GroupDeletedManyEvent(ids)
        );

        return this.groupModel.deleteMany({ _id: ids });
    }
}
