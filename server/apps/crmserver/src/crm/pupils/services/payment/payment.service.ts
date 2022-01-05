import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PaymentTypes } from '../../models/PaymentTypes';
import { ReturnModelType } from '@typegoose/typegoose';
import { Subscription } from '../../../../../../admin-panel/src/subscriptions/models/Subscription.model';
import { Payment } from '../../models/Payment.model';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(Subscription)
        private readonly SubscriptionModel: ReturnModelType<
            typeof Subscription
        >,
        @InjectModel(Payment)
        private readonly PaymentModel: ReturnModelType<typeof Payment>
    ) {}

    public async changeBalance(id: string, amount: number, issuer: string) {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        await this.PaymentModel.create({
            type:
                amount >= 0
                    ? PaymentTypes.Replenishment
                    : PaymentTypes.Withdraw,
            owner_id: pupil.id,
            date: moment().locale('ru').format('L'),
            amount: Math.abs(amount),
            issuer
        });

        pupil.balance += amount;

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

        await this.PaymentModel.create({
            type: PaymentTypes.Withdraw,
            owner_id: pupil.id,
            date: moment().locale('ru').format('L'),
            amount: subscription.price,
            issuer,
            subscription: subscription.id
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

    public async cancelPayment(paymentId: string) {
        const payment = await this.PaymentModel.findByIdAndDelete(paymentId);

        if (!payment) {
            throw new NotFoundException();
        }

        if (!payment.subscription) {
            if (payment.type === PaymentTypes.Replenishment) {
                await this.PupilModel.findByIdAndUpdate(payment.owner_id, {
                    $inc: { balance: -payment.amount }
                });
            }

            if (payment.type === PaymentTypes.Withdraw) {
                await this.PupilModel.findByIdAndUpdate(payment.owner_id, {
                    $inc: { balance: payment.amount }
                });
            }
        }

        await this.PupilModel.findByIdAndUpdate(payment.owner_id, {
            $inc: { balance: payment.amount }
        });
    }
}
