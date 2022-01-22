import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDTO } from './CreateRoleDTO';

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {}
