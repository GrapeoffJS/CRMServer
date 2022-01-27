import {
    BadRequestException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { CRMUserModel } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthDTO } from './DTO/AuthDTO';
import { compare } from 'bcrypt';
import { JwtFactory } from './jwt.factory';
import { RefreshDTO } from './DTO/RefreshDTO';
import { RefreshTokenModel } from './models/RefreshToken.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(CRMUserModel)
        private readonly crmUserModel: ReturnModelType<typeof CRMUserModel>,
        @InjectModel(RefreshTokenModel)
        private readonly refreshTokenModel: ReturnModelType<
            typeof RefreshTokenModel
        >,
        private readonly jwtFactory: JwtFactory
    ) {}

    async auth(authDTO: AuthDTO) {
        const candidate = await this.crmUserModel
            .findOne({
                login: authDTO.login
            })
            .select('+password');

        if (!candidate) {
            throw new BadRequestException();
        }

        if (!(await compare(authDTO.password, candidate.password))) {
            throw new BadRequestException();
        }

        return {
            user: {
                id: candidate.id,
                login: candidate.login,
                name: candidate.name,
                surname: candidate.surname,
                middleName: candidate.middleName
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

    async refresh({ refreshToken }: RefreshDTO) {
        const oldRefreshToken = await this.refreshTokenModel.findOne({
            token: refreshToken
        });

        if (!oldRefreshToken) {
            throw new UnauthorizedException();
        }

        const user = await this.crmUserModel.findOne({
            _id: oldRefreshToken.owner_id
        });

        return {
            accessToken: await this.jwtFactory.generateAccessToken({
                id: user.id,
                login: user.login,
                name: user.name,
                surname: user.surname,
                middleName: user.middleName
            }),
            refreshToken: await this.jwtFactory.generateRefreshToken(user.id)
        };
    }
}
