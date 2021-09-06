import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { SalesFunnelStep } from '../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { DataPermissions } from '../../../../admin-panel/src/roles/models/DataPermissions';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStep)
        private readonly SalesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStep
        >
    ) {}

    public async findAll(dataPermissions: DataPermissions) {
        return this.SalesFunnelStepModel.find()
            .populate('pupils', dataPermissions.forPupil)
            .sort({ order: 1 });
    }

    public async findByOrder(order: number) {
        return this.SalesFunnelStepModel.findOne({ order });
    }
}
