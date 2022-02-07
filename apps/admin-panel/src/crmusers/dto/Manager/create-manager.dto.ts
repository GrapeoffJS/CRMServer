import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/swagger';

class ManagerDto {}

export class CreateManagerDto extends IntersectionType(
    ManagerDto,
    BasicCrmUserDto
) {}
