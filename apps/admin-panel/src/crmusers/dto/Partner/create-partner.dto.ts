import { IntersectionType } from '@nestjs/swagger';
import { BasicCrmUserDto } from '../basic-crm-user.dto';

class PartnerDto {}

export class CreatePartnerDto extends IntersectionType(
    PartnerDto,
    BasicCrmUserDto
) {}
