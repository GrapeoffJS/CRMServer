import { Types } from 'mongoose';

export const getFindByIdAggregation = (
    id: string,
    offset: number,
    limit: number
) => [
    {
        $match: {
            $expr: { $eq: ['$_id', Types.ObjectId(id)] }
        }
    },
    {
        $lookup: {
            from: 'Pupils',
            localField: '_id',
            foreignField: 'salesFunnelStep',
            as: 'pupils'
        }
    },
    {
        $addFields: {
            pupilsCount: {
                $size: '$pupils'
            }
        }
    },
    {
        $lookup: {
            from: 'Pupils',
            as: 'pupils',
            let: {
                funnelStepId: '$_id'
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ['$salesFunnelStep', '$$funnelStepId']
                        }
                    }
                },
                {
                    $skip: offset
                },
                {
                    $limit: limit
                },
                {
                    $lookup: {
                        from: 'Subscriptions',
                        as: 'subscriptionPayments',
                        foreignField: '_id',
                        localField: 'paymentHistory.subscription'
                    }
                },
                {
                    $lookup: {
                        from: 'Statuses',
                        as: 'statuses',
                        foreignField: '_id',
                        localField: 'statuses'
                    }
                },
                {
                    $addFields: {
                        minPaidSubscription: {
                            $min: '$subscriptionPayments.price'
                        }
                    }
                }
            ]
        }
    },
    {
        $addFields: {
            minPaidSubscriptionsAmount: {
                $sum: '$pupils.minPaidSubscription'
            }
        }
    }
];
