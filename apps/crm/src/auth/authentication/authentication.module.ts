import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    verifyOptions: {
                        algorithm: 'HS512',
                        issuer: 'CRMServer'
                    }
                };
            }
        })
    ]
})
export class AuthenticationModule {}
