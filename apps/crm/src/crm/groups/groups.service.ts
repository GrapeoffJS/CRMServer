import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from '../students/models/Student.model';
import { GroupModel } from './models/Group.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateGroupDTO } from './DTO/CreateGroupDTO';
import { UpdateGroupDTO } from './DTO/UpdateGroupDTO';

@Injectable()
export class GroupsService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>,
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>
    ) {}

    async create(createGroupDTO: CreateGroupDTO) {
        if (createGroupDTO.students.length > createGroupDTO.places) {
            throw new BadRequestException(
                "Students' length is more than places"
            );
        }

        return this.groupModel.create(createGroupDTO);
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

    async update(id: string, updateGroupDTO: UpdateGroupDTO) {
        const updated = await this.groupModel
            .findByIdAndUpdate(id, updateGroupDTO)
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
