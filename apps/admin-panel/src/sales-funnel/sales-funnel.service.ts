import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateSalesFunnelStepDTO } from './DTO/CreateSalesFunnelStepDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateSalesFunnelStepDTO } from './DTO/UpdateSalesFunnelStepDTO';
import { ChangeOrderDTO } from './DTO/ChangeOrderDTO';
import Pupil from '../../../crm/src/crm/pupils/models/Pupil.model';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStepModel)
        private readonly SalesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStepModel
        >,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    create(createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return this.SalesFunnelStepModel.create(createSalesFunnelStepDTO);
    }

    async findAll() {
        return this.SalesFunnelStepModel.find()
            .select({ pupils: 0 })
            .sort({ order: 1 });
    }

    async edit(id: string, updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO) {
        await this.SalesFunnelStepModel.updateOne(
            { _id: id },
            updateSalesFunnelStepDTO
        );

        return this.SalesFunnelStepModel.findById(id);
    }

    async changeOrders(changeOrderDTO: ChangeOrderDTO[]) {
        for (const step of changeOrderDTO) {
            await this.SalesFunnelStepModel.updateOne(
                { _id: step.id },
                { order: step.newOrder }
            );
        }

        return this.SalesFunnelStepModel.find().select({ pupils: 0 });
    }

    async delete(id: string) {
        const stepToDelete = await this.SalesFunnelStepModel.findById(id);

        if (!stepToDelete) {
            throw new NotFoundException();
        }

        // If there is at least one pupil in this step
        const pupilInCurrentStep = await this.PupilModel.findOne({
            salesFunnelStep: id
        });

        if (pupilInCurrentStep) {
            throw new BadRequestException();
        }

        await this.SalesFunnelStepModel.findByIdAndDelete(id);

        await this.SalesFunnelStepModel.updateMany(
            { order: { $gt: stepToDelete.order } },
            { $inc: { order: -1 } }
        );

        return stepToDelete;
    }

    async findByOrder(order: number) {
        return this.SalesFunnelStepModel.findOne({ order });
    }
}
