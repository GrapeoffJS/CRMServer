import { BasicCRMUserDTO } from '../BasicCRMUserDTO';
import { IntersectionType } from '@nestjs/swagger';

class SeniorTutor {}

export class CreateSeniorTutorDTO extends IntersectionType(
    SeniorTutor,
    BasicCRMUserDTO
) {}
