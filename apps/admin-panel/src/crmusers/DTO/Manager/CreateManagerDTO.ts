import { BasicCRMUserDTO } from '../BasicCRMUserDTO';
import { IntersectionType } from '@nestjs/swagger';

class ManagerDTO {}

export class CreateManagerDTO extends IntersectionType(
    ManagerDTO,
    BasicCRMUserDTO
) {}
