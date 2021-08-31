import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PaymentTypes } from '../../models/PaymentTypes';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async createPayment(
        id: string,
        amount: number,
        subscription: string,
        { name, surname, midname }: CRMUser
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        pupil.balance += amount;
        pupil.paymentHistory.push({
            amount,
            subscription,
            date: moment().locale('ru').format('LL'),
            issuer: `${surname} ${name} ${midname}`,
            type:
                amount >= 0 ? PaymentTypes.Replenishment : PaymentTypes.Withdraw
        });

        const saved = await pupil.save();
        return await this.PupilModel.populate(saved, [
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
