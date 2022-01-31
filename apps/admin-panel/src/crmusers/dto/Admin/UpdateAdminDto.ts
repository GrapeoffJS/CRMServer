import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './CreateAdminDto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
