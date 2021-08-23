import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { CrmaccountsModule } from './crmaccounts/crmaccounts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
    imports: [RolesModule, CrmaccountsModule, SubscriptionsModule],
    controllers: [],
    providers: []
})
export class AdminPanelModule {}
