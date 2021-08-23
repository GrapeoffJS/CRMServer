import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>,
        private readonly ConfigService: ConfigService,
        private readonly JwtService: JwtService
    ) {}

    public async authenticate(login: string, password: string) {
        const candidate = await this.CRMUserModel.findOne({ login }).select(
            '+password'
        );

        if (!candidate) {
            throw new BadRequestException();
        }

        if (!compareSync(password, candidate.password)) {
            throw new BadRequestException();
        }

        return {
            token: this.JwtService.sign({
                id: candidate.id,
                login: candidate.login,
                name: candidate.name,
                surname: candidate.surname,
                midname: candidate.midname,
                accountType: candidate.accountType
            })
        };
    }
}
