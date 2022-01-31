import { Module } from '@nestjs/common';
import { CrmUsersModule } from './crmusers/crmusers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { WorkHoursModule } from './work-hours/work-hours.module';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        CrmUsersModule,
        SubscriptionsModule,
        SalesFunnelModule,
        WorkHoursModule,
        RolesModule
    ],
    controllers: [],
    providers: []
})
export class AdminPanelModule {}
