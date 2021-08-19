import { Module } from '@nestjs/common';
import { CrmaccountsModule } from './crmaccounts/crmaccounts.module';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [CrmaccountsModule, RolesModule]
})
export class AdminPanelModule {}
