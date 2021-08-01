import CRMUser from '../crmaccounts/models/CRMUser.model';
import { AuthDTO } from './DTO/AuthDTO';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>,
        private readonly configService: ConfigService
    ) {}

    async authenticate(authDTO: AuthDTO): Promise<{ token: string }> {
        const user = await this.CRMUserModel.findOne({
            login: authDTO.login
        }).select('+password');

        if (!user || !(await compare(authDTO.password, user.password))) {
            throw new BadRequestException();
        }

        return {
            token: this.generateAccessToken(user)
        };
    }

    private generateAccessToken({
        id,
        name,
        surname,
        midname,
        role
    }: DocumentType<CRMUser>): string {
        return sign(
            {
                id,
                name,
                surname,
                midname,
                role
            },
            this.configService.get('JWT_SECRET'),
            {
                expiresIn: this.configService.get('JWT_LIFETIME')
            }
        );
    }
}
