import CRMUser from '../admin-panel/crmaccounts/models/CRMUser.model';
import { ExtendedRequest } from './ExtendedRequest';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';
import { PopulateOptions } from 'mongoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { Role } from '../admin-panel/roles/models/Role.model';
import { TokenPayload } from '../authentication/TokenPayload';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(
        private readonly JwtService: JwtService,
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async use(req: ExtendedRequest, res: Response, next: () => void) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const { id, login, accountType, name, surname, midname } =
                await this.JwtService.verifyAsync<TokenPayload>(token);

            const user = await this.CRMUserModel.findOne({
                _id: id,
                login,
                accountType,
                name,
                surname,
                midname
            }).populate({
                path: 'role',
                model: Role
            } as PopulateOptions);

            if (!user) return res.sendStatus(401);

            req.user = user;

            next();
        } catch (err) {
            return res.sendStatus(401);
        }
    }
}
