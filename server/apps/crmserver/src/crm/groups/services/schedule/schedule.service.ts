import Pupil from '../../../pupils/models/Pupil.model';
import { Group } from '../../models/Group.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Schedule } from '../../models/Schedule';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {
    }

    public async addGlobalSchedule(
        id: string,
        schedule: Schedule[]
    ): Promise<Group> {
        const group = await this.GroupModel.findById(id);

        if (!group) {
            throw new NotFoundException();
        }

        const pupils = await this.PupilModel.find({ _id: group.pupils });

        if (!pupils) {
            throw new NotFoundException();
        }

        group.global_schedule = schedule;

        for (const pupil of pupils) {
            pupil.setGroupSchedule(group.id, schedule);
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

    public async updatePupilSchedule(
        groupId: string,
        pupilId: string,
        schedule: Schedule[]
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(pupilId);
        const group = await this.GroupModel.findById(groupId);

        if (!pupil) {
            throw new NotFoundException();
        }

        if (!group) {
            throw new NotFoundException();
        }

        pupil.localSchedule.set(groupId, schedule);

        const saved = await pupil.save();
        return await saved.populate([
            {
                path: 'groups',
                select: '_id group_name tutor',
                populate: {
                    path: 'tutor'
                }
            },
            {
                path: 'tutors',
                populate: [
                    {
                        path: 'tutor',
                        select: '_id name surname midname'
                    },
                    {
                        path: 'group',
                        select: '_id group_name'
                    }
                ]
            }
        ]);
    }
}
