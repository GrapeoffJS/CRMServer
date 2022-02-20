import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { RefreshTokenModel } from './models/refresh-token.model';

@Injectable()
export class JwtFactory {
    constructor(
        @InjectModel(RefreshTokenModel)
        private readonly refreshTokenModel: ReturnModelType<
            typeof RefreshTokenModel
        >,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateAccessToken(payload: any) {
        return this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_LIFETIME'),
            secret: this.configService.get('JWT_SECRET'),
            issuer: this.configService.get('JWT_ISSUER')
        });
    }

    async generateRefreshToken(ownerID: string) {
        await this.refreshTokenModel.findOneAndDelete({ owner_id: ownerID });

        const token = await this.jwtService.signAsync(
            {},
            {
                expiresIn: this.configService.get('JWT_REFRESH_LIFETIME'),
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                issuer: this.configService.get('JWT_ISSUER')
            }
        );

        await this.refreshTokenModel.create({ token, owner_id: ownerID });

        return token;
    }
}
