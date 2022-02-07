import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/swagger';

class PartnerDto {}

export class CreatePartnerDto extends IntersectionType(
    PartnerDto,
    BasicCrmUserDto
) {}
