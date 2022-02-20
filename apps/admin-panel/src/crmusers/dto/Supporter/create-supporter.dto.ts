import { IntersectionType } from '@nestjs/swagger';

import { BasicCrmUserDto } from '../basic-crm-user.dto';

class SupporterDto {}

export class CreateSupporterDto extends IntersectionType(
    SupporterDto,
    BasicCrmUserDto
) {}
