import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { SalesFunnelStep } from '../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import Pupil from '../pupils/models/Pupil.model';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStep)
        private readonly SalesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStep
        >,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async findAll(limit: number) {
        return this.SalesFunnelStepModel.aggregate([
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
                    pupils: {
                        $slice: ['$pupils', 0, limit]
                    },
                    pupilsCount: { $size: '$pupils' }
                }
            }
        ]);
    }

    public async findById(id: string, limit: number, offset: number) {
        return this.SalesFunnelStepModel.aggregate([
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
                    pupils: {
                        $slice: ['$pupils', offset, limit]
                    },
                    pupilsCount: { $size: '$pupils' }
                }
            }
        ]);
    }
}
