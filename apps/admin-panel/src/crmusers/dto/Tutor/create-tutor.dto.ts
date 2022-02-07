import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/mapped-types';

class TutorDto {}

export class CreateTutorDto extends IntersectionType(
    TutorDto,
    BasicCrmUserDto
) {}
