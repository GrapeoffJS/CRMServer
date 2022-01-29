import { BasicCRMUserDTO } from '../BasicCRMUserDTO';
import { IntersectionType } from '@nestjs/mapped-types';

class TutorDTO {}

export class CreateTutorDTO extends IntersectionType(
    TutorDTO,
    BasicCRMUserDTO
) {}
