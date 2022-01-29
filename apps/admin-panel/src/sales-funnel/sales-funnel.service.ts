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
import { StudentModel } from '../../../crm/src/crm/students/models/Student.model';
import { SalesFunnelStepModel } from './models/SalesFunnelStep.model';

@Injectable()
export class SalesFunnelService {
    constructor(
        @InjectModel(SalesFunnelStepModel)
        private readonly salesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStepModel
        >,
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>
    ) {}

    create(createSalesFunnelStepDTO: CreateSalesFunnelStepDTO) {
        return this.salesFunnelStepModel.create(createSalesFunnelStepDTO);
    }

    async get() {
        return this.salesFunnelStepModel.find().sort({ order: 1 }).exec();
    }

    async update(
        id: string,
        updateSalesFunnelStepDTO: UpdateSalesFunnelStepDTO
    ) {
        await this.salesFunnelStepModel
            .updateOne({ _id: id }, updateSalesFunnelStepDTO)
            .exec();

        return this.salesFunnelStepModel.findById(id).exec();
    }

    async changeOrders(changeOrderDTO: ChangeOrderDTO[]) {
        for (const step of changeOrderDTO) {
            await this.salesFunnelStepModel
                .updateOne({ _id: step.id }, { order: step.newOrder })
                .exec();
        }

        return this.salesFunnelStepModel.find().select({ pupils: 0 }).exec();
    }

    async delete(id: string) {
        const stepToDelete = await this.salesFunnelStepModel
            .findById(id)
            .exec();

        if (!stepToDelete) {
            throw new NotFoundException();
        }

        // If there is at least one pupil in this step
        const pupilInCurrentStep = await this.studentModel
            .findOne({
                salesFunnelStep: id
            })
            .exec();

        if (pupilInCurrentStep) {
            throw new BadRequestException();
        }

        await this.salesFunnelStepModel.findByIdAndDelete(id).exec();

        await this.salesFunnelStepModel
            .updateMany(
                { order: { $gt: stepToDelete.order } },
                { $inc: { order: -1 } }
            )
            .exec();

        return stepToDelete;
    }

    async findByOrder(order: number) {
        return this.salesFunnelStepModel.findOne({ order }).exec();
    }
}
