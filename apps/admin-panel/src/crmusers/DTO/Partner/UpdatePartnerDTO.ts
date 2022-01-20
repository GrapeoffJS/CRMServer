import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDTO } from './CreatePartnerDTO';

export class UpdatePartnerDTO extends PartialType(CreatePartnerDTO) {}
