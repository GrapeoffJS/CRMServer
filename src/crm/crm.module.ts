import { GroupsModule } from './groups/groups.module';
import { Module } from '@nestjs/common';
import { PupilsModule } from './pupils/pupils.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
    imports: [PupilsModule, GroupsModule, SubscriptionsModule]
})
export class CrmModule {}
