import { Module } from '@nestjs/common';
import { SalesFunnelService } from './sales-funnel.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { SalesFunnelStep } from '../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SalesFunnelController } from './sales-funnel.controller';
import Pupil from '../pupils/models/Pupil.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: SalesFunnelStep,
                schemaOptions: { collection: 'SalesFunnelSteps' }
            },
            {
                typegooseClass: Pupil,
                schemaOptions: { collection: 'Pupils' }
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
        }),
        ConfigModule
    ],
    providers: [SalesFunnelService],
    controllers: [SalesFunnelController]
})
export class SalesFunnelModule {}
