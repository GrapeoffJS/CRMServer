import { CrmUserModel } from '@apps/admin-panel/crmusers/models/crm-user.model';
import { RoleModel } from '@apps/admin-panel/roles/models/role.model';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtFactory } from './jwt.factory';
import { RefreshTokenModel } from './models/refresh-token.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            { typegooseClass: CrmUserModel },
            { typegooseClass: RefreshTokenModel },
            { typegooseClass: RoleModel }
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
