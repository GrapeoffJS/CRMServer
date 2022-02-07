import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CrmUserModel } from '../../../admin-panel/src/crmusers/models/crm-user.model';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModel } from './models/refresh-token.model';
import { JwtFactory } from './jwt.factory';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypegooseModule.forFeature([
            { typegooseClass: CrmUserModel },
            { typegooseClass: RefreshTokenModel }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    verifyOptions: {
                        algorithm: 'HS512',
                        issuer: configService.get('JWT_ISSUER')
                    }
                };
            }
        }),
        ConfigModule
    ],
    providers: [AuthService, JwtFactory],
    controllers: [AuthController]
})
export class AuthModule {}
