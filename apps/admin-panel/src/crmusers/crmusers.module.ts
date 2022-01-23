import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CRMUserModel } from './models/CRMUser.model';
import { TutorModel } from './models/Tutor.model';
import { AdminModel } from './models/Admin.model';
import { PartnerModel } from './models/Partner.model';
import { SeniorTutorModel } from './models/SeniorTutor.model';
import { SupporterModel } from './models/Supporter.model';
import { ManagerModel } from './models/Manager.model';
import { ManagersService } from './services/managers/managers.service';
import { TutorsService } from './services/tutors/tutors.service';
import { SeniorTutorsService } from './services/senior-tutors/senior-tutors.service';
import { PartnersService } from './services/partners/partners.service';
import { SupportersService } from './services/supporters/supporters.service';
import { AdminsService } from './services/admins/admins.service';
import { AdminsController } from './controllers/admins/admins.controller';
import { ManagersController } from './controllers/managers/managers.controller';
import { PartnersController } from './controllers/partners/partners.controller';
import { SeniorTutorsController } from './controllers/senior-teachers/senior-tutors.controller';
import { SupportersController } from './controllers/supporters/supporters.controller';
import { TutorsController } from './controllers/tutors/tutors.controller';
import { AllStaffController } from './controllers/all-staff/all-staff.controller';
import { AllStaffService } from './services/all-staff/all-staff.service';
import { PasswordProtectorService } from './services/password-protector/password-protector.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUserModel,
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
