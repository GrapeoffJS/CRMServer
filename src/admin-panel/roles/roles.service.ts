import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateRoleDTO } from './DTO/CreateRoleDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Role } from './models/Role.model';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role)
        private readonly RoleModel: ReturnModelType<typeof Role>
    ) {}

    public async create(createRoleDTO: CreateRoleDTO) {
        try {
            return await this.RoleModel.create(createRoleDTO);
        } catch (e) {
            throw new BadRequestException();
        }
    }

    public async findAll() {
        return await this.RoleModel.find();
    }

    public async delete(id: string) {
        const role = await this.RoleModel.findByIdAndDelete(id);

        if (!role) {
            throw new NotFoundException();
        }

        return await this.RoleModel.findById(id);
    }

    public async edit(id: string, updateRoleDTO: UpdateRoleDTO) {
        const role = await this.RoleModel.findByIdAndUpdate(id, updateRoleDTO);

        if (!role) {
            throw new NotFoundException();
        }

        return await this.RoleModel.findById(id);
    }
}
