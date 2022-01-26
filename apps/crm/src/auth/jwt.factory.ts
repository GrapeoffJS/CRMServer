import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { RefreshTokenModel } from './models/RefreshToken.model';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';

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

    async generateAccessToken(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_LIFETIME'),
            secret: this.configService.get('JWT_SECRET')
        });
    }

    async generateRefreshToken(ownerID: string): Promise<string> {
        await this.refreshTokenModel.findOneAndDelete({ owner_id: ownerID });

        const token = await this.jwtService.signAsync(
            {},
            {
                expiresIn: this.configService.get('JWT_REFRESH_LIFETIME'),
                secret: this.configService.get('JWT_REFRESH_SECRET')
            }
        );
        await this.refreshTokenModel.create({ token, owner_id: ownerID });

        return token;
    }
}
