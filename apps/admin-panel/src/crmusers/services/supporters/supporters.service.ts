import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
    AccountTypes,
    CrmUserCreatedOrUpdatedEvent
} from '../../../crm-users-indexer/types/crm-user-created-or-updated-event';
import { CrmUserDeletedEvent } from '../../../crm-users-indexer/types/crm-user-deleted-event';
import { CreateSupporterDto } from '../../dto/Supporter/create-supporter.dto';
import { UpdateSupporterDto } from '../../dto/Supporter/update-supporter.dto';
import { SupporterModel } from '../../models/supporter.model';
import { PasswordProtectorService } from '../password-protector/password-protector.service';

@Injectable()
export class SupportersService {
    constructor(
        @InjectModel(SupporterModel)
        private readonly supporterModel: ReturnModelType<typeof SupporterModel>,
        private readonly passwordProtector: PasswordProtectorService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createSupporterDto: CreateSupporterDto) {
        createSupporterDto.password = await this.passwordProtector.hash(
            createSupporterDto.password
        );

        try {
            const user = await this.supporterModel.create(createSupporterDto);

            this.eventEmitter.emit(
                'crmuser.created',
                new CrmUserCreatedOrUpdatedEvent({
                    id: user.id,
                    accountType: AccountTypes.SUPPORTER,
                    name: user.name,
                    surname: user.surname,
                    middleName: user.middleName
                })
            );

            return this.supporterModel.findById(user.id).lean().exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.supporterModel.countDocuments().exec(),
            docs: await this.supporterModel
                .find()
                .skip(offset)
                .limit(limit)
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.supporterModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateSupportDto: UpdateSupporterDto) {
        const updated = await this.supporterModel
            .findByIdAndUpdate(id, updateSupportDto)
            .lean()
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const user = await this.supporterModel.findById(id).lean().exec();

        this.eventEmitter.emit(
            'crmuser.updated',
            new CrmUserCreatedOrUpdatedEvent({
                id,
                accountType: AccountTypes.SUPPORTER,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            })
        );
    }

    async delete(id: string) {
        const deleted = await this.supporterModel
            .findByIdAndDelete(id)
            .lean()
            .exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        this.eventEmitter.emit(
            'crmuser.deleted',
            new CrmUserDeletedEvent(deleted.id)
        );

        return deleted;
    }
}
