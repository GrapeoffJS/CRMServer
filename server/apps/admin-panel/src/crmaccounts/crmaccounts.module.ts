import CRMUser from './models/CRMUser.model';
import { CRMAccountsController } from './crmaccounts.controller';
import { CRMAccountsService } from './crmaccounts.service';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUser,
                schemaOptions: {
                    collection: 'CRMUsers'
                }
            }
        ])
    ],
    controllers: [CRMAccountsController],
    providers: [CRMAccountsService],
    exports: [CRMAccountsService]
})
export class CrmaccountsModule {}
