import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/swagger';

class SupporterDto {}

export class CreateSupporterDto extends IntersectionType(
    SupporterDto,
    BasicCrmUserDto
) {}
