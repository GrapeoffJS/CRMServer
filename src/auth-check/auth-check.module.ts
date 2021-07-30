import { Module } from '@nestjs/common';
import { AuthCheckController } from './auth-check.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [AuthCheckController]
})
export class AuthCheckModule {}
