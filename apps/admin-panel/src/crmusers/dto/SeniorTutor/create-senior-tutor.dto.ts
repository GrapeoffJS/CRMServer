import { IntersectionType } from '@nestjs/swagger';
import { BasicCrmUserDto } from '../basic-crm-user.dto';

class SeniorTutor {}

export class CreateSeniorTutorDto extends IntersectionType(
    SeniorTutor,
    BasicCrmUserDto
) {}
