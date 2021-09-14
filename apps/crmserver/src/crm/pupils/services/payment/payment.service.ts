import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PaymentTypes } from '../../models/PaymentTypes';
import { ReturnModelType } from '@typegoose/typegoose';
import { Subscription } from '../../../../../../admin-panel/src/subscriptions/models/Subscription.model';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(Subscription)
        private readonly SubscriptionModel: ReturnModelType<typeof Subscription>
    ) {}

    public async addBalance(id: string, amount: number, issuer: string) {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        pupil.balance += amount;
        pupil.paymentHistory.push({
            type:
                amount >= 0
                    ? PaymentTypes.Replenishment
                    : PaymentTypes.Withdraw,
            date: moment().locale('ru').format('LLL'),
            issuer,
            amount
        });

        await pupil.save();

        return this.PupilModel.findById(id).populate([
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
            },
            {
                path: 'paymentHistory',
                populate: {
                    path: 'subscription'
                }
            }
        ]);
    }

    public async createPayment(
        id: string,
        subscriptionID: string,
        issuer: string
    ) {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        const subscription = await this.SubscriptionModel.findById(
            subscriptionID
        );

        if (!subscription) {
            throw new NotFoundException();
        }

        pupil.balance -= subscription.price;
        pupil.paymentHistory.push({
            subscription: subscriptionID,
            type: PaymentTypes.Withdraw,
            date: moment().locale('ru').format('LLL'),
            amount: subscription.price,
            issuer
        });

        await pupil.save();

        return this.PupilModel.findById(id).populate([
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
            },
            {
                path: 'paymentHistory',
                populate: {
                    path: 'subscription'
                }
            }
        ]);
    }
}
