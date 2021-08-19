import CRMUser from 'src/admin-panel/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from 'src/crm/pupils/models/Pupil.model';
import { Group } from '../../models/Group.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AccountTypes } from '../../../../admin-panel/crmaccounts/models/Roles';

@Injectable()
export class TutorManipulationsService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    public async addTutor(groupId: string, tutorId: string): Promise<Group> {
        const group = await this.GroupModel.findById(groupId);
        const pupils = await this.PupilModel.find({ _id: group.PUPILS });

        if (!group) {
            throw new NotFoundException();
        }

        if (group.TUTOR) {
            const oldTutor = await this.CRMUserModel.findById(group.TUTOR);
            oldTutor.deleteGroup(group.id);

            await oldTutor.save();
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

        group.TUTOR = tutorId;

        tutor.updateGroupsList(String(group.id));
        tutor.addGroupToHistory(
            group.GROUP_NAME,
            moment().locale('ru').format('L')
        );

        await tutor.save();

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
}
