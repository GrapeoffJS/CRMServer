import { IsMongoId } from 'class-validator';

export class SalesFunnelStepId {
    @IsMongoId()
    salesFunnelStepID: string;
}
