import { Injectable } from '@nestjs/common';
import { CreateSalesFunnelStepDTO } from './DTO/CreateSalesFunnelStepDTO';
import { InjectModel } from 'nestjs-typegoose';
import { SalesFunnelStep } from './models/SalesFunnelStep.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateSalesFunnelStepDTO } from './DTO/UpdateSalesFunnelStepDTO';
import { ChangeOrderDTO } from './DTO/ChangeOrderDTO';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStep)
        private readonly SalesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStep
        >
    ) {}

    public create(createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return this.create(createSalesFunnelStepDTO);
    }

    public async get() {
        return this.SalesFunnelStepModel.find().select({ pupils: 0 });
    }

    public async edit(
        id: string,
        updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO
    ) {
        await this.SalesFunnelStepModel.updateOne(
            { _id: id },
            updateSalesFunnelStepDTO
        );

        return this.SalesFunnelStepModel.findById(id);
    }

    public async changeOrders(changeOrderDTO: ChangeOrderDTO[]) {
        for (const item of changeOrderDTO) {
            await this.SalesFunnelStepModel.updateOne(
                { _id: item.id },
                { order: item.newOrder }
            );
        }

        return;
    }

    public async delete(id: string) {
        const deletedStep = await this.SalesFunnelStepModel.findByIdAndDelete(
            id
        );

        await this.SalesFunnelStepModel.update(
            { order: { $gt: deletedStep.order } },
            { $inc: { order: -1 } }
        );

        return deletedStep;
    }
}
