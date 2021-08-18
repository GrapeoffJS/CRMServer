import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthCheckController } from './auth-check.controller';
import { AuthorizationMiddleware } from '../authorization/authorization.middleware';
import { TypegooseModule } from 'nestjs-typegoose';
import CRMUser from '../admin-panel/crmaccounts/models/CRMUser.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
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
        })
    ],
    controllers: [AuthCheckController]
})
export class AuthCheckModule {}
