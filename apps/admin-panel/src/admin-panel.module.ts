import { Module } from '@nestjs/common';
import { CrmUsersModule } from './crmusers/crmusers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { WorkHoursModule } from './work-hours/work-hours.module';

@Module({
    imports: [
        CrmUsersModule,
        SubscriptionsModule,
        SalesFunnelModule,
        WorkHoursModule
    ],
    controllers: [],
    providers: []
})
export class AdminPanelModule {}
