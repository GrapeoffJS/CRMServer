import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../../../pupils/models/Pupil.model';
import { Group } from '../../models/Group.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AccountTypes } from '../../../../../../admin-panel/src/crmaccounts/models/AccountTypes';

@Injectable()
export class TutorManipulationsService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {
    }

    public async addTutor(groupId: string, tutorId: string): Promise<Group> {
        const group = await this.GroupModel.findById(groupId);

        if (!group) {
            throw new NotFoundException();
        }

        const pupils = await this.PupilModel.find({ _id: group.pupils });

        if (!pupils) {
            throw new NotFoundException();
        }

        if (group.tutor) {
            const oldTutor = await this.CRMUserModel.findById(group.tutor);
            oldTutor?.deleteGroup(group.id);

            await oldTutor?.save();
        }

        const tutor = await this.CRMUserModel.findOne({
            _id: tutorId,
            accountType: AccountTypes.Teacher
        });

        if (!tutor) {
            throw new NotFoundException();
        }

        pupils.forEach(async pupil => {
            pupil.deleteTutor(group.id);
            pupil.addTutor(tutor.id, group.id);

            await pupil.save();
        });

        group.tutor = tutorId;

        tutor.updateGroupsList(String(group.id));
        tutor.addGroupToHistory(
            group.group_name,
            moment().locale('ru').format('L')
        );

        await tutor.save();

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
}
