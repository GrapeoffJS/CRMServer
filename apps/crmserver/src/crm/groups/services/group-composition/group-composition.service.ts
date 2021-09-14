import moment from 'moment';
import Pupil from '../../../pupils/models/Pupil.model';
import { ADD_PUPILS_ERRORS } from '../../constants';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { Group } from '../../models/Group.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class GroupCompositionService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async addPupils(id: string, pupilsToAdd: string[]): Promise<Group> {
        const group = await this.GroupModel.findById(id);

        if (!group) {
            throw new NotFoundException();
        }

        const pupils = await this.PupilModel.find({
            _id: pupilsToAdd
        });

        if (group.pupils.length + pupilsToAdd.length > group.places) {
            throw new BadRequestException(ADD_PUPILS_ERRORS.PLACES_OVERFLOW);
        }

        group?.addPupils(pupilsToAdd);

        for (const pupil of pupils) {
            pupil.addGroupToHistory(
                group.group_name,
                moment().locale('ru').format('L')
            );

            if (group.tutor) pupil.addTutor(group.id, group.tutor);

            pupil.setGroupSchedule(group.id, group.global_schedule);
            pupil.updateGroupsList(group.id);

            await pupil.save();
        }

        const saved = await group.save();
        return await this.GroupModel.populate(saved, [
            {
                path: 'pupils',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            },
            {
                path: 'tutor',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            }
        ]);
    }

    public async deletePupil(groupId: string, pupilId: string) {
        const group = await this.GroupModel.findById(groupId);
        const pupil = await this.PupilModel.findById(pupilId);

        if (!group || !pupil) {
            throw new NotFoundException();
        }

        group.deletePupil(pupil.id);

        pupil.deleteGroup(group.id);
        pupil.deleteTutor(group.id);

        const savedPupil = await pupil.save();
        const savedGroup = await group.save();

        const populatedGroup = await this.GroupModel.populate(savedGroup, [
            {
                path: 'pupils',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            },
            {
                path: 'tutor',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            }
        ]);

        const populatedPupil = await this.PupilModel.populate(savedPupil, [
            {
                path: 'groups',
                select: '_id group_name tutor',
                populate: {
                    path: 'tutor'
                }
            }
        ]);

        return {
            group: populatedGroup,
            pupil: populatedPupil
        };
    }
}
