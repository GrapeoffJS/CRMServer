import { Module } from '@nestjs/common';
import { CrmaccountsModule } from '../../../../admin-panel/src/crmaccounts/crmaccounts.module';
import { TutorsController } from './tutors.controller';

@Module({
    imports: [CrmaccountsModule],
    controllers: [TutorsController]
})
export class TutorsModule {}
