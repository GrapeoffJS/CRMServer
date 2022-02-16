import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PartnerModel } from '../../models/partner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreatePartnerDto } from '../../dto/Partner/create-partner.dto';
import { UpdatePartnerDto } from '../../dto/Partner/update-partner.dto';
import {
    AccountTypes,
    CrmUserCreatedOrUpdatedEvent
} from '../../../crm-users-indexer/types/crm-user-created-or-updated-event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CrmUserDeletedEvent } from '../../../crm-users-indexer/types/crm-user-deleted-event';

@Injectable()
export class PartnersService {
    constructor(
        @InjectModel(PartnerModel)
        private readonly partnerModel: ReturnModelType<typeof PartnerModel>,
        private readonly passwordProtector: PasswordProtectorService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createPartnerDto: CreatePartnerDto) {
        createPartnerDto.password = await this.passwordProtector.hash(
            createPartnerDto.password
        );

        try {
            const user = await this.partnerModel.create(createPartnerDto);

            this.eventEmitter.emit(
                'crmuser.created',
                new CrmUserCreatedOrUpdatedEvent({
                    id: user.id,
                    accountType: AccountTypes.PARTNER,
                    name: user.name,
                    surname: user.surname,
                    middleName: user.middleName
                })
            );

            return this.partnerModel.findById(user.id).lean().exec();
        } catch (e) {
            console.log(e);
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.partnerModel.countDocuments().exec(),
            docs: await this.partnerModel
                .find()
                .skip(offset)
                .limit(limit)
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.partnerModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updatePartnerDto: UpdatePartnerDto) {
        const updated = await this.partnerModel
            .findByIdAndUpdate(id, updatePartnerDto)
            .lean()
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const user = await this.partnerModel.findById(id).lean().exec();

        this.eventEmitter.emit(
            'crmuser.updated',
            new CrmUserCreatedOrUpdatedEvent({
                id,
                accountType: AccountTypes.PARTNER,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            })
        );
    }

    async delete(id: string) {
        const deleted = await this.partnerModel
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
