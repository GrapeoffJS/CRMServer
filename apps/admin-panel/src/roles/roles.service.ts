import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateRoleDTO } from './DTO/CreateRoleDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';
import { RoleModel } from './models/Role.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(RoleModel)
        private readonly roleModel: ReturnModelType<typeof RoleModel>
    ) {}

    async create(createRoleDTO: CreateRoleDTO) {
        try {
            return await this.roleModel.create(createRoleDTO);
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async get() {
        return this.roleModel.find().exec();
    }

    async delete(id: string) {
        const role = await this.roleModel.findByIdAndDelete(id).exec();

        if (!role) {
            throw new NotFoundException();
        }

        return this.roleModel.findById(id).exec();
    }

    async edit(id: string, updateRoleDTO: UpdateRoleDTO) {
        const role = await this.roleModel.findByIdAndUpdate(id, updateRoleDTO);

        if (!role) {
            throw new NotFoundException();
        }

        return this.roleModel.findById(id).exec();
    }
}
