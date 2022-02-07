import { BasicCrmUserDto } from '../basic-crm-user.dto';
import { IntersectionType } from '@nestjs/swagger';

class SeniorTutor {}

export class CreateSeniorTutorDto extends IntersectionType(
    SeniorTutor,
    BasicCrmUserDto
) {}
