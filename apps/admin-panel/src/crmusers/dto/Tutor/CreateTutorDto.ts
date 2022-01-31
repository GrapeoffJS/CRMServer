import { BasicCRMUserDto } from '../BasicCRMUserDto';
import { IntersectionType } from '@nestjs/mapped-types';

class TutorDto {}

export class CreateTutorDto extends IntersectionType(
    TutorDto,
    BasicCRMUserDto
) {}
