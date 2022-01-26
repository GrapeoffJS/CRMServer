import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CRMUserModel } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModel } from './models/RefreshToken.model';
import { JwtFactory } from './jwt.factory';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            { typegooseClass: CRMUserModel },
            { typegooseClass: RefreshTokenModel }
        ]),
        JwtModule.register({
            signOptions: {
                algorithm: 'HS512',
                issuer: 'CRMServer'
            }
        }),
        ConfigModule,
        AuthenticationModule
    ],
    providers: [AuthService, JwtFactory],
    controllers: [AuthController]
})
export class AuthModule {}
