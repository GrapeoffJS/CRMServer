import { BasicCRMUserDTO } from '../BasicCRMUserDTO';
import { IntersectionType } from '@nestjs/swagger';

export class AdminDTO {}

export class CreateAdminDTO extends IntersectionType(
    AdminDTO,
    BasicCRMUserDTO
) {}
