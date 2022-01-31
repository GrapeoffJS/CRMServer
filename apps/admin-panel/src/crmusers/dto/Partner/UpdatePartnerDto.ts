import { PartialType } from '@nestjs/swagger';
import { CreatePartnerDto } from './CreatePartnerDto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
