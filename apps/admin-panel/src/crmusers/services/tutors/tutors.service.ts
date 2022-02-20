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
import { CreateTutorDto } from '../../dto/Tutor/create-tutor.dto';
import { UpdateTutorDto } from '../../dto/Tutor/update.tutor.dto';
import { TutorModel } from '../../models/tutor.model';
import { PasswordProtectorService } from '../password-protector/password-protector.service';

@Injectable()
export class TutorsService {
    constructor(
        @InjectModel(TutorModel)
        private readonly tutorModel: ReturnModelType<typeof TutorModel>,
        private readonly passwordProtector: PasswordProtectorService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createTutorDto: CreateTutorDto) {
        createTutorDto.password = await this.passwordProtector.hash(
            createTutorDto.password
        );

        try {
            const user = await this.tutorModel.create(createTutorDto);

            this.eventEmitter.emit(
                'crmuser.created',
                new CrmUserCreatedOrUpdatedEvent({
                    id: user.id,
                    accountType: AccountTypes.TUTOR,
                    name: user.name,
                    surname: user.surname,
                    middleName: user.middleName
                })
            );

            return this.tutorModel.findById(user.id).lean().exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.tutorModel.countDocuments().exec(),
            docs: await this.tutorModel
                .find()
                .skip(offset)
                .limit(limit)
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.tutorModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateTutorDto: UpdateTutorDto) {
        const updated = await this.tutorModel
            .findByIdAndUpdate(id, updateTutorDto)
            .lean()
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const user = await this.tutorModel.findById(id).lean().exec();

        this.eventEmitter.emit(
            'crmuser.updated',
            new CrmUserCreatedOrUpdatedEvent({
                id,
                accountType: AccountTypes.TUTOR,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            })
        );

        return user;
    }

    async delete(id: string) {
        const deleted = await this.tutorModel
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
