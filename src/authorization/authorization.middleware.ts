import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from 'nestjs-typegoose';
import CRMUser from '../admin-panel/crmaccounts/models/CRMUser.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { TokenPayload } from '../authentication/TokenPayload';
import { ExtendedRequest } from './ExtendedRequest';

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
            const { id, role, name, surname, midname } =
                await this.JwtService.verifyAsync<TokenPayload>(token);

            const user = await this.CRMUserModel.findOne({
                _id: id,
                role,
                name,
                surname,
                midname
            });

            if (!user) return res.sendStatus(401);

            req.user = user;
            next();
        } catch (err) {
            return res.sendStatus(401);
        }
    }
}
