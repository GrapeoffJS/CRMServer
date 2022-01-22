import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { SalesFunnelStepModel } from '../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from '../students/models/Student.model';
import { getFindAllAggregation } from './aggregations/getFindAllAggregation';
import { getFindByIdAggregation } from './aggregations/getFindByIdAggregation';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStepModel)
        private readonly salesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStepModel
        >,
        @InjectModel(StudentModel)
        private readonly PupilModel: ReturnModelType<typeof StudentModel>
    ) {}

    async findAll(limit: number) {
        return this.salesFunnelStepModel.aggregate(
            getFindAllAggregation(limit)
        );
    }

    async findById(id: string, limit: number, offset: number) {
        return this.salesFunnelStepModel.aggregate(
            getFindByIdAggregation(id, offset, limit)
        );
    }
}
