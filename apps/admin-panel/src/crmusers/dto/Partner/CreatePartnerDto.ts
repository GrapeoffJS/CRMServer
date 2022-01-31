import { BasicCRMUserDto } from '../BasicCRMUserDto';
import { IntersectionType } from '@nestjs/swagger';

class PartnerDto {}

export class CreatePartnerDto extends IntersectionType(
    PartnerDto,
    BasicCRMUserDto
) {}
