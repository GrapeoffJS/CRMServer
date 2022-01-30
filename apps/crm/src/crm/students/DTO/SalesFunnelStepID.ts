import { IsMongoId } from 'class-validator';

export class SalesFunnelStepID {
    @IsMongoId()
    salesFunnelStepID: string;
}
