import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSalesFunnelStepDTO } from './CreateSalesFunnelStepDTO';

export class UpdateSalesFunnelStepDTO extends PartialType(
    OmitType(CreateSalesFunnelStepDTO, ['order'] as const)
) {}
