import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateRoleDTO } from './DTO/CreateRoleDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(RoleModel)
        private readonly RoleModel: ReturnModelType<typeof RoleModel>
    ) {}

    async create(createRoleDTO: CreateRoleDTO) {
        try {
            return await this.RoleModel.create(createRoleDTO);
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async findAll() {
        return this.RoleModel.find();
    }

    async delete(id: string) {
        const role = await this.RoleModel.findByIdAndDelete(id);

        if (!role) {
            throw new NotFoundException();
        }

        return this.RoleModel.findById(id);
    }

    async edit(id: string, updateRoleDTO: UpdateRoleDTO) {
        const role = await this.RoleModel.findByIdAndUpdate(id, updateRoleDTO);

        if (!role) {
            throw new NotFoundException();
        }

        return this.RoleModel.findById(id);
    }
}
