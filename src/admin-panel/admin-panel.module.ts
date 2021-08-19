import { Module } from '@nestjs/common';
import { CrmaccountsModule } from './crmaccounts/crmaccounts.module';

@Module({
    imports: [CrmaccountsModule]
})
export class AdminPanelModule {}
