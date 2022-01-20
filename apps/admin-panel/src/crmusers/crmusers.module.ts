import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CRMUser } from './models/CRMUser.model';
import { Tutor } from './models/Tutor.model';
import { Admin } from './models/Admin.model';
import { Partner } from './models/Partner.model';
import { SeniorTutor } from './models/SeniorTutor.model';
import { Support } from './models/Support.model';
import { Manager } from './models/Manager.model';
import { ManagerService } from './services/manager/manager.service';
import { TutorService } from './services/tutor/tutor.service';
import { SeniorTutorService } from './services/senior-tutor/senior-tutor.service';
import { PartnerService } from './services/partner/partner.service';
import { SupportService } from './services/support/support.service';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/admin/admin.controller';
import { ManagerController } from './controllers/manager/manager.controller';
import { PartnerController } from './controllers/partner/partner.controller';
import { SeniorTutorController } from './controllers/senior-teacher/senior-tutor.controller';
import { SupportController } from './controllers/support/support.controller';
import { TutorController } from './controllers/tutor/tutor.controller';
import { AllStaffController } from './controllers/all-staff/all-staff.controller';
import { AllStaffService } from './services/all-staff/all-staff.service';
import { PasswordProtectorService } from './services/password-protector/password-protector.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUser,
                discriminators: [
                    Admin,
                    Manager,
                    Partner,
                    Tutor,
                    SeniorTutor,
                    Support
                ],
                schemaOptions: { collection: 'CRMUsers' }
            }
        ])
    ],
    controllers: [
        AdminController,
        ManagerController,
        PartnerController,
        SeniorTutorController,
        SupportController,
        TutorController,
        AllStaffController
    ],
    providers: [
        ManagerService,
        TutorService,
        SeniorTutorService,
        PartnerService,
        SupportService,
        AdminService,
        AllStaffService,
        PasswordProtectorService
    ]
})
export class CrmUsersModule {}
