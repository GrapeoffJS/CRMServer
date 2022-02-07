import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/swagger';

export class AdminDto {}

export class CreateAdminDto extends IntersectionType(
    AdminDto,
    BasicCrmUserDto
) {}
