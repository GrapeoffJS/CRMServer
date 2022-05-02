import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class PasswordProtectorService {
    async hash(password: string) {
        return hash(password, await genSalt(10));
    }
}
