import { PartialType } from '@nestjs/swagger';
import { CreateAdminDTO } from './CreateAdminDTO';

export class UpdateAdminDTO extends PartialType(CreateAdminDTO) {}
