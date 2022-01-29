import { BasicCRMUserDTO } from '../BasicCRMUserDTO';
import { IntersectionType } from '@nestjs/swagger';

class PartnerDTO {}

export class CreatePartnerDTO extends IntersectionType(
    PartnerDTO,
    BasicCRMUserDTO
) {}
