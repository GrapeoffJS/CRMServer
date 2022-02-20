import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AdminsController } from './controllers/admins/admins.controller';
import { AllStaffController } from './controllers/all-staff/all-staff.controller';
import { ManagersController } from './controllers/managers/managers.controller';
import { PartnersController } from './controllers/partners/partners.controller';
import { SeniorTutorsController } from './controllers/senior-teachers/senior-tutors.controller';
import { SupportersController } from './controllers/supporters/supporters.controller';
import { TutorsController } from './controllers/tutors/tutors.controller';
import { AdminModel } from './models/admin.model';
import { CrmUserModel } from './models/crm-user.model';
import { ManagerModel } from './models/manager.model';
import { PartnerModel } from './models/partner.model';
import { SeniorTutorModel } from './models/senior-tutor.model';
import { SupporterModel } from './models/supporter.model';
import { TutorModel } from './models/tutor.model';
import { AdminsService } from './services/admins/admins.service';
import { AllStaffService } from './services/all-staff/all-staff.service';
import { ManagersService } from './services/managers/managers.service';
import { PartnersService } from './services/partners/partners.service';
import { PasswordProtectorService } from './services/password-protector/password-protector.service';
import { SeniorTutorsService } from './services/senior-tutors/senior-tutors.service';
import { SupportersService } from './services/supporters/supporters.service';
import { TutorsService } from './services/tutors/tutors.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CrmUserModel,
                discriminators: [
                    AdminModel,
                    ManagerModel,
                    PartnerModel,
                    TutorModel,
                    SeniorTutorModel,
                    SupporterModel
                ]
            }
        ])
    ],
    controllers: [
        AdminsController,
        ManagersController,
        PartnersController,
        SeniorTutorsController,
        SupportersController,
        TutorsController,
        AllStaffController
    ],
    providers: [
        ManagersService,
        TutorsService,
        SeniorTutorsService,
        PartnersService,
        SupportersService,
        AdminsService,
        AllStaffService,
        PasswordProtectorService
    ]
})
export class CrmUsersModule {}
