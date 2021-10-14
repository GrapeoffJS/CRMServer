import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';

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
        }),
        ConfigModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {
}
