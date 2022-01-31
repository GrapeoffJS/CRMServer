import { BasicCRMUserDto } from '../BasicCRMUserDto';
import { IntersectionType } from '@nestjs/swagger';

class SeniorTutor {}

export class CreateSeniorTutorDto extends IntersectionType(
    SeniorTutor,
    BasicCRMUserDto
) {}
