import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AdminModel } from '../../models/admin.model';
import { CreateAdminDto } from '../../dto/Admin/create-admin.dto';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { UpdateAdminDto } from '../../dto/Admin/update-admin.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
    AccountTypes,
    CrmUserCreatedOrUpdatedEvent
} from '../../../crm-users-indexer/types/crm-user-created-or-updated-event';
import { CrmUserDeletedEvent } from '../../../crm-users-indexer/types/crm-user-deleted-event';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(AdminModel)
        private readonly adminModel: ReturnModelType<typeof AdminModel>,
        private readonly passwordProtector: PasswordProtectorService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        createAdminDto.password = await this.passwordProtector.hash(
            createAdminDto.password
        );

        try {
            const user = await this.adminModel.create(createAdminDto);

            this.eventEmitter.emit(
                'crmuser.created',
                new CrmUserCreatedOrUpdatedEvent({
                    id: user.id,
                    accountType: AccountTypes.ADMIN,
                    name: user.name,
                    surname: user.surname,
                    middleName: user.middleName
                })
            );

            return this.adminModel.findById(user.id).lean().exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.adminModel.countDocuments().lean().exec(),
            docs: await this.adminModel.find().skip(offset).limit(limit).lean()
        };
    }

    async getByID(id: string) {
        const found = await this.adminModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateAdminDto: UpdateAdminDto) {
        const updated = await this.adminModel
            .findByIdAndUpdate(id, updateAdminDto)
            .lean()
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        const user = await this.adminModel.findById(id).lean().exec();

        this.eventEmitter.emit(
            'crmuser.updated',
            new CrmUserCreatedOrUpdatedEvent({
                id,
                accountType: AccountTypes.ADMIN,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            })
        );

        return user;
    }

    async delete(id: string) {
        const deleted = await this.adminModel
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
