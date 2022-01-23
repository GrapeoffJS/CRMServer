import { PartialType } from '@nestjs/swagger';
import { CreatePartnerDTO } from './CreatePartnerDTO';

export class UpdatePartnerDTO extends PartialType(CreatePartnerDTO) {}
