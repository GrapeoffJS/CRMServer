import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CRMUser } from './models/CRMUser.model';
import { Tutor } from './models/Tutor.model';
import { Admin } from './models/Admin.model';
import { Partner } from './models/Partner.model';
import { SeniorTutor } from './models/SeniorTutor.model';
import { Supporter } from './models/Supporter.model';
import { Manager } from './models/Manager.model';
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
                typegooseClass: CRMUser,
                discriminators: [
                    Admin,
                    Manager,
                    Partner,
                    Tutor,
                    SeniorTutor,
                    Supporter
                ],
                schemaOptions: { collection: 'CRMUsers' }
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
