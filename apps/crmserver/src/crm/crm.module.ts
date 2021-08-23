import { GroupsModule } from './groups/groups.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PupilsModule } from './pupils/pupils.module';
import { AuthorizationMiddleware } from '../authorization/authorization.middleware';
import { TypegooseModule } from 'nestjs-typegoose';
import Pupil from './pupils/models/Pupil.model';
import { Group } from './groups/models/Group.model';
import CRMUser from '../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configModuleOptions from '../config/configModuleOptions';
import { SearchModule } from './search/search.module';

@Module({
    imports: [
        PupilsModule,
        GroupsModule,
        SearchModule,
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
        ConfigModule.forRoot(configModuleOptions)
    ]
})
export class CrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthorizationMiddleware).forRoutes('/CRM/*');
    }
}
