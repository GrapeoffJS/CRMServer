import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateSalesFunnelStepDto } from './dto/create-sales-funnel-step.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateSalesFunnelStepDto } from './dto/update-sales-funnel-step.dto';
import { ChangeOrderDto } from './dto/change-order.dto';
import { StudentModel } from '../../../crm/src/crm/students/crud/models/student.model';
import { SalesFunnelStepModel } from './models/sales-funnel-step.model';

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

    create(createSalesFunnelStepDto: CreateSalesFunnelStepDto) {
        return this.salesFunnelStepModel.create(createSalesFunnelStepDto);
    }

    async get() {
        return this.salesFunnelStepModel
            .find()
            .sort({ order: 1 })
            .lean()
            .exec();
    }

    async update(
        id: string,
        updateSalesFunnelStepDto: UpdateSalesFunnelStepDto
    ) {
        await this.salesFunnelStepModel
            .updateOne({ _id: id }, updateSalesFunnelStepDto)
            .lean()
            .exec();

        return this.salesFunnelStepModel.findById(id).lean().exec();
    }

    async changeOrders(changeOrderDto: ChangeOrderDto[]) {
        for (const step of changeOrderDto) {
            await this.salesFunnelStepModel
                .updateOne({ _id: step.id }, { order: step.newOrder })
                .lean()
                .exec();
        }

        return this.salesFunnelStepModel
            .find()
            .select({ pupils: 0 })
            .lean()
            .exec();
    }

    async delete(id: string) {
        const stepToDelete = await this.salesFunnelStepModel
            .findById(id)
            .lean()
            .exec();

        if (!stepToDelete) {
            throw new NotFoundException();
        }

        // If there is at least one pupil in this step
        const pupilInCurrentStep = await this.studentModel
            .findOne({
                salesFunnelStep: id
            })
            .lean()
            .exec();

        if (pupilInCurrentStep) {
            throw new BadRequestException();
        }

        await this.salesFunnelStepModel.findByIdAndDelete(id).lean().exec();

        await this.salesFunnelStepModel
            .updateMany(
                { order: { $gt: stepToDelete.order } },
                { $inc: { order: -1 } }
            )
            .lean()
            .exec();

        return stepToDelete;
    }

    async findByOrder(order: number) {
        return this.salesFunnelStepModel.findOne({ order }).lean().exec();
    }
}
