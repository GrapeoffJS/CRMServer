import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/swagger';

class AdminDto {}

export class CreateAdminDto extends IntersectionType(
    AdminDto,
    BasicCrmUserDto
) {}
