import { BasicCRMUserDTO } from '../BasicCRMUserDTO';
import { IntersectionType } from '@nestjs/swagger';

class SupporterDTO {}

export class CreateSupporterDTO extends IntersectionType(
    SupporterDTO,
    BasicCRMUserDTO
) {}
