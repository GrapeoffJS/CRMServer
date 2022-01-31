import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from '../students/crud/models/Student.model';
import { GroupModel } from './models/Group.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateGroupDto } from './dto/CreateGroupDto';
import { UpdateGroupDto } from './dto/UpdateGroupDto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>,
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>
    ) {}

    async create(createGroupDto: CreateGroupDto) {
        if (createGroupDto.students.length > createGroupDto.places) {
            throw new BadRequestException(
                "Students' length is more than places"
            );
        }

        return this.groupModel.create(createGroupDto);
    }

    async get(limit: number, offset: number) {
        return {
            docs: await this.groupModel.find().skip(offset).limit(limit),
            count: await this.groupModel.countDocuments().exec()
        };
    }

    async getByID(id: string) {
        const found = await this.groupModel.findById(id).exec();

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

        return this.groupModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = await this.groupModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new BadRequestException();
        }

        return deleted;
    }
}
