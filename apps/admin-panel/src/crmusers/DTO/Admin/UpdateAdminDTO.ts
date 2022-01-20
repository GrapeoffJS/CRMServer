import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDTO } from './CreateAdminDTO';

export class UpdateAdminDTO extends PartialType(CreateAdminDTO) {}
