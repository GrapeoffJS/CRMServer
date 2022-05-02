import { CrmUserModel } from '@apps/admin-panel/crmusers/models/crm-user.model';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { compare } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';

import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtFactory } from './jwt.factory';
import { RefreshTokenModel } from './models/refresh-token.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(CrmUserModel)
        private readonly crmUserModel: ReturnModelType<typeof CrmUserModel>,
        @InjectModel(RefreshTokenModel)
        private readonly refreshTokenModel: ReturnModelType<
            typeof RefreshTokenModel
        >,
        private readonly jwtFactory: JwtFactory
    ) {}

    async auth(authDto: AuthDto) {
        const candidate = await this.crmUserModel
            .findOne({
                login: authDto.login
            })
            .populate('role')
            .exec();

        if (!candidate) {
            throw new BadRequestException();
        }

        if (!(await compare(authDto.password, candidate.password))) {
            throw new BadRequestException();
        }

        return {
            user: {
                id: candidate.id,
                login: candidate.login,
                name: candidate.name,
                surname: candidate.surname,
                middleName: candidate.middleName,
                role: candidate.role
            },
            accessToken: await this.jwtFactory.generateAccessToken({
                id: candidate.id,
                name: candidate.name,
                surname: candidate.surname,
                middleName: candidate.middleName,
                role: candidate.role
            }),
            refreshToken: await this.jwtFactory.generateRefreshToken(
                candidate.id
            )
        };
    }

    async refresh({ refreshToken }: RefreshDto) {
        const oldRefreshToken = await this.refreshTokenModel
            .findOne({
                token: refreshToken
            })
            .exec();

        if (!oldRefreshToken) {
            throw new UnauthorizedException();
        }

        const user = await this.crmUserModel
            .findOne({
                _id: oldRefreshToken.owner_id
            })
            .exec();

        return {
            user: {
                id: user.id,
                login: user.login,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            },
            accessToken: await this.jwtFactory.generateAccessToken({
                id: user.id,
                login: user.login,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName,
                role: user.role
            }),
            refreshToken: await this.jwtFactory.generateRefreshToken(user.id)
        };
    }
}
