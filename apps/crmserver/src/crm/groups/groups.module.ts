import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import Pupil from '../pupils/models/Pupil.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrudController } from './controllers/crud/crud.controller';
import { CrudService } from './services/crud/crud.service';
import { Group } from './models/Group.model';
import { Module } from '@nestjs/common';
import { PupilManipulationController } from './controllers/pupil-manipulations/pupil-manipulations.controller';
import { PupilManipulationsService } from './services/pupil-manipulations/pupil-manipulations.service';
import { ScheduleController } from './controllers/schedule/schedule.controller';
import { ScheduleService } from './services/schedule/schedule.service';
import { TutorManipulationsController } from './controllers/tutor-manipulations/tutor-manipulations.controller';
import { TutorManipulationsService } from './services/tutor-manipulations/tutor-manipulations.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Pupil,
                schemaOptions: { collection: 'Pupils' }
            },
            {
                typegooseClass: Group,
                schemaOptions: { collection: 'Groups' }
            },
            {
                typegooseClass: CRMUser,
                schemaOptions: { collection: 'CRMUsers' }
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_LIFETIME')
                    }
                };
            }
        }),
        ConfigModule
    ],
    controllers: [
        CrudController,
        PupilManipulationController,
        ScheduleController,
        TutorManipulationsController
    ],
    providers: [
        CrudService,
        PupilManipulationsService,
        ScheduleService,
        TutorManipulationsService
    ]
})
export class GroupsModule {}
