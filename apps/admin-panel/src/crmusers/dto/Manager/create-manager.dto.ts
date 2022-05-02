import { IntersectionType } from '@nestjs/swagger';

import { BasicCrmUserDto } from '../basic-crm-user.dto';

class ManagerDto {}

export class CreateManagerDto extends IntersectionType(
    ManagerDto,
    BasicCrmUserDto
) {}
