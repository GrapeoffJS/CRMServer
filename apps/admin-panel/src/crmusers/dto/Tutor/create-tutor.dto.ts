import { IntersectionType } from '@nestjs/mapped-types';

import { BasicCrmUserDto } from '../basic-crm-user.dto';

class TutorDto {}

export class CreateTutorDto extends IntersectionType(
    TutorDto,
    BasicCrmUserDto
) {}
