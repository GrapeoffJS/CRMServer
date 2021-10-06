export const getFindAllAggregation = (limit: number) => [
    {
        $sort: {
            order: 1
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
