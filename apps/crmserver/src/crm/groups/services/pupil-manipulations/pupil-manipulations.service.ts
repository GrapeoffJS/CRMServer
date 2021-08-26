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
export class PupilManipulationsService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async addPupils(id: string, pupilsToAdd: string[]): Promise<Group> {
        const group = await this.GroupModel.findById(id);
        const pupils = await this.PupilModel.find({
            _id: pupilsToAdd
        });

        if (!group) {
            throw new NotFoundException();
        }

        if (group.PUPILS.length + pupilsToAdd.length > group.PLACES) {
            throw new BadRequestException(ADD_PUPILS_ERRORS.PLACES_OVERFLOW);
        }

        group?.addPupils(pupilsToAdd);

        for (const pupil of pupils) {
            pupil.addGroupToHistory(
                group.GROUP_NAME,
                moment().locale('ru').format('L')
            );
            pupil.addTutor(group.TUTOR, group.id);
            pupil.setGroupSchedule(group.id, group.GLOBAL_SCHEDULE);
            pupil.updateGroupsList(group.id);

            await pupil.save();
        }

        const saved = await group.save();
        return await this.GroupModel.populate(saved, [
            {
                path: 'PUPILS',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            },
            {
                path: 'TUTOR',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            }
        ]);
    }

    public async deletePupil(groupId: string, pupilId: string) {
        const group = await this.GroupModel.findById(groupId).select({
            GROUP_NAME: 1,
            PUPILS: 1,
            GLOBAL_SCHEDULE: 1,
            TUTOR: 1,
            PLACES: 1,
            LEVEL: 1
        });
        const pupil = await this.PupilModel.findById(pupilId).select({
            localSchedule: 1,
            tutors: 1,
            groupsHistory: 1,
            groups: 1
        });

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
                path: 'PUPILS',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            },
            {
                path: 'TUTOR',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            }
        ]);

        const populatedPupil = await this.PupilModel.populate(savedPupil, [
            {
                path: 'groups',
                select: '_id GROUP_NAME TUTOR',
                populate: {
                    path: 'TUTOR'
                }
            }
        ]);

        return {
            group: populatedGroup,
            pupil: populatedPupil
        };
    }
}
