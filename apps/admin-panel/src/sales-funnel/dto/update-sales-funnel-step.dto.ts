import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateSalesFunnelStepDto } from './create-sales-funnel-step.dto';

export class UpdateSalesFunnelStepDto extends PartialType(
    OmitType(CreateSalesFunnelStepDto, ['order'] as const)
) {}
