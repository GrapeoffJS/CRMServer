import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { CrmaccountsModule } from './crmaccounts/crmaccounts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { WorkHoursModule } from './work-hours/work-hours.module';

@Module({
    imports: [
        RolesModule,
        CrmaccountsModule,
        SubscriptionsModule,
        SalesFunnelModule,
        WorkHoursModule
    ],
    controllers: [],
    providers: []
})
export class AdminPanelModule {}
