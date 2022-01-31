import { BasicCRMUserDto } from '../BasicCRMUserDto';
import { IntersectionType } from '@nestjs/swagger';

class SupporterDto {}

export class CreateSupporterDto extends IntersectionType(
    SupporterDto,
    BasicCRMUserDto
) {}
