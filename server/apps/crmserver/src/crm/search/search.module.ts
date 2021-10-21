import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypegooseModule } from 'nestjs-typegoose';
import getESConnectionUri from '../../config/getESConnectionUri';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUser,
                schemaOptions: { collection: 'CRMUsers' }
            }
        ]),
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    node: getESConnectionUri(
                        configService.get('ELASTIC_SEARCH_PROTOCOL'),
                        configService.get('ELASTIC_SEARCH_USERNAME'),
                        configService.get('ELASTIC_SEARCH_PASSWORD'),
                        configService.get('ELASTIC_SEARCH_HOST'),
                        configService.get('ELASTIC_SEARCH_PORT')
                    )
                };
            }
        }),
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
    controllers: [SearchController],
    providers: [SearchService]
})
export class SearchModule {}
