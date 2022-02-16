import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateSeniorTutorDto } from '../../dto/SeniorTutor/create-senior-tutor.dto';
import { UpdateSeniorTutorDto } from '../../dto/SeniorTutor/update-senior-tutor.dto';
import { SeniorTutorModel } from '../../models/senior-tutor.model';
import {
    AccountTypes,
    CrmUserCreatedOrUpdatedEvent
} from '../../../crm-users-indexer/types/crm-user-created-or-updated-event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CrmUserDeletedEvent } from '../../../crm-users-indexer/types/crm-user-deleted-event';

@Injectable()
export class SeniorTutorsService {
    constructor(
        @InjectModel(SeniorTutorModel)
        private readonly seniorTutorModel: ReturnModelType<
            typeof SeniorTutorModel
        >,
        private readonly passwordProtector: PasswordProtectorService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createSeniorTutorDto: CreateSeniorTutorDto) {
        createSeniorTutorDto.password = await this.passwordProtector.hash(
            createSeniorTutorDto.password
        );

        try {
            const user = await this.seniorTutorModel.create(
                createSeniorTutorDto
            );

            this.eventEmitter.emit(
                'crmuser.created',
                new CrmUserCreatedOrUpdatedEvent({
                    id: user.id,
                    accountType: AccountTypes.SENIOR_TUTOR,
                    name: user.name,
                    surname: user.surname,
                    middleName: user.middleName
                })
            );

            return this.seniorTutorModel.findById(user.id).lean().exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.seniorTutorModel.countDocuments().exec(),
            docs: await this.seniorTutorModel
                .find()
                .skip(offset)
                .limit(limit)
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.seniorTutorModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateSeniorTutorDto: UpdateSeniorTutorDto) {
        const updated = await this.seniorTutorModel
            .findByIdAndUpdate(id, updateSeniorTutorDto)
            .lean()
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const user = await this.seniorTutorModel.findById(id).lean().exec();

        this.eventEmitter.emit(
            'crmuser.updated',
            new CrmUserCreatedOrUpdatedEvent({
                id,
                accountType: AccountTypes.SENIOR_TUTOR,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            })
        );
    }

    async delete(id: string) {
        const deleted = await this.seniorTutorModel
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
