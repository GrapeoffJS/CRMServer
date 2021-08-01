import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';
import { PaymentTypes } from '../../models/PaymentTypes';
import { Request } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    async createPayment(
        id: string,
        amount: number,
        subscription: string,
        request: Request
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        const { name, surname, midname }: CRMUser = decode(
            request.headers.authorization.split(' ')[1]
        ) as CRMUser;

        pupil.balance += amount;
        pupil.paymentHistory.push({
            amount,
            subscription,
            date: moment().locale('ru').format('LL'),
            issuer: `${surname} ${name} ${midname}`,
            type:
                amount >= 0 ? PaymentTypes.Replenishment : PaymentTypes.Withdraw
        });

        try {
            const saved = await pupil.save();
            return await this.PupilModel.populate(saved, [
                {
                    path: 'groups',
                    select: '_id GROUP_NAME TUTOR',
                    populate: {
                        path: 'TUTOR'
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
                            select: '_id GROUP_NAME'
                        }
                    ]
                }
            ]);
        } catch (err) {
            throw new BadRequestException();
        }
    }
}
