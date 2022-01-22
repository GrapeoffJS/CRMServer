import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthorizationMiddleware } from '../authorization/authorization.middleware';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './students/models/Student.model';
import { CRMUserModel } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configModuleOptions from '../config/configModuleOptions';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TutorsModule } from './tutors/tutors.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { StatusesModule } from './statuses/statuses.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskTagsModule } from './task-tags/task-tags.module';
import { GroupsModule } from './groups/groups.module';
import { SearchModule } from './search/search.module';
import { StudentsModule } from './students/students.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: CRMUserModel,
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
        SubscriptionsModule,
        TutorsModule,
        SalesFunnelModule,
        StatusesModule,
        TasksModule,
        TaskTagsModule,
        GroupsModule,
        SearchModule,
        StudentsModule
    ]
})
export class CrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthorizationMiddleware).forRoutes('/CRM/*');
    }
}
