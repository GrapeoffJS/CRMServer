import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import Pupil from './models/Pupil.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrudController } from './controllers/crud/crud.controller';
import { CrudService } from './services/crud/crud.service';
import { ImportFileController } from './controllers/import-file/import-file.controller';
import { ImportFileService } from './services/import-file/import-file.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesController } from './controllers/notes/notes.controller';
import { NotesService } from './services/notes/notes.service';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { Group } from '../groups/models/Group.model';
import { AuthorizationMiddleware } from '../../authorization/authorization.middleware';
import { path } from './path';

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
        ImportFileController,
        CrudController,
        PaymentController,
        NotesController
    ],
    providers: [ImportFileService, CrudService, NotesService, PaymentService]
})
export class PupilsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizationMiddleware)
            .exclude(`${path}/uploadFile`)
            .forRoutes('/CRM/Pupils/*');
    }
}
