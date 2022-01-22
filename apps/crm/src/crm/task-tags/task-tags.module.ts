import { Module } from '@nestjs/common';
import { TaskTagsController } from './task-tags.controller';
import { TaskTagsService } from './task-tags.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskTagModel } from './models/TaskTag.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TaskTagModel,
                schemaOptions: { collection: 'TaskTags' }
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
    controllers: [TaskTagsController],
    providers: [TaskTagsService]
})
export class TaskTagsModule {}
