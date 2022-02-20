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
import { CreateManagerDto } from '../../dto/Manager/create-manager.dto';
import { UpdateManagerDto } from '../../dto/Manager/update-manager.dto';
import { ManagerModel } from '../../models/manager.model';
import { PasswordProtectorService } from '../password-protector/password-protector.service';

@Injectable()
export class ManagersService {
    constructor(
        @InjectModel(ManagerModel)
        private readonly managerModel: ReturnModelType<typeof ManagerModel>,
        private readonly passwordProtector: PasswordProtectorService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createManagerDto: CreateManagerDto) {
        createManagerDto.password = await this.passwordProtector.hash(
            createManagerDto.password
        );

        try {
            const user = await this.managerModel.create(createManagerDto);

            this.eventEmitter.emit(
                'crmuser.created',
                new CrmUserCreatedOrUpdatedEvent({
                    id: user.id,
                    accountType: AccountTypes.MANAGER,
                    name: user.name,
                    surname: user.surname,
                    middleName: user.middleName
                })
            );

            return this.managerModel.findById(user.id).lean().exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.managerModel.countDocuments().exec(),
            docs: await this.managerModel
                .find()
                .skip(offset)
                .limit(limit)
                .lean()
                .exec()
        };
    }

    async getByID(id: string) {
        const found = await this.managerModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateManagerDto: UpdateManagerDto) {
        const updated = await this.managerModel
            .findByIdAndUpdate(id, updateManagerDto)
            .lean()
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const user = await this.managerModel.findById(id).lean().exec();

        this.eventEmitter.emit(
            'crmuser.updated',
            new CrmUserCreatedOrUpdatedEvent({
                id,
                accountType: AccountTypes.MANAGER,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            })
        );

        return user;
    }

    async delete(id: string) {
        const deleted = await this.managerModel
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
