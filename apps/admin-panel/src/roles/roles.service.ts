import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { RoleModel } from './models/role.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(RoleModel)
        private readonly roleModel: ReturnModelType<typeof RoleModel>
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        return this.roleModel.create(createRoleDto);
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.roleModel.countDocuments().exec(),
            docs: await this.roleModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.roleModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateRoleDto: UpdateRoleDto) {
        const updated = await this.roleModel.findByIdAndUpdate(
            id,
            updateRoleDto
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.roleModel.findById(id);
    }

    async delete(id: string) {
        const deleted = await this.roleModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
