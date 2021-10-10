import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateSalesFunnelStepDTO } from './DTO/CreateSalesFunnelStepDTO';
import { InjectModel } from 'nestjs-typegoose';
import { SalesFunnelStep } from './models/SalesFunnelStep.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateSalesFunnelStepDTO } from './DTO/UpdateSalesFunnelStepDTO';
import { ChangeOrderDTO } from './DTO/ChangeOrderDTO';
import Pupil from '../../../crmserver/src/crm/pupils/models/Pupil.model';

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

    public create(createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return this.SalesFunnelStepModel.create(createSalesFunnelStepDTO);
    }

    public async findAll() {
        return this.SalesFunnelStepModel.find()
            .select({ pupils: 0 })
            .sort({ order: 1 });
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
        for (const step of changeOrderDTO) {
            await this.SalesFunnelStepModel.updateOne(
                { _id: step.id },
                { order: step.newOrder }
            );
        }

        return this.SalesFunnelStepModel.find().select({ pupils: 0 });
    }

    public async delete(id: string) {
        const deletedStep = await this.SalesFunnelStepModel.findById(id);

        if (!deletedStep) {
            throw new NotFoundException();
        }

        // If there is at least one pupil in this step
        const pupilInCurrentStep = await this.PupilModel.findOne({
            salesFunnelStep: id
        });

        if (pupilInCurrentStep) {
            throw new BadRequestException();
        }

        await this.SalesFunnelStepModel.updateMany(
            { order: { $gt: deletedStep.order } },
            { $inc: { order: -1 } }
        );

        return deletedStep;
    }

    public async findByOrder(order: number) {
        return this.SalesFunnelStepModel.findOne({ order });
    }
}
