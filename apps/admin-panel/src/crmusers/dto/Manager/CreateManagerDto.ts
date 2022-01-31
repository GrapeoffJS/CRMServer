import { BasicCRMUserDto } from '../BasicCRMUserDto';
import { IntersectionType } from '@nestjs/swagger';

class ManagerDto {}

export class CreateManagerDto extends IntersectionType(
    ManagerDto,
    BasicCRMUserDto
) {}
