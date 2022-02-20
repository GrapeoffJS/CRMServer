import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { GroupModel } from '../crud/models/group.model';

@Injectable()
export class CompositionService {
    constructor(
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>
    ) {}

    async addStudents(groupID: string, studentIDs: string[]) {
        const group = await this.groupModel.findById(groupID);

        if (!group) {
            throw new NotFoundException();
        }

        if (group.places - group.students.length < studentIDs.length) {
            throw new BadRequestException(
                `Students count is more than group's places`
            );
        }

        await this.groupModel.updateOne(
            { _id: groupID },
            { $addToSet: { students: { $each: studentIDs } } }
        );

        return this.groupModel
            .findById(groupID)
            .populate('students tutor')
            .lean()
            .exec();
    }

    async removeStudents(groupID: string, studentIDs: string[]) {
        const group = await this.groupModel.findById(groupID);

        if (!group) {
            throw new NotFoundException();
        }

        if (studentIDs.length > group.students.length) {
            throw new BadRequestException(
                `You can't delete more students then group has now`
            );
        }

        await this.groupModel.updateOne(
            { _id: groupID },
            { $pullAll: { students: studentIDs } }
        );

        return this.groupModel
            .findById(groupID)
            .populate('students tutor')
            .lean()
            .exec();
    }
}
