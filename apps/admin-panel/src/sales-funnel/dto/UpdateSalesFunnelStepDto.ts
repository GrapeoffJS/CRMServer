import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSalesFunnelStepDto } from './CreateSalesFunnelStepDto';

export class UpdateSalesFunnelStepDto extends PartialType(
    OmitType(CreateSalesFunnelStepDto, ['order'] as const)
) {}
