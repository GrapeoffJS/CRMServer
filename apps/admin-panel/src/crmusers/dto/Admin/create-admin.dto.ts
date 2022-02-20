import { IntersectionType } from '@nestjs/swagger';
import { BasicCrmUserDto } from '../basic-crm-user.dto';

class AdminDto {}

export class CreateAdminDto extends IntersectionType(
    AdminDto,
    BasicCrmUserDto
) {}
