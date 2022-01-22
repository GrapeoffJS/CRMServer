import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSalesFunnelStepDTO } from './CreateSalesFunnelStepDTO';

export class UpdateSalesFunnelStepDTO extends PartialType(
    OmitType(CreateSalesFunnelStepDTO, ['order'] as const)
) {}
