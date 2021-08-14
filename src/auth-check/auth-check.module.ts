import { AuthCheckController } from './auth-check.controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [ConfigModule],
    controllers: [AuthCheckController]
})
export class AuthCheckModule {}
