import { Module } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { TypegooseModule } from 'nestjs-typegoose';
import Status from './models/Status.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Status,
                schemaOptions: {
                    collection: 'Statuses'
                }
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_LIFETIME')
                    }
                };
            }
        })
    ],
    controllers: [StatusesController],
    providers: [StatusesService]
})
export class StatusesModule {
}
