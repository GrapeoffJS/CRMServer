import { Module } from '@nestjs/common';
import { CrmUsersModule } from './crmusers/crmusers.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { WorkHoursModule } from './work-hours/work-hours.module';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [CrmUsersModule, SalesFunnelModule, WorkHoursModule, RolesModule],
    controllers: [],
    providers: []
})
export class AdminPanelModule {}
