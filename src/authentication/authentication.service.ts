import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { TokenPayload } from './TokenPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>,
        private readonly ConfigService: ConfigService
    ) {}

    public async authenticate(login: string, password: string) {
        const candidate = await this.CRMUserModel.findOne({ login });

        if (!candidate) {
            throw new BadRequestException();
        }

        if (!(await compare(password, candidate.password))) {
            throw new BadRequestException();
        }

        return {
            token: this.generateAccessToken({
                id: candidate.id,
                name: candidate.name,
                surname: candidate.surname,
                midname: candidate.midname,
                role: candidate.role
            })
        };
    }

    private generateAccessToken(payload: TokenPayload) {
        return sign(payload, this.ConfigService.get('JWT_SECRET'), {
            expiresIn: this.ConfigService.get('JWT_LIFETIME')
        });
    }
}
