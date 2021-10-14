import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { SalesFunnelStep } from '../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import { ReturnModelType } from '@typegoose/typegoose';
import Pupil from '../pupils/models/Pupil.model';
import { getFindAllAggregation } from './aggregations/getFindAllAggregation';
import { getFindByIdAggregation } from './aggregations/getFindByIdAggregation';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStep)
        private readonly SalesFunnelStepModel: ReturnModelType<typeof SalesFunnelStep>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {
    }

    public async findAll(limit: number) {
        return this.SalesFunnelStepModel.aggregate(
            getFindAllAggregation(limit)
        );
    }

    public async findById(id: string, limit: number, offset: number) {
        return this.SalesFunnelStepModel.aggregate(
            getFindByIdAggregation(id, offset, limit)
        );
    }
}
