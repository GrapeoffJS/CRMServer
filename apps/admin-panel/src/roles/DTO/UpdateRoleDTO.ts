import { PartialType } from '@nestjs/swagger';
import { CreateRoleDTO } from './CreateRoleDTO';

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {}
