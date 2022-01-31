import { BasicCRMUserDto } from '../BasicCRMUserDto';
import { IntersectionType } from '@nestjs/swagger';

export class AdminDto {}

export class CreateAdminDto extends IntersectionType(
    AdminDto,
    BasicCRMUserDto
) {}
