import configModuleOptions from './config/configModuleOptions';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import mongoConnectionOptions from './config/mongoConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrmaccountsModule } from './admin-panel/crmaccounts/crmaccounts.module';
import { CrmModule } from './crm/crm.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SearchModule } from './crm/search/search.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthCheckModule } from './auth-check/auth-check.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { AuthorizationMiddleware } from './authorization/authorization.middleware';
import Pupil from './crm/pupils/models/Pupil.model';
import { Group } from './crm/groups/models/Group.model';
import CRMUser from './admin-panel/crmaccounts/models/CRMUser.model';
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
        ConfigModule.forRoot(configModuleOptions),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            async useFactory(configService: ConfigService) {
                return {
                    uri:
                        getMongoConnectionUri(
                            configService.get('MONGO_HOST'),
                            configService.get('MONGO_PORT'),
                            configService.get('MONGO_DEFAULTDB')
                        ) || configService.get('DB_CONNECTION_URI'),
                    ...mongoConnectionOptions
                };
            }
        }),
        AdminPanelModule,
        CrmModule,
        SearchModule,
        AuthenticationModule,
        AuthCheckModule
    ],
    controllers: [],
    providers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthorizationMiddleware)
            .exclude('/CRM/Subscriptions', '/AdminPanel/*')
            .forRoutes('/CRM/*');
    }
}
